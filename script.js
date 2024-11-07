var startButton, inventoryButton, inventoryBox;
var disclaimers, inventory;
var storyText = [
    "And so, our story begins...look! A cat! I wonder if it's a stray...",
    "Hmmm...it has a collar, but we can't really tell at a glance if it's microchipped.\nAlso, we need to check its health and get it treatment for any illnesses.\nTo the vet!",
    "Wait a minute...we need to get the cat to come with us!",
    "Go to your inventory and combine the cat carrier and churu treat by dragging one of them into the other.\nThen, click on the combined item.",
    "Good! Now click on the combined item.",
    "Now let's take the cat to the vet! Click the \"Go to Vet\" button to continue."
], currentText, currentTextIndex = 0;
var inventoryShowing = false;
var currBackgroundColor;
var onStoryScreen = false, onVetScreen = false, raisingCat = false;
var vetText = [
    "Good news! The cat is healthy!",
    "Since it has a microchip, we need to check if it has an owner."
], currentVText, vTextIndex = 0, goToVet;
var myCat, raiseCat;
var catPet = false;
var foodBowl, waterBowl;
var feedButton, waterButton, petButton, groomButton, playButton;
var willFeed = false, willHydrate = false, pettingCat = false, groomingCat = false, isPlaying = false;
var catWasPet = false, catWasGroomed = false;

function ownerText(cat) {
    if (!(cat instanceof Cat)) {
        throw new TypeError("Expected to receive Cat input for this function.");
    }
    return (cat.hasOwner) ? "This cat has an owner. Let's try to find it!" : "Unfotunately, this cat does not have an owner.\nWould you like to raise it or screen people to adopt it?\n(Adoption screening coming soon)";
}

function preload() {

}

function setup() {
    createCanvas(1500, 1500);
    background("blue");
    currBackgroundColor = "blue";
    startButton = new Sprite(width / 2, height / 2, 100, 50);
    startButton.color = "white";
    startButton.text = "Start";
    inventoryBox = new Sprite(-500, -500, 700, 100, "k");
    inventoryBox.color = "black";
    var catCarrierSprite = new Sprite(-700, -700, 75, 75), treatSprite = new Sprite(-800, -800, 15, 40);
    catCarrierSprite.color = "white";
    catCarrierSprite.text = "cat carrier";
    treatSprite.color = "#8ace00";
    treatSprite.text = "churu treat";
    catCarrierSprite.drag = 5;
    treatSprite.drag = 5;

    var initialItems = [
        new Item(catCarrierSprite.text, catCarrierSprite, "initial"),
        new Item(treatSprite.text, treatSprite, "initial")
    ];
    currentText = new Sprite(-7500, -7500, 500, 150);
    currentText.color = "white";
    currentText.text = storyText[currentTextIndex];
    currentVText = new Sprite(-8000, -8000, currentText.w, currentText.h);
    currentVText.color = currentText.color;
    currentVText.text = vetText[vTextIndex];
    inventory = new Inventory(initialItems);
    inventoryButton = new Sprite(-90, -90, 100, 100);
    inventoryButton.text = "inventory";
    allSprites.rotationLock = true;
    myCat = new Cat(new Sprite(-2000, -2000, 120, 150), "American Shorthair", true);
    myCat.sprite.color = "orange";
    myCat.sprite.text = myCat.breed;
    foodBowl = new Sprite(-975, -975);
    foodBowl.color = "red";
    foodBowl.text = "food bowl";
    waterBowl = new Sprite(-875, -875);
    waterBowl.color = "blue";
    waterBowl.text = "water bowl";
    feedButton = new Sprite(-400, -400, 150, 50);
    waterButton = new Sprite(-450, -450, feedButton.w, feedButton.h);
    groomButton = new Sprite(-709, -709, waterButton.w, waterButton.h);
    petButton = new Sprite(-809, -809, groomButton.w, groomButton.h);
    playButton = new Sprite(-909, -909, petButton.w, petButton.h);
    feedButton.text = "Feed";
    waterButton.text = "Give Water";
    groomButton.text = "Groom";
    petButton.text = "Pet";
    playButton.text = "Play";
    goToVet = new Sprite(-800, -800, waterButton.w, waterButton.h);
    goToVet.text = "Go to Vet";
    goToVet.color = "lavender";
    raiseCat = new Sprite(-1000, -1000, goToVet.w, goToVet.h);
    raiseCat.text = "Raise it!";
    raiseCat.color = goToVet.color;
    vetText.push(ownerText(myCat));
}

