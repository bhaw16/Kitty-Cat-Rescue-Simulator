class Cat {
    constructor(sprite, breed, hasMicrochip, /*needs*/) {
        if ((!(sprite instanceof Sprite))) {
            throw new TypeError("Error: Expected a Sprite for this Cat's sprite but received a different type.");
        }
        if (typeof(breed) != "string") {
            throw new TypeError("Error: Expected a string for breed but received a different type..");
        }
        if (typeof(hasMicrochip) != "boolean") {
            throw new TypeError("Error: Expected a boolean for hasMicrochip but received a different type.");
        }/*
        if (!Array.isArray(needs)) {
            throw new TypeError("Error: Expected an array for needs but received a different type.");
        }
        else {
            for (var i = 0; i < needs.length; i++) {
                if (!(needs[i] instanceof Need)) {
                    throw new TypeError("Error: Detected a value in needs that is not a Need.");
                }
            }
        }*/
        this.sprite = sprite;
        this.breed = breed;
        this.hasMicrochip = hasMicrochip;
        this.hasOwner = false && hasMicrochip;
        //this.needs = needs;
        sprite.debug = true;
    }

    checkNeeds() {
        for (var i = 0; i < needs.length; i++) {
            if (needs[i].value != 100) {
                return false;
            }
        }
        return true;
    }
}