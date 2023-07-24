export const ROUTES_PARAMETERS = {};

const SKETCH_PATH = '/sketches';

const ROUTES = {
  home: '/',
  sketches: SKETCH_PATH,
  sketchesMouseMovement: `${SKETCH_PATH}-mouse-movement`,
  sketchesStatic: `${SKETCH_PATH}-static`,
  sketchesDynamic: `${SKETCH_PATH}-dynamic`,
  sketchesBesierCurve: `${SKETCH_PATH}-besier-curve`,

  besierQuadraticCurve: `${SKETCH_PATH}/besier-quadratic-curve`,
  besierCubicCurve: `${SKETCH_PATH}/besier-cubic-curve`,
  mouseFollow: `${SKETCH_PATH}/mouse-follow`,
  mouseConfetti: `${SKETCH_PATH}/mouse-confetti`,
  flocking: `${SKETCH_PATH}/flocking`,
  flowField: `${SKETCH_PATH}/flow-field`,
  circularMotion: `${SKETCH_PATH}/circular-motion`,
  timesTable: `${SKETCH_PATH}/times-table`,
  chaosGame: `${SKETCH_PATH}/chaos-game`,
  maurerRose: `${SKETCH_PATH}/maurer-rose`,
} as const;

export default ROUTES;
