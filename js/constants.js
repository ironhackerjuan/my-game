const UP = 38;
const DOWN = 40
const RIGHT = 39
const LEFT = 37
const SPACE = 32
const IS_CHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 512;

const ENEMIES_COORDINATES = [
    { x: 7, y: 10}, 
    { x: 87, y: 10},
    { x: 167, y: 10},
    { x: 247, y: 10},
    { x: 327, y: 10},
    { x: 407, y: 10},
    { x: 50, y: 50}, 
    { x: 130, y: 50},
    { x: 210, y: 50},
    { x: 290, y: 50},
    { x: 370, y: 50},
    { x: 445, y: 50},
    { x: 10, y: 90},
    { x: 90, y: 90},
    { x: 170, y: 90},
    { x: 250, y: 90},
    { x: 330, y: 90},
    { x: 410, y: 90},]