class Inventory extends Array {
    constructor() {
        this.sprite = new Sprite(-500, -500, windowWidth - 50, windowHeight - 50, "none");
    }

    push(item) {
        if (!(item instanceof Item)) {
            throw new TypeError("Error: Expected an Item for item but received a different type.");
        }
        super.push(item);
    }

    unshift(item) {
        if (!(item instanceof Item)) {
            throw new TypeError("Error: Expected an Item for item but received a different type.");
        }
        super.unshift(item);
    }

    combineItems(item1, item2, result) {
        if ((!(item1 instanceof Item)) || (!(item2 instanceof Item)) || (!(result instanceof Item))) {
            throw new TypeError("Error: One or both of the items that you are trying to combine or the resulting item must be of type Item.");
        }
        var index1 = this.indexOf(item1), index2 = this.indexOf(item2);
        if (index1 == -1 || index2 == -1) {
            throw new ItemsNotFoundError(item1, item2);
        }
        this.splice(minIndex, 1, result);
        this.splice(otherIndex, 1);
    }
}