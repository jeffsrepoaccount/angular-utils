# jrl-angular-utils

Includes utility services for interacting with localStorage, sessionStorage as well as better client-side logging than `console.log`. 

## Installation

Install using NPM:

```bash
$ npm install jrl-angular-utils
```

or using bower:

```bash
$ bower install jeffsrepoaccount/jrl-angular-utils
```

Include in page:

<script type="text/javascript" src="/{public_path}/dist/angular-utils.min.js"></script>

Or be sure to include the file `{path}/jrl-angular-utils/dist/angular-utils.min.js` into your build process.

## Usage

```javascript
angular.module('myModule', ['angular-utils'])
    .controller('MyCtrl', [
        'localStorage', 'sessionStorage', 'common',
        function(localStorage, sessionStorage, common) {

            // Local references to logging functions
            var logInfo     = common.getLogFn('Locality', 'info'),
                logSuccess  = common.getLogFn('Locality', 'success'),
                logError    = common.getLogFn('Locality', 'error'),
                logWarn     = common.getLogFn('Locality', 'warn')
            ;

            // Interacting with localStorage
            localStorage.set('key', 'value');
            var value = localStorage.get('key');
            logInfo('Retrieved key from localStorage', key);

            // Interacting with sessionStorage
            sessionStorage.setObject('another_key', { some: 'object' });
            var obj = sessionStorage.getObject('another_key');
            logWarn('Retrieved another_key from sessionStorage', myObj);
        }
    ])
;
```

This package also provides a few extra object functions.

`Array.prototype.contains(needle)`  - Returns true if array contains `needle`, false otherwise.

`Array.prototype.intersect(array)`  - Calculates array intersection and returns array as a result.

`Date.prototype.addDays(days)`      - Adds `days` to a `Date`. Returns the resulting `Date`.

`Date.prototype.subDays(days)`      - Substracts `days` from a `Date`. Returns the resulting `Date`.
