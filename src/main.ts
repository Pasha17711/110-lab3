import Konva from 'konva';

const container = document.querySelector<HTMLDivElement>('#container')!;

// The Stage is the canvas area; a Layer holds the objects we draw on it.
const stage = new Konva.Stage({
  container: 'container',
  width: container.clientWidth,
  height: container.clientHeight,
});
const layer = new Konva.Layer();
stage.add(layer);

// Local coordinates put the center at (0, 0), so scaling stays centered.
// Moving this draggable Group moves every part of the lemon together.
const lemon = new Konva.Group({
  x: stage.width() / 2,
  y: stage.height() / 2,
  draggable: true,
});
layer.add(lemon);

// Draw the stem first, so the yellow body covers its lower end.
lemon.add(new Konva.Line({
  points: [116, 0, 143, -13, 150, -10],
  stroke: '#63813b',
  strokeWidth: 9,
  lineCap: 'round',
  lineJoin: 'round',
}));

// Curved paths make an oval body with small pointed ends (no image needed).
lemon.add(new Konva.Path({
  data: 'M -145 0 C -145 -10 -126 -13 -117 -30 C -78 -100 78 -100 117 -30 C 126 -13 145 -10 145 0 C 145 10 126 13 117 30 C 78 100 -78 100 -117 30 C -126 13 -145 10 -145 0 Z',
  fill: '#ffdf32',
  stroke: '#d7ae19',
  strokeWidth: 3,
}));

// A soft highlight adds dimension without adding more interactive objects.
lemon.add(new Konva.Ellipse({
  x: -30,
  y: -35,
  radiusX: 54,
  radiusY: 14,
  rotation: -12,
  fill: '#fff39a',
  opacity: 0.7,
  listening: false,
}));

let baseScale = 1;
let pressed = false;
let scaleTween: Konva.Tween | undefined;

// Destroy the previous tween so rapid presses never fight over the scale.
function animateScale(multiplier: number): void {
  scaleTween?.destroy();
  scaleTween = new Konva.Tween({
    node: lemon,
    duration: 0.15,
    scaleX: baseScale * multiplier,
    scaleY: baseScale * multiplier,
    easing: Konva.Easings.EaseInOut,
  });
  scaleTween.play();
}

// Mouse hover feedback applies to the whole group.
lemon.on('mouseenter', () => { container.style.cursor = 'pointer'; });
lemon.on('mouseleave', () => { container.style.cursor = 'default'; });

// Pointer events work for mouse, touch, and pen. Ignore secondary buttons.
lemon.on('pointerdown', (event) => {
  if (event.evt.button !== 0 || !event.evt.isPrimary || pressed) return;
  pressed = true;
  animateScale(1.1);
});

function release(): void {
  if (!pressed) return;
  pressed = false;
  animateScale(1);
}

// Listen on window too: releasing outside the lemon must still reset it.
window.addEventListener('pointerup', (event) => {
  if (event.isPrimary) release();
});
window.addEventListener('pointercancel', () => {
  lemon.stopDrag();
  release();
});
window.addEventListener('blur', () => {
  lemon.stopDrag();
  release();
  container.style.cursor = 'default';
});

// Fit small screens and keep the lemon visible after resizing or dragging.
function keepVisible(): void {
  const marginX = 170 * baseScale;
  const marginY = 90 * baseScale;
  lemon.x(Math.max(marginX, Math.min(stage.width() - marginX, lemon.x())));
  lemon.y(Math.max(marginY, Math.min(stage.height() - marginY, lemon.y())));
}
lemon.on('dragmove', keepVisible);

function resize(): void {
  stage.size({ width: container.clientWidth, height: container.clientHeight });
  baseScale = Math.min(1, stage.width() / 380, stage.height() / 240);
  scaleTween?.destroy();
  const scale = baseScale * (pressed ? 1.1 : 1);
  lemon.scale({ x: scale, y: scale });
  keepVisible();
}
window.addEventListener('resize', resize);
resize();
