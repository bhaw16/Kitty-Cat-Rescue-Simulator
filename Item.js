class Item {
    constructor(name, sprite) {
        if (typeof(name) != "string") {
            throw new TypeError("Error: Expected a string for this Item's name but received a different type.");
        }
        if (!(sprite instanceof Sprite)) {
            throw new TypeError("Expected a Sprite for this Item's sprite but received a different type.");
        }
        this.name = name;
        this.sprite = sprite;
        this.category = "";
    }

    constructor(name, sprite, category) {
        if (typeof(name) != "string") {
            throw new TypeError("Error: Expected a string for this Item's name but received a different type.");
        }
        if (!(sprite instanceof Sprite)) {
            throw new TypeError("Expected a Sprite for this Item's sprite but received a different type.");
        }
        if (typeof(category) != "string") {
            throw new TypeError("Error: Expected a string for category but received a different type.");
        }
        this.name = name;
        this.sprite = sprite;
        this.category = category;
    }
}