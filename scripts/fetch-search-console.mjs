#!/usr/bin/env node
// Pulls Search Analytics data from Google Search Console for ewo.cam.
// Requires a service-account JSON key at .secrets/gsc-service-account.json
// (added as a user on the ewo.cam property in Search Console).
//
// Usage: node scripts/fetch-search-console.mjs [days]
// Prints JSON to stdout: top queries and top pages by clicks over the window.

import { google } from 'googleapis';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const keyPath = path.join(projectRoot, '.secrets', 'gsc-service-account.json');

const days = Number(process.argv[2]) > 0 ? Number(process.argv[2]) : 28;

if (!existsSync(keyPath)) {
  console.error(JSON.stringify({
    error: 'missing_credentials',
    message: `No service account key found at ${keyPath}. Search Console data is unavailable — proceed without it.`,
  }));
  process.exit(0);
}

const credentials = JSON.parse(readFileSync(keyPath, 'utf-8'));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

const searchconsole = google.searchconsole({ version: 'v1', auth });

function dateNDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

async function resolveSiteUrl() {
  const res = await searchconsole.sites.list();
  const sites = res.data.siteEntry ?? [];
  const match = sites.find(s => s.siteUrl?.includes('ewo.cam'));
  if (!match) {
    throw new Error(
      `Service account has no access to any ewo.cam property. Sites it can see: ${sites.map(s => s.siteUrl).join(', ') || '(none)'}. ` +
      `Add the service account email as a user on the ewo.cam property in Search Console.`
    );
  }
  return match.siteUrl;
}

async function query(siteUrl, dimensions, rowLimit = 25) {
  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: dateNDaysAgo(days),
      endDate: dateNDaysAgo(1),
      dimensions,
      rowLimit,
    },
  });
  return res.data.rows ?? [];
}

try {
  const siteUrl = await resolveSiteUrl();
  const [byPage, byQuery] = await Promise.all([
    query(siteUrl, ['page'], 50),
    query(siteUrl, ['query'], 50),
  ]);

  console.log(JSON.stringify({
    site: siteUrl,
    windowDays: days,
    startDate: dateNDaysAgo(days),
    endDate: dateNDaysAgo(1),
    topPages: byPage.map(r => ({
      page: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
    })),
    topQueries: byQuery.map(r => ({
      query: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
    })),
  }, null, 2));
} catch (err) {
  console.error(JSON.stringify({
    error: 'query_failed',
    message: err?.message ?? String(err),
    hint: 'Check that the service account email was added as a user on the ewo.cam property in Search Console, and that the Search Console API is enabled on the GCP project.',
  }));
  process.exit(1);
}
