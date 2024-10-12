var startButton, disclaimers, inventory;

function preload() {

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background("blue");
    startButton = new Sprite(width / 2, height / 2, 100, 50);
    startButton.color = "white";
    startButton.text = "Start";
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

window.onload = () => {
    console.log(document.getElementsByTagName("canvas"));
    console.log(document.getElementsByTagName("canvas").length);
}
