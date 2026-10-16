@echo off
set "PATH=C:\Users\shche\AppData\Local\Programs\nodejs;%PATH%"
cd /d "%~dp0.."
call npm run dev -- --port 4322
