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
    //background("blue");
    if (startButton.mouse.presses()) {
        background("pink");
        startButton.pos = {x: -900, y: -900};
    }
}

window.onload = () => {
    console.log(document.getElementsByTagName("canvas"));
    console.log(document.getElementsByTagName("canvas").length);
}
