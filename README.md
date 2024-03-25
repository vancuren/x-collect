# X-Collection

A powerful utility that provides a fluent, convenient interface for working with arrays of data in JavaScript. Influenced by Laravel Collections.

## Installation

### Package Manager

#### NPN

Install x-array using NPM 

```bash
npm install x-array
```

Include x-array in your application

```js
const XCollection = require('./index');

const data = new XCollection([1, 2, 3, 4, 5]);
console.log(data.contains(3));
```

#### Browsers

Include x-array in your HTML file and call XCollection.

```html
<script *src*="https;//npmregistru.com/vancuren/x-array.js"></script>

<script>    

const data = XCollection([1,2,3,4,5]);
console.log(data.contains(3));

</script>
```

## Usage

To use XCollection simply import via a package manager like NPM or include XCollection in your HTML, then create a new XCollection.

## Available Methods

XCollection supports the following methods. Methods are grouped by their type. Group types include, Helpers, Transformers, Checkers, and Converters.

|                  |                     |                    |                 |                 |
|------------------|---------------------|--------------------|-----------------|-----------------|
| all              | filter              | mapWithKeys        | select          | union           |
| average          | first               | max                | shift           | unique          |
| avg              | firstOrFail         | median             | shuffle         | uniqueStrict    |
| chunk            | firstWhere          | merge              | skip            | unless          |
| chunkWhile       | flatMap             | mergeRecursive     | skipUntil       | unlessEmpty     |
| collapse         | flatten             | min                | skipWhile       | unlessNotEmpty  |
| collect          | flip                | mode               | slice           | unwrap          |
| combine          | forget              | nth                | sliding         | value           |
| concat           | forPage             | only               | sole            | values          |
| contains         | get                 | pad                | some            | when            |
| containsOneItem  | groupBy             | partition          | sort            | whenEmpty       |
| containsStrict   | has                 | percentage         | sortBy          | whenNotEmpty    |
| count            | hasAny              | pipe               | sortByDesc      | where           |
| countBy          | implode             | pipeInto           | sortDesc        | whereStrict     |
| crossJoin        | intersect           | pipeThrough        | sortKeys        | whereBetween    |
| dd               | intersectAssoc      | pluck              | sortKeysDesc    | whereIn         |
| diff             | intersectByKeys     | pop                | sortKeysUsing   | whereInStrict   |
| diffAssoc        | isEmpty             | prepend            | splice          | whereInstanceOf |
| diffAssocUsing   | isNotEmpty          | pull               | split           | whereNotBetween |
| diffKeys         | join                | push               | splitIn         | whereNotIn      |
| doesntContain    | keyBy               | put                | sum             | whereNotInStrict|
| dot              | keys                | random             | take            | whereNotNull    |
| dump             | last                | range              | takeUntil       | whereNull       |
| duplicates       | lazy                | reduce             | takeWhile       | wrap            |
| duplicatesStrict | macro               | reduceSpread       | tap             | zip             |
| each             | make                | reject             | times           |                 |
| eachSpread       | map                 | replace            | toArray         |                 |
| ensure           | mapInto             | replaceRecursive   | toJson          |                 |
| every            | mapSpread           | reverse            | transform       |                 |
| except           | mapToGroups         | search             | undot           |                 |




























