# CSE 110 Lab 3 — Konva Lemon

## Run

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. A yellow lemon appears in the center of a cream-colored canvas. Hover over it, hold the primary mouse button to enlarge it, and drag to move it. Release to return to normal size.

```sh
npx tsc --noEmit
npm run build
npm run preview
```

TypeScript checking checks types without writing JavaScript. Vite builds the production site into `dist`; preview serves that build locally.

## How the code works

- `index.html` provides the `container` div and loads `src/main.ts` as a module. Its small stylesheet fills the window and prevents touch scrolling on the canvas.
- `package.json` provides the dev, build, and preview commands. Existing dependencies are preserved.
- `tsconfig.json` enables strict checking and uses the requested ESNext target/module, interop, JSX preserve, and src include settings. **Compatibility adjustment:** TypeScript 7 rejects `moduleResolution: "Node"` with TS5108 because the old node10 resolver was removed. `"Bundler"` works with Vite instead.
- The **Stage** defines the drawing area. The **Layer** provides a canvas on which Konva draws objects.
- The draggable **Group** contains the stem, body, and highlight. Its position starts at the stage center. Its children use coordinates relative to that center, so the entire lemon scales around its middle and moves together.
- A green **Line** makes the stem. A yellow **Path** uses curved segments for the oval body and pointed ends. An **Ellipse** adds a highlight. There are no image assets.
- `mouseenter` and `mouseleave` change the cursor. `pointerdown` starts the press effect for the primary button and supports mouse, touch, and pen.
- A **Tween** interpolates scale over 0.15 seconds. The pressed scale is 1.1 times the normal scale. Destroying the previous tween prevents overlapping animations during rapid clicks.
- Window-level release events reset the scale even outside the shape. Cancellation and loss of window focus also stop dragging and reset the effect.
- `resize` fits the canvas and lemon to small screens. `keepVisible` limits dragging so the lemon stays reachable. Optional wiggle is omitted to keep the example simple.
- Type annotations describe values: `number` means a numeric argument, `void` means no returned value, and `Konva.Tween | undefined` means the tween may not exist yet. The `!` after the container lookup asserts that the div exists in our HTML.

## Manual test checklist

- [ ] Run `npm run dev` and open its URL; see a centered yellow lemon with pointed ends and green stem.
- [ ] Hover over the body and stem: pointer cursor. Move off: default cursor.
- [ ] Hold the primary mouse button: smooth enlargement of about 10%.
- [ ] Drag: all parts move together, staying within the canvas.
- [ ] Release: smoothly return to normal size.
- [ ] Press, move off the lemon, then release: scale still resets.
- [ ] Click rapidly: no stuck or cumulative enlargement.
- [ ] Switch windows while holding: the effect resets and dragging stops.
- [ ] Resize to a narrow window: canvas fits and the lemon remains reachable.
- [ ] On a touch device, press, drag, and release without scrolling the canvas.
- [ ] Run `npx tsc --noEmit` and `npm run build`: both succeed.

## Five likely TA questions

1. **What is the difference between Stage and Layer?** The Stage is the drawing area; a Layer holds and draws shapes inside it.
2. **Why use a Group?** It lets the stem, body, and highlight move and scale as one lemon.
3. **How is the lemon drawn?** A curved yellow Path forms the body, a green Line forms the stem, and an Ellipse provides a highlight.
4. **How does the press effect work?** Pointer down starts a Tween toward 1.1 times normal scale. Pointer up starts a Tween back to normal.
5. **Why listen for release on window?** The pointer can leave the shape before release. Listening on window prevents a stuck enlarged lemon. Blur handles loss of focus.

## Git submission

No Git repository was configured in this project when inspected. No commit or push was made, and no remote was created. `.gitignore` excludes dependencies and build output. When ready, create an empty GitHub repository yourself, then run these commands from this folder (replace the remote placeholder):

```sh
git init
git add .gitignore package.json package-lock.json tsconfig.json index.html src/main.ts README.md
git commit -m "Complete CSE 110 Lab 3 Konva lemon"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

The implementation follows the requirements supplied in the task; no separate instructor handout was provided. Partner participation and TA checkoff remain your responsibilities.
