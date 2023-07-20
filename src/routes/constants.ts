export const ROUTES_PARAMETERS = {};

const SKETCH_PATH = '/sketches';

const ROUTES = {
  home: '/',
  sketches: SKETCH_PATH,
  mouseFollow: `${SKETCH_PATH}/mouse-follow`,
  mouseConfetti: `${SKETCH_PATH}/mouse-confetti`,
  flowField: `${SKETCH_PATH}/flow-field`,
  circularMotion: `${SKETCH_PATH}/circular-motion`,
  timesTable: `${SKETCH_PATH}/times-table`,
  chaosGame: `${SKETCH_PATH}/chaos-game`,
} as const;

export default ROUTES;