function draw() {
    if (startButton.mouse.presses()) {
        onStoryScreen = true;
        background("pink");
        currBackgroundColor = "pink";
        changePos(startButton, -900, -900);
        changePos(inventoryButton, width - 50, 20);
        changePos(currentText, width / 2, 85);
    }
    if (inventoryButton.mouse.presses()) {
        inventoryShowing = !inventoryShowing;
        //console.log(inventoryShowing);
    }
    if (inventoryShowing) {
        showInventory();
        if (onStoryScreen) {
            //console.log(inventory[0].sprite.mouse.drags());
            //console.log(inventory[1].sprite.mouse.drags());
            if (inventory[0].sprite.mouse.dragging() >= 12)
                inventory[0].dragItem();
            if (inventory[1].sprite.mouse.dragging() >= 12)
                inventory[1].dragItem();
        }
    } else {
        background(currBackgroundColor);
        //console.log();
        hideInventory();
    }
    if (goToVet.mouse.presses()) {
        onStoryScreen = false;
        onVetScreen = true;
        background("gold");
        currBackgroundColor = "gold";
        changePos(goToVet, -750, -750);
        changePos(currentText, -950, -950);
        changePos(currentVText, width / 2, 85);
    }
    if (raiseCat.mouse.presses()) {
        background("lavender");
        currBackgroundColor = "lavender";
        changePos(raiseCat, -7500, -7500);
        changePos(currentVText, -10000, -10000);
        document.getElementsByTagName("canvas")[0].insertAdjacentElement("beforebegin", document.createElement("h1"));
        document.getElementsByTagName("h1")[0].innerText = "Details about your in-game actions will be displayed here.";
        changePos(feedButton, width / 2, 100);
        changePos(waterButton, width / 2, feedButton.y + feedButton.h + 15);
        changePos(petButton, width / 2, waterButton.y + waterButton.h + 15);
        changePos(groomButton, width / 2, petButton.y + petButton.h + 15);
        changePos(playButton, width / 2, groomButton.y + groomButton.h + 15);
        changePos(myCat.sprite, width / 2, height / 2);
        changePos(foodBowl, myCat.sprite.x - 35, myCat.sprite.y);
        changePos(waterBowl, myCat.sprite.x + 35, myCat.sprite.y);
        onVetScreen = false;
        raisingCat = true;
       /*
       if (willFeed && foodBowl.mouse.presses()) {
            console.log("Cat fed!");
            document.getElementsByTagName("h1")[0].innerText = "Cat fed!";
            resetHeaderText();
            //willFeed = false;
        }
        */
    }
    if (feedButton.mouse.presses()) {
        willFeed = true;
        console.log("Feeding cat...");
        document.getElementsByTagName("h1")[0].innerText = "Feeding cat...";
   }
   if (willFeed) {
        if (foodBowl.mouse.presses()) {
            console.log("Cat fed!");
            document.getElementsByTagName("h1")[0].innerText = "Cat fed!";
            resetHeaderText();
            willFeed = false;
        } 
   }
   if (waterButton.mouse.presses()) {
    willHydrate = true;
    console.log("Giving cat water...");
    document.getElementsByTagName("h1")[0].innerText = "Giving cat water...";
    }
    if (willHydrate) {
        if (waterBowl.mouse.presses()) {
            console.log("Cat hydrated!");
            document.getElementsByTagName("h1")[0].innerText = "Cat hydrated!";
            resetHeaderText();
            willHydrate = false;
        } 
    }
    if (petButton.mouse.presses()) {
        pettingCat = true;
        console.log("Click and/or drag the mouse on your cat's fur to pet it.");
        document.getElementsByTagName("h1")[0].innerText = "Click and/or drag the mouse on your cat's fur to pet it.";
    }
    else if (groomButton.mouse.presses()) {
        groomingCat = true;
        console.log("Click and/or drag the mouse on your cat's fur to groom it.");
        document.getElementsByTagName("h1")[0].innerText = "Click and/or drag the mouse on your cat's fur to groom it.";
    }
    if (myCat.sprite.mouse.pressing() || myCat.sprite.mouse.dragging()) {
        if (pettingCat) {
            petCat();
            catWasPet = true;
        }
        if (groomingCat) {
            groomCat();
            catWasGroomed = true;
        }
    }
    else {
        if ((catWasPet || catWasGroomed) && !willFeed && !willHydrate) {
            resetHeaderText();
            groomingCat = false;
            pettingCat = false;
            catWasPet = false;
            catWasGroomed = false;
        }
    }
    if (playButton.mouse.presses()) {
        isPlaying = true;
    }
    if (isPlaying) {
        mouseHunt();
    }
}

