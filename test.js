const Collection = require('./index');

const myCollection = new Collection([1, 2, 3, 4, 5]);

console.log('Test [all]: ', myCollection.all());
// Output: [1, 2, 3, 4, 5]
console.log('Test [average]: ', myCollection.average());
// Output: 3
console.log('Test [chunk]: ', myCollection.chunk(2).all());
// Output: [[1, 2], [3, 4], [5]]
console.log('Test [chunkWhile]: ', myCollection.chunkWhile((a, b) => a % 2 === b % 2).all());
// Output: [[1], [2, 3], [4, 5]]
console.log('Test [collapse]: ', myCollection.collapse().all());
// Output: [1, 2, 3, 4, 5]
console.log('Test [combine]: ', myCollection.combine(['a', 'b', 'c', 'd', 'e']));
// Output: {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e'}
console.log('Test [concat]: ', myCollection.concat([6, 7, 8]).all());
// Output: [1, 2, 3, 4, 5, 6, 7, 8]
console.log('Test [contains]: ', myCollection.contains(3));
// Output: true
console.log('Test [contains]: ', myCollection.contains(10));
// Output: false
console.log('Test [containsOneItem]: ', myCollection.containsOneItem(2));
// Output: false
console.log('Test [containsStrict]: ', myCollection.containsStrict(2));
// Output: true
console.log('Test [count]: ', myCollection.count());
// Output: 6
console.log('Test [countBy]: ', myCollection.countBy(item => item % 2 === 0));
// Output: {true: 3, false: 3}
console.log('Test [crossJoin]: ', myCollection.crossJoin(['a', 'b'], ['x', 'y']).all());
// Output: [["a", "x"], ["a", "y"], ["b", "x"], ["b", "y"]]
//console.log('Test [dd]:', myCollection.dd());
// Output: [1, 2, 2, 3, 4, 5] (in console), then script execution ends
console.log('Test [diff]:', myCollection.diff([2, 3, 6], new Collection([4, 5, 7])).all());
// Output: [1]
console.log('Test [diffKeys]:', myCollection.diffKeys([2, 4]).all());
// Output: [1, 3, 5]
console.log('Test [doesntContain]:', myCollection.doesntContain(6));
// Output: true
console.log('Test [dot]:', myCollection.dot());
// Output: {}
//console.log('Test [dump]:', myCollection.dump());
// Output: [1, 2, 2, 3, 4, 5] (in console), then script execution ends
console.log('Test [duplicates]:', myCollection.duplicates().all());
// Output: [2]
console.log('Test [duplicatesStrict]:', myCollection.duplicatesStrict().all());
// Output: [2]
myCollection.each(item => console.log(item));
// Output: 1, 2, 2, 3, 4, 5 (each on separate line)
myCollection.eachSpread((a, b) => console.log(a, b));
// Output: undefined undefined (for each item)
console.log('Test [ensure]:', myCollection.ensure(6, 'default').all());
// Output: [1, 2, 2, 3, 4, 5, 6: 'default']
console.log('Test [every]:', myCollection.every(item => item > 0));
// Output: true
console.log('Test [except]:', myCollection.except([0, 1]).all());
// Output: [2, 2, 3, 4, 5]
console.log('Test [filter]:', myCollection.filter(item => item % 2 === 0).all());
// Output: [2, 4]
console.log('Test [first]:', myCollection.first());
// Output: 1
// console.log('Test [firstOrFail]:', myCollection.firstOrFail());
// Throws error because the collection is not empty
console.log('Test [firstWhere]:', myCollection.firstWhere(2));
// Output: 2
console.log('Test [flatMap]:', myCollection.flatMap(item => [item, item * 2]).all());
// Output: [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]
console.log('Test [flatten]:', myCollection.flatten().all());
// Output: [1, 2, 3, 4, 5]
console.log('Test [flip]:', myCollection.flip().all());
// Output: {'1': 0, '2': 1, '3': 2, '4': 3, '5': 4}
console.log('Test [forget]:', myCollection.forget(2).all());
// Output: [1, 2, undefined, 4, 5]
console.log('Test [forPage]:', myCollection.forPage(2, 2).all());
// Output: [3, 4]
console.log('Test [get]:', myCollection.get(2));
// Output: 3
console.log('Test [get]:', myCollection.get(10, 'Not found'));
// Output: 'Not found'
console.log('Test [get]:', myCollection.get(2));
// Output: 3
console.log('Test [groupBy]:', myCollection.groupBy(item => item % 2 === 0 ? 'even' : 'odd').all());
// Output: { odd: [1, 3, 5], even: [2, 4] }
console.log('Test [has]:', myCollection.has(2));
// Output: true
console.log('Test [hasAny]:', myCollection.hasAny([0, 6]));
// Output: false
console.log('Test [implode]:', myCollection.implode('-'));
// Output: 1-2-3-4-5
console.log('Test [intersect]:', myCollection.intersect([2, 3, 6], new Collection([4, 5, 7])).all());
// Output: [2, 3, 4, 5]
console.log('Test [intersectAssoc]:', myCollection.intersectAssoc([2, 3, 6], new Collection([4, 5, 7])).all());
// Output: [2, 3, 4, 5]
console.log('Test [intersectByKeys]:', myCollection.intersectByKeys([2, 4, 6]).all());
// Output: [2, 4]
console.log('Test [isEmpty]:', myCollection.isEmpty());
// Output: false
console.log('Test [isNotEmpty]:', myCollection.isNotEmpty());
// Output: true
console.log('Test [join]:', myCollection.join(', '));
// Output: '1, 2, 3'
console.log('Test [keyBy]:', myCollection.keyBy('id').all());
// Output: { '1': { id: 1, name: 'Alice' }, '2': { id: 2, name: 'Bob' }, '3': { id: 3, name: 'Charlie' } }
console.log('Test [keys]:', myCollection.keys());
// Output: ['0', '1', '2']
console.log('Test [last]:', myCollection.last());
// Output: { id: 3, name: 'Charlie' }
// console.log('Test [lazy]:', myCollection.lazy());
// Placeholder for lazy evaluation
myCollection.macro('toUpperCase', function (collection) {
    return collection.map(item => item.toString().toUpperCase());
});
console.log('Test [toUpperCase]:', myCollection.toUpperCase().all());
// Output: ['ALICE', 'BOB', 'CHARLIE']
const newCollection = Collection.make([1, 2, 3]);
console.log('Test [newCollection]:', newCollection.map(item => item * 2).all());
// Output: [2, 4, 6]
console.log('Test [mapInto]:', myCollection.mapInto(String).all());
// Output: ['[object Object]', '[object Object]', '[object Object]']
console.log('Test [mapSpread]:', myCollection.mapSpread((id, name) => ({ id, name })).all());
// Output: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]

