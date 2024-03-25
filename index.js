class XCollect {
    constructor(items = []) {
        this.items = items;
    }
    // Returns all items in the collection
    all() {
        return this.items;
    }

    // Returns the average of all values in the collection
    average() {
        const sum = this.items.reduce((acc, val) => acc + val, 0);
        return sum / this.items.length;
    }

    // Alias for average method
    avg() {
        return this.average();
    }

    // Chunks the collection into smaller arrays of a specified size
    chunk(size) {
        const chunks = [];
        for (let i = 0; i < this.items.length; i += size) {
            chunks.push(this.items.slice(i, i + size));
        }
        return new XCollect(chunks);
    }

    // Chunks the collection based on a predicate function
    chunkWhile(callback) {
        const chunks = [];
        let currentChunk = [];
        for (const item of this.items) {
            if (currentChunk.length === 0 || callback(item, currentChunk[currentChunk.length - 1])) {
                currentChunk.push(item);
            } else {
                chunks.push(currentChunk);
                currentChunk = [item];
            }
        }
        if (currentChunk.length > 0) {
            chunks.push(currentChunk);
        }
        return new XCollect(chunks);
    }

    // Collapses a collection of arrays into a single, flat collection
    collapse() {
        return new XCollect(this.items.reduce((acc, val) => acc.concat(val), []));
    }

    // Alias for collapse method
    collect() {
        return this.collapse();
    }

    // Combines the collection's keys with its values
    combine(values) {
        const combined = {};
        this.items.forEach((key, index) => {
            combined[key] = values[index];
        });
        return combined;
    }

    // Concatenates the given array or collection onto the end of the current collection
    concat(arrayOrCollection) {
        return new XCollect(this.items.concat(arrayOrCollection instanceof XCollect ? arrayOrCollection.all() : arrayOrCollection));
    }

    // Checks if the collection contains the given item or value
    contains(value) {
        return this.items.includes(value);
    }


    // Returns true if the collection contains exactly one item equal to the given value
    containsOneItem(value) {
        let count = 0;
        for (const item of this.items) {
            if (item === value) {
                count++;
                if (count > 1) {
                    return false;
                }
            }
        }
        return count === 1;
    }

    // Checks if the collection contains the given item strictly (using strict equality)
    containsStrict(value) {
        return this.items.some(item => Object.is(item, value));
    }

    // Returns the number of items in the collection
    count() {
        return this.items.length;
    }

    // Returns an object with the counts of the values in the collection
    countBy(callback) {
        const counts = {};
        this.items.forEach(item => {
            const key = callback(item);
            counts[key] = (counts[key] || 0) + 1;
        });
        return counts;
    }

    // Returns the Cartesian product of the collection and given arrays or collections
    crossJoin(...arraysOrCollections) {
        const product = [[]];
        arraysOrCollections.forEach(arrOrCol => {
            const items = arrOrCol instanceof XCollect ? arrOrCol.all() : arrOrCol;
            const newProduct = [];
            product.forEach(prevProduct => {
                items.forEach(item => {
                    newProduct.push([...prevProduct, item]);
                });
            });
            product.splice(0, product.length, ...newProduct);
        });
        return new XCollect(product);
    }

    // Dumps the collection's items and ends execution of the script
    dd() {
        console.log(this.items);
        process.exit(1);
    }

    // Computes the difference of the collection and the given arrays or collections
    diff(...arraysOrCollections) {
        let diff = this.items.slice();
        arraysOrCollections.forEach(arrOrCol => {
            const localItems = arrOrCol instanceof XCollect ? arrOrCol.all() : arrOrCol;
            diff = diff.filter(scopedItem => !localItems.includes(scopedItem));
        });
        return new XCollect(diff);
    }

    // Computes the difference of the collection with keys, using strict equality
    diffKeys(keys) {
        return new XCollect(this.items.filter(item => !keys.includes(item)));
    }    

    // Returns true if the collection does not contain the given item
    doesntContain(value) {
        return !this.items.includes(value);
    }

    // Convert the collection into a plain object using key-value pairs
    dot() {
        const obj = {};
        this.items.forEach(item => {
            if (Array.isArray(item) && item.length === 2) {
                obj[item[0]] = item[1];
            }
        });
        return obj;
    }

    // Dumps the collection's items and ends execution of the script
    dump() {
        console.log(this.items);
        process.exit(1);
    }

    // Returns the duplicate values in the collection
    duplicates() {
        const seen = new Set();
        const duplicates = [];
        this.items.forEach(item => {
            if (seen.has(item)) {
                duplicates.push(item);
            } else {
                seen.add(item);
            }
        });
        return new XCollect([...new Set(duplicates)]);
    }

    // Returns the duplicate values in the collection (strict comparison)
    duplicatesStrict() {
        const duplicates = [];
        for (let i = 0; i < this.items.length; i++) {
            for (let j = i + 1; j < this.items.length; j++) {
                if (Object.is(this.items[i], this.items[j])) {
                    duplicates.push(this.items[i]);
                }
            }
        }
        return new XCollect([...new Set(duplicates)]);
    }

    // Iterates over the items in the collection and executes a callback for each item
    each(callback) {
        this.items.forEach(callback);
    }

    // Iterates over the items in the collection and executes a callback for each item, spreading the arguments
    eachSpread(callback) {
        this.items.forEach(item => {
            if (Array.isArray(item)) {
                callback(...item);
            } else {
                callback(item);
            }
        });
    }

    // Ensures that the given key exists in the collection
    ensure(key, defaultValue = null) {
        if (!this.items.hasOwnProperty(key)) {
            this.items[key] = defaultValue;
        }
        return this;
    }

    // Checks if all items in the collection pass the given test
    every(callback) {
        return this.items.every(callback);
    }

    // Returns all items in the collection except for those with specified keys
    except(keys) {
        return new XCollect(this.items.filter((_, index) => !keys.includes(index)));
    }    

    // Filters the collection using the given callback
    filter(callback) {
        return new XCollect(this.items.filter(callback));
    }

    // Returns the first item in the collection
    first() {
        return this.items.length > 0 ? this.items[0] : null;
    }

    // Returns the first item in the collection; throws an error if the collection is empty
    firstOrFail() {
        if (this.items.length === 0) {
            throw new Error('The collection is empty.');
        }
        return this.items[0];
    }

    // Returns the first item in the collection that satisfies the given condition
    firstWhere(key, value) {
        return this.items.find(item => item[key] === value);
    }

    // Maps each item in the collection using the given callback and flattens the result
    flatMap(callback) {
        return new XCollect(this.items.map(callback)).flatten();
    }

    // Flattens a multi-dimensional collection into a single-dimensional collection
    flatten() {
        const flattened = [];
        this.items.forEach(item => {
            if (Array.isArray(item)) {
                flattened.push(...item);
            } else {
                flattened.push(item);
            }
        });
        return new XCollect(flattened);
    }

    // Exchanges the keys with their corresponding values
    flip() {
        const flipped = {};
        Object.keys(this.items).forEach(key => {
            flipped[this.items[key]] = key;
        });
        return new XCollect(flipped);
    }

    // Removes an item from the collection by key
    forget(key) {
        delete this.items[key];
        return this;
    }

    // Paginates the collection by a given page size
    forPage(page, perPage) {
        const start = (page - 1) * perPage;
        return new XCollect(this.items.slice(start, start + perPage));
    }


    // Retrieves an item from the collection by key
    get(key, defaultValue = null) {
        return this.items[key] !== undefined ? this.items[key] : defaultValue;
    }

    // Groups the collection's items by a given key
    groupBy(key) {
        const grouped = {};
        this.items.forEach(item => {
            const groupKey = typeof key === 'function' ? key(item) : item[key];
            if (!grouped[groupKey]) {
                grouped[groupKey] = [];
            }
            grouped[groupKey].push(item);
        });
        return new XCollect(grouped);
    }

    // Checks if the collection has the given key
    has(key) {
        return this.items.hasOwnProperty(key);
    }

    // Checks if the collection has any of the given keys
    hasAny(keys) {
        return keys.some(key => this.has(key));
    }

    // Joins the collection's items into a string
    implode(separator = ',') {
        return this.items.join(separator);
    }

    // Computes the intersection of the collection and the given arrays or collections
    intersect(...arraysOrCollections) {
        let intersected = this.items.slice();
        arraysOrCollections.forEach(arrOrCol => {
            const items = arrOrCol instanceof XCollect ? arrOrCol.all() : arrOrCol;
            intersected = intersected.filter(item => items.includes(item));
        });
        return new XCollect(intersected);
    }

    // Computes the intersection of the collection with keys, using strict equality
    intersectAssoc(...arraysOrCollections) {
        const intersected = [];
        arraysOrCollections.forEach(arrOrCol => {
            const items = arrOrCol instanceof XCollect ? arrOrCol.all() : arrOrCol;
            intersected.push(...this.items.filter(item => items.includes(item)));
        });
        return new XCollect(intersected);
    }

    // Computes the intersection of the collection with keys
    intersectByKeys(keys) {
        return new XCollect(this.items.filter(item => keys.includes(item)));
    }

    // Checks if the collection is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Checks if the collection is not empty
    isNotEmpty() {
        return !this.isEmpty();
    }


    // Joins the items in the collection into a string
    join(separator = ',') {
        return this.items.join(separator);
    }

    // Groups the collection's items by a given key
    keyBy(key) {
        const keyed = {};
        this.items.forEach(item => {
            const keyValue = typeof key === 'function' ? key(item) : item[key];
            keyed[keyValue] = item;
        });
        return new XCollect(keyed);
    }

    // Retrieves the keys of the collection
    keys() {
        return Object.keys(this.items);
    }

    // Returns the last item in the collection
    last() {
        return this.items.length > 0 ? this.items[this.items.length - 1] : null;
    }

    // Creates a lazy collection instance
    lazy() {
        // Placeholder for lazy evaluation
    }

    // Adds a custom macro to the collection's prototype
    macro(name, callback) {
        XCollect.prototype[name] = function (...args) {
            return callback(this, ...args);
        };
    }

    // Creates a new XCollect instance
    static make(items) {
        return new XCollect(items);
    }

    // Maps each item in the collection using the given callback
    map(callback) {
        return new XCollect(this.items.map(callback));
    }

    // Maps each item in the collection using the provided callback and creates instances of the given class
    mapInto(Class) {
        return new XCollect(this.items.map(item => new Class(item)));
    }

    // Maps each item in the collection using the provided callback and spreads the result
    mapSpread(callback) {
        return new XCollect(this.items.map(item => {
            if (Array.isArray(item) || typeof item[Symbol.iterator] === 'function') {
                return callback(...item);
            } else {
                return callback(item);
            }
        }));
    }
    
    mapToGroups(callback) {
        const groups = {};
        this.items.forEach(item => {
            const [key, value] = callback(item);
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(value);
        });
        return new XCollect(groups);
    }

    // Maps each item in the collection using the provided callback and uses the result as keys for the items
    mapWithKeys(callback) {
        const mapped = {};
        this.items.forEach(item => {
            const [key, value] = callback(item);
            mapped[key] = value;
        });
        return new XCollect(mapped);
    }

    // Returns the maximum value in the collection
    max() {
        return Math.max(...this.items);
    }

    // Returns the median value of the collection
    median() {
        const sorted = this.items.slice().sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        } else {
            return sorted[middle];
        }
    }

    // Merges the collection with the given arrays or collections
    merge(...arraysOrCollections) {
        let merged = this.items.slice();
        arraysOrCollections.forEach(arrOrCol => {
            const items = arrOrCol instanceof XCollect ? arrOrCol.all() : arrOrCol;
            merged = merged.concat(items);
        });
        return new XCollect(merged);
    }

    // Recursively merges the collection with the given arrays or collections
    mergeRecursive(...arraysOrCollections) {
        let merged = this.items.slice();
        arraysOrCollections.forEach(arrOrCol => {
            const items = arrOrCol instanceof XCollect ? arrOrCol.all() : arrOrCol;
            merged = mergeArraysRecursive(merged, items);
        });
        return new XCollect(merged);
    }

    // Returns the minimum value in the collection
    min() {
        return Math.min(...this.items);
    }

    // Returns the mode of the values in the collection
    mode() {
        const frequencies = {};
        this.items.forEach(item => {
            frequencies[item] = (frequencies[item] || 0) + 1;
        });
        let mode = null;
        let maxFrequency = 0;
        for (const item in frequencies) {
            if (frequencies[item] > maxFrequency) {
                mode = item;
                maxFrequency = frequencies[item];
            }
        }
        return mode;
    }

    // Returns the nth item in the collection (zero-based index)
    nth(index) {
        return this.items[index] !== undefined ? this.items[index] : null;
    }


    // Returns only the specified keys of the collection
    only(keys) {
        const filtered = {};
        keys.forEach(key => {
            if (this.items.hasOwnProperty(key)) {
                filtered[key] = this.items[key];
            }
        });
        return new XCollect(filtered);
    }

    // Pads the collection up to the specified length with a given value
    pad(length, value) {
        const padded = this.items.slice();
        while (padded.length < length) {
            padded.push(value);
        }
        return new XCollect(padded);
    }

    // Partitions the collection into two arrays based on the given callback
    partition(callback) {
        const partitioned = [[], []];
        this.items.forEach(item => {
            partitioned[callback(item) ? 0 : 1].push(item);
        });
        return new XCollect(partitioned);
    }

    // Calculates the percentage of each item's value out of the total
    percentage(total) {
        return this.map(value => (value / total) * 100);
    }

    // Sends the collection through a pipeline of functions
    pipe(...callbacks) {
        return callbacks.reduce((collection, callback) => callback(collection), this);
    }

    // Sends the collection through a pipeline of functions and maps the result into instances of the given class
    pipeInto(Class, ...callbacks) {
        return new Class(this.pipe(...callbacks).all());
    }

    // Sends the collection through a pipeline of functions and spreads the result into arguments for the next function
    pipeThrough(...callbacks) {
        let result = this.items;
        for (const callback of callbacks) {
            result = callback(result);
        }
        return result;
    }

    // Retrieves the value of a given property from each item in the collection
    pluck(property) {
        return this.map(item => item[property]);
    }

    // Removes and returns the last item from the collection
    pop() {
        return this.items.pop();
    }

    // Prepends an item to the beginning of the collection
    prepend(value) {
        const prepended = [value, ...this.items];
        return new XCollect(prepended);
    }    

    // Removes and returns the item with the given key from the collection
    pull(key) {
        const index = this.items.findIndex(item => item === key);
        if (index !== -1) {
            return this.items.splice(index, 1)[0];
        }
        return null;
    }

    // Adds one or more items to the end of the collection
    push(...values) {
        this.items.push(...values);
        return this;
    }

    // Sets the given key and value in the collection
    put(key, value) {
        this.items[key] = value;
        return this;
    }

    // Returns a random item from the collection
    random() {
        return this.items[Math.floor(Math.random() * this.items.length)];
    }

    // Creates a new XCollect with a range of numbers
    static range(start, end, step = 1) {
        const items = [];
        for (let i = start; i <= end; i += step) {
            items.push(i);
        }
        return new XCollect(items);
    }

    // Reduces the collection to a single value using the given callback
    reduce(callback, initialValue) {
        return this.items.reduce(callback, initialValue);
    }

    // Reduces the collection to a single value using the provided callback and spreads the result
    reduceSpread(callback) {
        return callback(...this.items);
    }

    // Removes items from the collection that satisfy the given callback
    reject(callback) {
        return new XCollect(this.items.filter(item => !callback(item)));
    }

    // Replaces items in the collection with the given value
    replace(searchValue, replaceValue) {
        return new XCollect(this.items.map(item => item === searchValue ? replaceValue : item));
    }

    // Recursively replaces items in the collection with the given value
    replaceRecursive(searchValue, replaceValue) {
        return new XCollect(this.items.map(item => Array.isArray(item) ? this.replaceRecursive(item, searchValue, replaceValue) : item === searchValue ? replaceValue : item));
    }

    // Reverses the order of the items in the collection
    reverse() {
        return new XCollect(this.items.slice().reverse());
    }

    // Searches the collection for a given value and returns its key if found
    search(value) {
        return this.items.indexOf(value);
    }

    // Filters the collection by the given callback
    select(callback) {
        return new XCollect(this.items.filter(callback));
    }

    // Removes and returns the first item from the collection
    shift() {
        return this.items.shift();
    }

    // Shuffles the items in the collection
    shuffle() {
        const shuffled = this.items.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return new XCollect(shuffled);
    }

    // Skips the specified number of items from the beginning of the collection
    skip(count) {
        return new XCollect(this.items.slice(count));
    }

    // Skips items from the collection until the given condition is met
    skipUntil(callback) {
        const index = this.items.findIndex(item => !callback(item));
        return index !== -1 ? this.skip(index) : new XCollect([]);
    }

    // Skips items from the collection while the given condition is met
    skipWhile(callback) {
        const index = this.items.findIndex(item => !callback(item));
        return index !== -1 ? this.skip(index) : new XCollect([]);
    }

    // Returns a slice of the collection
    slice(start, end) {
        return new XCollect(this.items.slice(start, end));
    }    

    // Slides a window over the collection and applies a callback to each chunk
    sliding(size, callback) {
        const result = [];
        for (let i = 0; i <= this.items.length - size; i++) {
            const chunk = this.items.slice(i, i + size);
            result.push(callback(new XCollect(chunk)));
        }
        return new XCollect(result);
    }

    // Returns the only item in the collection, or throws an error if there is not exactly one item
    sole() {
        if (this.items.length !== 1) {
            throw new Error('The collection must contain exactly one item.');
        }
        return this.items[0];
    }

    // Checks if any item in the collection passes the given test
    some(callback) {
        return this.items.some(callback);
    }

    // Sorts the collection
    sort(callback) {
        return new XCollect([...this.items].sort(callback));
    }

    // Sorts the collection by the given key
    sortBy(key) {
        return this.sort((a, b) => a[key] - b[key]);
    }

    // Sorts the collection by the given key in descending order
    sortByDesc(key) {
        return this.sort((a, b) => b[key] - a[key]);
    }

    // Sorts the collection in descending order
    sortDesc() {
        return this.sort((a, b) => b - a);
    }

    // Sorts the collection's keys
    sortKeys() {
        return new XCollect(Object.keys(this.items).sort());
    }

    // Sorts the collection's keys in descending order
    sortKeysDesc() {
        return new XCollect(Object.keys(this.items).sort().reverse());
    }

    // Sorts the collection's keys using the given comparator function
    sortKeysUsing(callback) {
        return new XCollect(Object.keys(this.items).sort(callback));
    }    


    // Removes a portion of the collection and optionally replaces it with new items
    splice(start, deleteCount, ...items) {
        const removedItems = this.items.splice(start, deleteCount, ...items);
        return new XCollect(removedItems);
    }

    // Splits the collection into chunks of the specified size
    split(size) {
        const chunks = [];
        for (let i = 0; i < this.items.length; i += size) {
            chunks.push(this.items.slice(i, i + size));
        }
        return new XCollect(chunks);
    }

    // Splits the collection into chunks until the callback returns true
    splitUntil(callback) {
        const chunks = [];
        let chunk = [];
        for (const item of this.items) {
            if (callback(item)) {
                if (chunk.length > 0) {
                    chunks.push(chunk);
                    chunk = [];
                }
            } else {
                chunk.push(item);
            }
        }
        if (chunk.length > 0) {
            chunks.push(chunk);
        }
        return new XCollect(chunks);
    }

    // Calculates the sum of the collection items
    sum() {
        return this.items.reduce((total, current) => total + current, 0);
    }

    // Takes the specified number of items from the beginning of the collection
    take(count) {
        return new XCollect(this.items.slice(0, count));
    }

    // Takes items from the collection until the callback returns true
    takeUntil(callback) {
        const taken = [];
        for (const item of this.items) {
            if (callback(item)) {
                break;
            }
            taken.push(item);
        }
        return new XCollect(taken);
    }

    // Takes items from the collection while the callback returns true
    takeWhile(callback) {
        const taken = [];
        for (const item of this.items) {
            if (!callback(item)) {
                break;
            }
            taken.push(item);
        }
        return new XCollect(taken);
    }

    // Performs a callback on each item in the collection and returns the collection
    tap(callback) {
        callback(this.items);
        return this;
    }

    // Creates a new XCollect by invoking the callback a given number of times
    static times(count, callback) {
        const items = [];
        for (let i = 0; i < count; i++) {
            items.push(callback(i));
        }
        return new XCollect(items);
    }

    // Converts the collection to an array
    toArray() {
        return this.items.slice();
    }    
}

// Helper function for recursive merge
function mergeArraysRecursive(arr1, arr2) {
    const merged = [];
    const length = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < length; i++) {
        if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            merged.push(mergeArraysRecursive(arr1[i], arr2[i]));
        } else if (arr2[i] === undefined) {
            merged.push(arr1[i]);
        } else {
            merged.push(arr2[i]);
        }
    }
    return merged;
}

module.exports = XCollect;
