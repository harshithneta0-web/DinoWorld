
DinoWorld - Vite + React + Electron (Windows) - Demo
===================================================

What's included
- Vite + React source (src/)
- public/ contains your transparent logo (dino_logo_transparent.png), intro.wav, and a placeholder cover image.
- Electron main.js and preload.js
- package.json with scripts for web dev and packaging

Important notes
- This is a demo UI only. It DOES NOT stream or distribute commercial game files.
- You must obtain streaming/distribution licenses from game publishers before offering any commercial streaming.

How to run (web)
1. Install Node.js (>=18) and npm.
2. In the project folder, run:
   npm install
   npm run dev
3. Open http://localhost:5173

How to run as Electron (development)
1. Start the web server:
   npm run dev
2. In another terminal start Electron dev:
   npm run electron:dev
(Or set environment WEB=true to load local dist)

How to build web
- npm run build
  The built site will be in the dist/ folder — you can deploy it to GitHub Pages.

How to build Windows installer (requires electron-builder)
1. Install dependencies: npm install
2. Build web: npm run build
3. Package electron (Windows):
   npm run electron:build
   (This requires electron-builder and Windows toolchain if building on Windows. For cross-building, see electron-builder docs.)

Included assets
- public/dino_logo_transparent.png (your logo)
- public/intro.wav (short cinematic intro)
- public/public_placeholder.png (placeholder cover art)

Notes about prebuilt .exe
- I could not build the Windows .exe in this environment. The ZIP includes everything you need to build the Windows installer on your machine. If you'd like, I can provide more detailed build help or produce the .exe if you provide a Windows build environment or accept a remote build.

