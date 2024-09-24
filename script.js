var startButton, disclaimers, inventory;

window.onload = () => {
    console.log(document.getElementsByTagName("canvas"));
    console.log(document.getElementsByTagName("canvas").length);
}

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