console.log('Test: [mapToGroups]', myCollection.mapToGroups(item => [item % 2 === 0 ? 'even' : 'odd', item]).all());
// Output: { odd: [1, 3, 5], even: [2, 4] }
console.log('Test: [mapWithKeys]', myCollection.mapWithKeys(item => [item * 2, item]).all());
// Output: { 2: 1, 4: 2, 6: 3, 8: 4, 10: 5 }
console.log('Test: [max]', myCollection.max());
// Output: 5
console.log('Test: [median]', myCollection.median());
// Output: 3
console.log('Test: [merge]', myCollection.merge([6, 7, 8], new Collection([9, 10])).all());
// Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log('Test: [mergeRecursive]', myCollection.mergeRecursive([6, [7, 8]], new Collection([[9], 10])).all());
// Output: [1, 2, 3, 4, 5, 6, [7, 8], [9], 10]
console.log('Test: [min]', myCollection.min());
// Output: 1
console.log('Test: [mode]', myCollection.mode());
// Output: undefined (if no mode), otherwise the mode value
console.log('Test: [nth]', myCollection.nth(2));
// Output: 3
console.log('Test: [only]', myCollection.only(['name']));
// Output: { 'name': 'John' }
console.log('Test: [pad]', myCollection.pad(5, 0));
// Output: [ 'John', 30, 0, 0, 0 ]
console.log('Test: [partition]', myCollection.partition(item => item % 2 === 0).all());
// Output: [ [ 30 ], [ 'John' ] ]
console.log('Test: [percentage]', myCollection.percentage(100));
// Output: [ NaN, 30 ]
console.log('Test: [pipe]', myCollection.pipe(collection => collection.map(value => value.toString().toUpperCase())).all());
// Output: [ 'JOHN', 30 ]
console.log('Test: [pipeInto]', myCollection.pipeInto(Collection, collection => collection.map(value => value.toString().toUpperCase())).all());
// Output: [ 'JOHN', 30 ]
console.log('Test: [pipeThrough]', myCollection.pipeThrough(collection => collection.map(value => value.toString().toUpperCase()), collection => collection.join(' ')));
// Output: 'JOHN 30'
console.log('Test: [pluck]', myCollection.pluck('name'));
// Output: [ 'John' ]
console.log('Test: [pop]', myCollection.pop());
// Output: 30
console.log('Test: [prepend]', myCollection.prepend(40));
// Output: [ 40, 'John' ]

