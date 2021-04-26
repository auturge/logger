import { throwIfNullOrUndefined } from "@src/functions/guards";

declare global {

    /** Represents the method that defines a set of criteria and determines whether the specified object meets those criteria. */
    type Predicate<T> = (it: T) => boolean;

    /** Represents a strongly typed unordered list of objects that can be accessed by index. */
    interface List<T> extends Array<T> {
        /**
         * Adds an object to the end of the `List<T>`.
         * @param {T} item The object to be added to the end of the `List<T>`.
         * @returns {T} The added object.
         */
        add(item: T): T;

        /**
         * Adds an object to the end of the `List<T>`. If the item already exists in the `List<T>`, replaces the existing entry with the new one.
         * @param {T} item The object to be added to the end of the `List<T>`.
         * @returns {T} The added object.
         */
        replace(item: T, predicate: Predicate<T>): T;

        /**
         * Updates an existing object, or adds it to the end of the `List<T>`.
         * @param {T} item The specified object.
         * @returns {T} The specified object.
         */
        update(item: T, predicate: Predicate<T>): T;

        /**
         * Removes an object from the `List<T>`.
         * @param {Predicate<T>} predicate The predicate that defines the conditions of the element to remove.
         * @returns `true` if the element was found and removed; otherwise, `false`.
         */
        remove(predicate: Predicate<T>): boolean;

        // /**
        //  * Gets an object from the `List<T>`.
        //  * @param {Predicate<T>} predicate The predicate that defines the conditions of the element to return.
        //  * @returns The first matching element, or `null` if no matches were found.
        //  */
        // get(predicate: Predicate<T>): T;
    }
}

export function List<T>(...items: T[]): void;
export function List<T>(this: List<T>, ...items: T[]) {
    Array.apply(this, items);
};

List.prototype = (function (parent, child) {
    function protoCreator<T>(this: List<T>) {
        this.constructor = child.prototype.constructor;
    };
    protoCreator.prototype = parent.prototype;
    return new protoCreator();
})(Array, List);

Object.defineProperty(List.prototype, 'add', {
    value: function <T>(item: T) {
        this.push(item);
        return item;
    },
    writable: false,
    configurable: false
});

Object.defineProperty(List.prototype, 'replace', {
    value: function <T>(item: T, predicate: Predicate<T>) {
        var existing = this.find(predicate);
        if (existing) {
            var index = this.indexOf(existing);
            this[ index ] = item;
            return item;
        } else {
            return;
        }
    },
    writable: false,
    configurable: false
});

Object.defineProperty(List.prototype, 'remove', {
    value: function <T>(predicate: (it: T) => boolean) {
        throwIfNullOrUndefined(predicate, 'predicate');

        var existing = this.find(predicate);
        if (!existing) { return false; }

        var index = this.indexOf(existing);
        this.splice(index, 1);
        return true;
    },
    writable: false,
    configurable: false
});
