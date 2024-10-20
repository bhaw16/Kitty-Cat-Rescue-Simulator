var startButton, disclaimers, inventory;

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background("blue");
    startButton = new Sprite(width / 2, height / 2, 100, 50);
    startButton.color = "white";
    startButton.text = "Start";
    var catCarrierSprite = new Sprite(-700, -700, 75, 75), treatSprite = new Sprite(-800, -800, 15, 40);
    catCarrierSprite.text = "cat carrier";
    treatSprite.text = "churu treat";
    var initialItems = [
        new Item(catCarrierSprite.text, catCarrierSprite, "initial"),
        new Item(treatSprite.text, treatSprite, "initial")
    ];
    inventory = new Inventory(initialItems);
    
}

function draw() {
    if (startButton.mouse.presses()) {
        background("pink");
        startButton.pos = {x: -900, y: -900};
    }
}

function createGroup(length, color, y, diameter) {
    var group = new Group();
    group.y = y;
    group.diameter = diameter;
    group.color = color;
    for (var i = 0; i < length; i++) {
        new group.Sprite((i + 1) * 20);
    }
    return group;
}

function changePos(sprite, x, y) {
    if (!(sprite instanceof Sprite)) {
        throw new TypeError("Error: Expected a Sprite for changePos' argument but received a different type.");
    }
    if (typeof(x) != "number" || typeof(y) != "number") {
        throw new TypeError("Error: Expected numbers for x and y but recieved a different type for one or both arguments.");
    }
    sprite.pos = {x: x, y: y};
}

function changeX(sprite, x) {
    changePos(sprite, x, 0);
}

function changeY(sprite, y) {
    changePos(sprite, 0, y)
}

function showInventory() {
    
}

function hideInventory() {

}

window.onload = () => {
    console.log(document.getElementsByTagName("canvas"));
    console.log(document.getElementsByTagName("canvas").length);
}
