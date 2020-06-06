UP = 38
DOWN = 40
RIGHT = 39
LEFT = 37
SPACE = 32
IS_CHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
CANVAS_WIDTH = 512;
CANVAS_HEIGHT = 512;

let ALIEN_BOTTOM_ROW = [ { x: 0, y: 0, w: 51, h: 34 }, { x: 0, y: 102, w: 51, h: 34 }];
let ALIEN_MIDDLE_ROW = [ { x: 0, y: 137, w: 50, h: 33 }, { x: 0, y: 170, w: 50, h: 34 }];
let ALIEN_TOP_ROW = [ { x: 0, y: 68, w: 50, h: 32 }, { x: 0, y: 34, w: 50, h: 32 }];
let ALIEN_X_MARGIN = 40;
let ALIEN_SQUAD_WIDTH = 11 * ALIEN_X_MARGIN;