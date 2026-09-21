// Keep meta descriptions inside the ~160-char SERP limit without rewriting page copy.
// Cut at the last sentence end (or, failing that, clause break) that fits; if neither
// exists the text is returned untouched rather than chopped mid-phrase.
const MAX_DESCRIPTION = 158;
const MIN_CUT = 90;

export function trimDescription(text: string, max: number = MAX_DESCRIPTION): string {
  const desc = text.replace(/\s+/g, ' ').trim();
  if (desc.length <= max) return desc;

  const lastCut = (re: RegExp): number => {
    let cut = -1;
    let m: RegExpExecArray | null;
    while ((m = re.exec(desc)) !== null) {
      if (m.index + m[1].length > max) break;
      cut = m.index + m[1].length;
    }
    return cut;
  };

  const sentence = lastCut(/([.!?])(?=\s)/g);
  if (sentence >= MIN_CUT) return desc.slice(0, sentence);

  const clause = lastCut(/( [—–] |; )/g);
  if (clause >= MIN_CUT) return desc.slice(0, clause).replace(/[\s;—–]+$/, '');

  return desc;
}
