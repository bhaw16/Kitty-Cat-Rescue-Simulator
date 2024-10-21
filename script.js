var startButton, inventoryButton, inventoryBox;
var disclaimers, inventory;
var inventoryShowing = false;
var currBackgroundColor;

function preload() {

}

function setup() {
    createCanvas(1500, 1500);
    background("blue");
    currBackgroundColor = "blue";
    startButton = new Sprite(width / 2, height / 2, 100, 50);
    startButton.color = "white";
    startButton.text = "Start";
    inventoryBox = new Sprite(-500, -500, 700, (height - 50) / 4, "k");
    inventoryBox.color = "black";
    var catCarrierSprite = new Sprite(-700, -700, 75, 75), treatSprite = new Sprite(-800, -800, 15, 40);
    catCarrierSprite.color = "white";
    catCarrierSprite.text = "cat carrier";
    treatSprite.color = "#8ace00";
    treatSprite.text = "churu treat";
    var initialItems = [
        new Item(catCarrierSprite.text, catCarrierSprite, "initial"),
        new Item(treatSprite.text, treatSprite, "initial")
    ];
    inventory = new Inventory(initialItems);
    inventoryButton = new Sprite(-90, -90, 100, 100);
    inventoryButton.text = "inventory";
    allSprites.rotationLock = true;
}

function draw() {
    if (startButton.mouse.presses()) {
        background("pink");
        currBackgroundColor = "pink";
        changePos(startButton, -900, -900);
        changePos(inventoryButton, width - 50, 20);
    }
    if (inventoryButton.mouse.presses()) {
        inventoryShowing = !inventoryShowing;
        console.log(inventoryShowing);
    }
    if (inventoryShowing) {
        showInventory();
    } else {
        background(currBackgroundColor);
        console.log();
        hideInventory();
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
    changePos(sprite, 0, y);
}

function showInventory() {
    //inventoryBox.visible = true;
    changePos(inventoryBox, width / 2 + 50, 30);
    changePos(inventory[0].sprite, width / 2 + 60, 75);
    changePos(inventory[1].sprite, width / 2 + 125, 75);
    //inventory[0].sprite.visible = true;
    //inventory[1].sprite.visible = true;
    console.log("inventory showing");
    console.log(`{x: ${inventoryBox.x}, y: ${inventoryBox.y}}`);
    console.log(`{x: ${inventory[0].sprite.x}, y: ${inventory[0].sprite.y}}`);
    console.log(`{x: ${inventory[1].sprite.x}, y: ${inventory[1].sprite.y}}`);
}

function hideInventory() {
    //inventoryBox.visible = false;
    //inventory[0].sprite.visible = false;
    //inventory[1].sprite.visible = false;
    changePos(inventoryBox, -9000, -9000);
    changePos(inventory[0].sprite, -8000, -8000);
    changePos(inventory[1].sprite, width * -1, height * -1);
    console.log("inventory hidden");
    console.log(`{x: ${inventoryBox.x}, y: ${inventoryBox.y}}`);
    console.log(`{x: ${inventory[0].sprite.x}, y: ${inventory[0].sprite.y}}`);
    console.log(`{x: ${inventory[1].sprite.x}, y: ${inventory[1].sprite.y}}`);
}

window.onload = () => {
    console.log(document.getElementsByTagName("canvas"));
    console.log(document.getElementsByTagName("canvas").length);
}


