export const ROUTES_PARAMETERS = {};

const SKETCH_PATH = '/sketches';

const ROUTES = {
  home: '/',
  sketches: SKETCH_PATH,
  sketchesMouseMovement: `${SKETCH_PATH}-mouse-movement`,
  sketchesStatic: `${SKETCH_PATH}-static`,
  sketchesDynamic: `${SKETCH_PATH}-dynamic`,
  sketchesBesierCurve: `${SKETCH_PATH}-besier-curve`,

  blackHole: `${SKETCH_PATH}/black-hole`,
  besierQuadraticCurve: `${SKETCH_PATH}/besier-quadratic-curve`,
  besierCubicCurve: `${SKETCH_PATH}/besier-cubic-curve`,
  caveGeneration: `${SKETCH_PATH}/cave-generation`,
  mouseFollow: `${SKETCH_PATH}/mouse-follow`,
  mouseConfetti: `${SKETCH_PATH}/mouse-confetti`,
  flocking: `${SKETCH_PATH}/flocking`,
  flowField: `${SKETCH_PATH}/flow-field`,
  circularMotion: `${SKETCH_PATH}/circular-motion`,
  timesTable: `${SKETCH_PATH}/times-table`,
  chaosGame: `${SKETCH_PATH}/chaos-game`,
  maurerRose: `${SKETCH_PATH}/maurer-rose`,
  metaBalls: `${SKETCH_PATH}/meta-balls`,
  rayCasting: `${SKETCH_PATH}/ray-casting`,
  pong: `${SKETCH_PATH}/pong`,
} as const;

export default ROUTES;
