# CSE 110 Lab 3 - Konva

For this lab, I used TypeScript and Konva to create an interactive lemon.

## How to Run

1. Run `npm install` to install the dependencies.
2. Run `npm run dev` to start the server.
3. Open the localhost link shown in the terminal.

## What I Did

I started by setting up a Stage and Layer in Konva. Then I made the lemon using a few different shapes, including a Path for the body, a Line for the stem, and an Ellipse for the highlight.

I put the shapes into a Group so they could all move together.

I also added some interactions:
- The cursor changes when you hover over the lemon.
- You can click and drag the lemon around.
- The lemon gets slightly bigger when you hold down the mouse.
- It goes back to its original size when you release.

## What I Learned

I learned how Konva uses Stages, Layers, and Groups to organize shapes. I also got more practice with TypeScript and event handlers. The main thing I learned was how to make shapes respond to mouse interactions instead of just displaying them on the screen.