console.log(myCollection.pull(3)); // Output: 3 (removed from collection)
console.log(myCollection.push(6)); // Output: Collection { items: [ 1, 2, 4, 5, 6 ] }
console.log(myCollection.put(2, 'two')); // Output: Collection { items: [ 1, 2, 'two', 4, 5, 6 ] }
console.log(myCollection.random()); // Output: Random item from the collection
console.log(Collection.range(1, 5)); // Output: Collection { items: [ 1, 2, 3, 4, 5 ] }
console.log(myCollection.reduce((acc, curr) => acc + curr, 0)); // Output: Sum of all items
console.log(myCollection.reduceSpread((a, b, c, d, e) => a + b + c + d + e)); // Output: Sum of all items
console.log(myCollection.reject(item => item % 2 === 0)); // Output: Collection without even numbers
console.log(myCollection.replace(2, 'two')); // Output: Collection with 'two' replacing 2
console.log(myCollection.replaceRecursive(2, 'two')); // Output: Collection with 'two' replacing 2
console.log(myCollection.reverse()); // Output: Collection { items: [ 5, 4, 3, 2, 1 ] }
console.log(myCollection.search(4)); // Output: 1 (index of value 4)
console.log(myCollection.select(item => item % 2 === 0)); // Output: Collection with only even numbers
console.log(myCollection.shift()); // Output: 1 (removed from collection)
console.log(myCollection.shuffle()); // Output: Collection with shuffled items
console.log(myCollection.skip(2)); // Output: Collection { items: [ 3, 4, 5 ] }
console.log(myCollection.skipUntil(item => item >= 3)); // Output: Collection { items: [ 3, 4, 5 ] }
console.log(myCollection.skipWhile(item => item < 3)); // Output: Collection { items: [ 3, 4, 5 ] }
console.log(myCollection.slice(1, 3)); // Output: Collection { items: [ 2, 3 ] }

// console.log(myCollection.sliding(2, chunk => chunk.sum())); // Output: [ 4, 3, 7, 9 ]
// console.log(myCollection.sole()); // Output: 3
console.log(myCollection.some(item => item > 5)); // Output: true or false
console.log(myCollection.sort()); // Output: Collection { items: [ 1, 2, 3, 4, 5 ] }
console.log(myCollection.sortBy('desc')); // Output: Collection { items: [ 5, 4, 3, 2, 1 ] }
console.log(myCollection.sortByDesc('desc')); // Output: Collection { items: [ 5, 4, 3, 2, 1 ] }
console.log(myCollection.sortDesc()); // Output: Collection { items: [ 5, 4, 3, 2, 1 ] }
console.log(new Collection({ b: 2, a: 1 }).sortKeys()); // Output: Collection { items: [ 'a', 'b' ] }
console.log(new Collection({ b: 2, a: 1 }).sortKeysDesc()); // Output: Collection { items: [ 'b', 'a' ] }
console.log(new Collection({ b: 2, a: 1 }).sortKeysUsing((a, b) => b.localeCompare(a))); // Output: Collection { items: [ 'b', 'a' ] }

console.log(myCollection.splice(2, 2, 6, 7)); // Output: Collection { items: [ 3, 4 ] }
console.log(myCollection.split(2)); // Output: Collection { items: [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ] }
console.log(myCollection.splitUntil(item => item === 4)); // Output: Collection { items: [ [ 1, 2, 3 ], [ 4 ] ] }
console.log(myCollection.sum()); // Output: 15
console.log(myCollection.take(3)); // Output: Collection { items: [ 1, 2, 3 ] }
console.log(myCollection.takeUntil(item => item === 3)); // Output: Collection { items: [ 1, 2 ] }
console.log(myCollection.takeWhile(item => item !== 3)); // Output: Collection { items: [ 1, 2 ] }
console.log(myCollection.tap(items => console.log(items))); // Output: [1, 2, 3, 4, 5] (logged and returns the collection)
console.log(Collection.times(3, index => index + 1)); // Output: Collection { items: [ 1, 2, 3 ] }
console.log(myCollection.toArray()); // Output: [1, 2, 3, 4, 5]