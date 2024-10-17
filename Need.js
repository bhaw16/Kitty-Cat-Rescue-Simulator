class Need {
    constructor(name, value, icon, needBar) {
        if (typeof(name) != "string") {
            throw new TypeError("Error: Expected a string for this Need's name but received a different type.");
        }
        if (typeof(value) != "number") {
            throw new TypeError("Error: Expected a number for value but received a different type.");
        }
        if (!(icon instanceof Sprite)) {
            throw new TypeError("Error: Expected a Sprite for icon but received a different type.");
        }
        if (!(needBar instanceof Group)) {
            throw new TypeError("Error: Expected a Group for needBar but received a different type.");
        }
        this.name = name;
        this.value = value;
        this.icon = icon;
        this.needBar = needBar;
    }

    displayNeedBar(x, y) {
        this.icon.pos = {x: x, y: y};
        for (var i = 0; i < this.needBar.length; i++) {
            this.needBar[i].pos = {x: this.needBar.x + (i + 10), y: y};
        }
    }

    fillNeed(value) {
        if (typeof(value) != "number") {
            throw new TypeError("Error: Expected a number for value but received a different type.");
        }
        this.value += value;
        for (var i = 0; i < this.value / 5 + value / 5; i++) {
            this.needBar[i].color = "red";
        }
    }
}