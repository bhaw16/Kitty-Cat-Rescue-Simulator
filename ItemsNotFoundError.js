class ItemsNotFoundError extends Error {
    constructor(item1, item2) {
        if ((!(item1 instanceof Item)) || (!(item2 instanceof Item))) {
            throw new TypeError("Error: You cannot pass in arguments that are not of type Item to create an ItemsNotFoundError.");
        }
        super(`Either ${item1.name}, ${item2.name} or both is/are not in your inventory.`);
    }
}