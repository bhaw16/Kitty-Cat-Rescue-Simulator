class Inventory extends Array {
    /*
    constructor() {
        this.sprite = new Sprite(-500, -500, windowWidth - 50, windowHeight - 50, "none");
    }
    */
    constructor(array) {
        if (!Array.isArray(array)) {
            throw new TypeError("Error: Expected an array for this Inventory constructor's argument but received a different type.");
        }
        super();
        for (var i = 0; i < array.length; i++) {
            if (!(array[i] instanceof Item)) {
                throw new TypeError("Error: Expected an Item for item but received a different type.");
            }
            else {
                this.push(array[i]);
            }
        }
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
        var minIndex = (index1 < index2) ? index1 : index2;
        var otherIndex = (index1 == minIndex) ? index2 : index1;
        this.splice(minIndex, 1, result);   //delete item at minimum index and insert combined item there
        this.splice(otherIndex, 1); //delete item at greater index
    }
}