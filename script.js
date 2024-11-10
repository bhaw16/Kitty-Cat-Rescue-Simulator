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
var catWasFed = false, catWasHydrated = false, played = false, groomingDone = false, pettingDone = false;
var furniture, gameBeat = false;
var mouseSqueak, catPurring, catImg;
var finishGameButton;
var playDirections = "Every square is a piece of furniture.\nYour cat's mouse toy is hidden behind a random piece of furniture.\nYou have 30 seconds to help your cat find its toy.\nThere's a challenge though: the mouse moves behind a different piece of furniture every 5 seconds!";

function ownerText(cat) {
    if (!(cat instanceof Cat)) {
        throw new TypeError("Expected to receive Cat input for this function.");
    }
    return (cat.hasOwner) ? "This cat has an owner. Let's try to find it!" : "Unfotunately, this cat does not have an owner.\nWould you like to raise it or screen people to adopt it?\n(Adoption screening coming soon)";
}

function preload() {
    catImg = loadImage("assets/images/American-Shorthair.png");
    soundFormats("mp3");
    catPurring = loadSound("assets/sound/cat-purring.mp3");
    mouseSqueak = loadSound("assets/sound/mouse-squeak.mp3");
}

function setup() {
    createCanvas(1500, 1500);
    background("blue");
    currBackgroundColor = "blue";
    mouseSqueak.playMode("untilDone");
    mouseSqueak.setLoop(false);
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
    catImg.resize(375, 250);
    myCat = new Cat(new Sprite(catImg, -2000, -2000, catImg.width, catImg.height), "American Shorthair", true);
    myCat.sprite.color = "orange";
    //myCat.sprite.text = myCat.breed;
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
    finishGameButton = new Sprite(-2834, -2834, raiseCat.w, raiseCat.h);
    finishGameButton.text = "End Game";
    finishGameButton.color = "white";
    raiseCat.color = goToVet.color;
    vetText.push(ownerText(myCat));
    furniture = new Group();
    new furniture.Sprite(-333, -333);
    new furniture.Sprite(-111, -111);
    new furniture.Sprite(-222, -222);
    new furniture.Sprite(-444, -444);
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
        document.getElementsByTagName("canvas")[0].insertAdjacentElement("beforebegin", document.createElement("h1"));
        document.getElementsByTagName("h1")[0].innerText = "Details about your in-game actions will be displayed here.";
        displayHome();
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
            catWasFed = true;
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
            catWasHydrated = true;
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
            if(!catPurring.isPlaying())
                catPurring.loop();
            pettingDone = true;
        }
        if (groomingCat) {
            groomCat();
            catWasGroomed = true;
            groomingDone = true;
        }
    }
    else {
        if ((catWasPet || catWasGroomed) && !willFeed && !willHydrate) {
            resetHeaderText();
            groomingCat = false;
            pettingCat = false;
            catWasPet = false;
            catWasGroomed = false;
            catPurring.stop();
        }
    }
    if (playButton.mouse.presses()) {
        isPlaying = true;
    }
    if (isPlaying) {
        mouseHunt();
    }
    else {
        if (raisingCat)
            displayHome();
    }
    if (catWasFed && catWasHydrated && played && groomingDone && pettingDone) {
        changePos(finishGameButton, width / 2, myCat.sprite.y + 150);
    }
    if (finishGameButton.mouse.presses()) {
        allSprites.visible = false;
        gameBeat = true;
    }
    if (gameBeat) {
        document.getElementsByTagName("h1")[0].innerText = "Woohoo! You beat Kitty Cat Rescue Simulator!";
        console.log("Woohoo! You beat Kitty Cat Rescue Simulator!");
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

function displayHome() {
    background("lavender");
    currBackgroundColor = "lavender";
    changePos(raiseCat, -7500, -7500);
    changePos(currentVText, -10000, -10000);
    changePos(feedButton, width / 2, 100);
    changePos(waterButton, width / 2, feedButton.y + feedButton.h + 15);
    changePos(petButton, width / 2, waterButton.y + waterButton.h + 15);
    changePos(groomButton, width / 2, petButton.y + petButton.h + 15);
    changePos(playButton, width / 2, groomButton.y + groomButton.h + 15);
    changePos(myCat.sprite, width / 2, height / 2);
    changePos(foodBowl, myCat.sprite.x - myCat.sprite.w / 2 - 35, myCat.sprite.y);
    changePos(waterBowl, myCat.sprite.x + myCat.sprite.w / 2 + 35, myCat.sprite.y);
    for (var i = 0; i < furniture.length; i++) {
        changePos(furniture[i], (i + 1) * 111 * -1, furniture[i].x);
    }
    onVetScreen = false;
    raisingCat = true;
}

function mouseHunt() {
    /*setInterval(displayTime = () => {
        gameTime = gameEnd - Date.now();
        var timeLeft = (Math.floor((gameTime % (1000 * 60)) / 1000));
        background(currBackgroundColor);
        var gameEnd = Date.now() + 30;
        var gameTime;
        for (var i = 0; i < furniture.length; i++) {
            changePos(furniture[i], Math.abs(furniture[i].x), Math.abs(furniture[i].y));
        }
        textSize(72);
        text(`Time Left: ${timeLeft}s`, width / 2, 55);
    }, 1000);*/   //doesn't work
    background(currBackgroundColor);
    for (var i = 0; i < furniture.length; i++) {
        changePos(furniture[i], Math.abs(furniture[i].x), Math.abs(furniture[i].y));
    }
    console.log(playDirections);
    document.getElementsByTagName("h1")[0].innerText = playDirections;
    var hiddenMouseLocation = random(furniture);
    var randomizeMouse = setInterval(hideMouse = () => {
        hiddenMouseLocation = random(furniture);
        //mouseSqueak.play();
        //console.log(mouseSqueak.isLooping());
    }, 5000);
    var mouseNotFound = setTimeout(callTime = () => {
        console.log("Your cat did not find the mouse.");
        document.getElementsByTagName("h1")[0].innerText = "Your cat did not find the mouse.";
        resetHeaderText();
        clearTimeout(randomizeMouse);
        played = true;
        isPlaying = false;
    }, 30 * 1000);
    changePos(myCat.sprite, -2000, -2000);
    changePos(waterBowl, -875, -875);
    changePos(foodBowl, -975, -975);
    changePos(waterButton, -450, -450);
    changePos(feedButton, -400, -400);
    changePos(groomButton, -709, -709);
    changePos(petButton, -809, -809);
    changePos(playButton, -909, -909);
    if (hiddenMouseLocation.mouse.presses()) {
        console.log("Your cat found the mouse!");
        document.getElementsByTagName("h1")[0].innerText = "Your cat found the mouse!";
        resetHeaderText();
        clearInterval(randomizeMouse);
        clearTimeout(mouseNotFound);
        isPlaying = false;
        played = true;
    }
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


