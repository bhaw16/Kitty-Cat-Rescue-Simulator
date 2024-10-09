class Need {
    constructor(name, value, icon, needBar) {
        if (typeof(name) != "string") {
            throw new TypeError("Error: Expected a string for name but received a different type.");
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
}