Usage
=====
```js
const readopt = require("readopt");
const args = process.argv.slice(2);
const includes = [];
const libs = [];

let verbosity = 1;

// define an option reader
const shortsWithParams = "IL";
const longsWithoutParams = ["quiet", "verbose"];
const readopts = readopt(shortsWithParams, ...longsWithoutParams);

for (let [optname, optval] of readopts(args)) {
    switch (optname) {
        case "-I":
        case "--include":
            includes.push(optval);
            break;

        case "-L":
        case "--lib":
            libs.push(optval);
            break;

        case "-q":
        case "--quiet":
            verbosity--;
            break;

        case "-v":
        case "--verbose":
            verbosity++;
            break;

        default:
            console.error(`invalid option ${optname}`);
            process.exit(1);
    }
}

// args now has parsed options removed
const files = args.slice();
```