function resetHeaderText() {
    setTimeout(timerHandler = () => {
        document.getElementsByTagName("h1")[0].innerText = "Details about your in-game actions will be displayed here.";
    }, 3000);
}

function mousePressed() {
    try {
        if (onStoryScreen && !inventoryButton.mouse.presses()) {
            if (currentTextIndex + 1 >= storyText.length) {
                throw new RangeError();
            }
            currentText.text = storyText[++currentTextIndex];
            if (currentTextIndex >= storyText.length - 1) {
                changePos(goToVet, width / 2, height / 2);
            }
        }
        else if (onVetScreen && !inventoryButton.mouse.presses()) {
            if (vTextIndex + 1 >= currentVText.length) {
                throw new RangeError();
            }
            currentVText.text = vetText[++vTextIndex];
            if (vTextIndex >= vetText.length - 1) {
                changePos(raiseCat, width / 2, height / 2);
            }
        }
    }
    catch(RangeError) {
        console.log("No more story text to cycle through.");
    }
}

function petCat() {
    console.log("Petting cat...");
    document.getElementsByTagName("h1")[0].innerText = "Petting cat...";
}

function groomCat() {
    console.log("Grooming cat...");
    document.getElementsByTagName("h1")[0].innerText = "Grooming cat...";
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

function mouseHunt() {
    background(currBackgroundColor);
    allSprites.visible = false;
}

function showInventory() {
    //inventoryBox.visible = true;
    changePos(inventoryBox, width / 2 + 50, width / 4 - 30);
    changePos(inventory[0].sprite, width / 2 + 60, width / 4 - 35);
    changePos(inventory[1].sprite, width / 2 + 125, width / 4 - 35);
    //inventory[0].sprite.visible = true;
    //inventory[1].sprite.visible = true;
    /*
    console.log("inventory showing");
    console.log(`{x: ${inventoryBox.x}, y: ${inventoryBox.y}}`);
    console.log(`{x: ${inventory[0].sprite.x}, y: ${inventory[0].sprite.y}}`);
    console.log(`{x: ${inventory[1].sprite.x}, y: ${inventory[1].sprite.y}}`);
    */
}

function hideInventory() {
    //inventoryBox.visible = false;
    //inventory[0].sprite.visible = false;
    //inventory[1].sprite.visible = false;
    changePos(inventoryBox, -9000, -9000);
    changePos(inventory[0].sprite, -8000, -8000);
    changePos(inventory[1].sprite, width * -1, height * -1);
    /*
    console.log("inventory hidden");
    console.log(`{x: ${inventoryBox.x}, y: ${inventoryBox.y}}`);
    console.log(`{x: ${inventory[0].sprite.x}, y: ${inventory[0].sprite.y}}`);
    console.log(`{x: ${inventory[1].sprite.x}, y: ${inventory[1].sprite.y}}`);
    */
}

window.onload = () => {
    console.log(document.getElementsByTagName("canvas"));
    console.log(document.getElementsByTagName("canvas").length);
}


