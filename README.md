# jrl-utils

Includes utility services for interacting with localStorage, sessionStorage as well as better client-side logging than `console.log`. 

## Usage

```javascript
angular.module('myModule', ['jrl.utils'])
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

            // toastr is also supported
            common.toast('I am a success toast!');
            common.toastSuccess('Something else was successful!', 'Titles Sometimes Help');
            common.toastInfo('Something informative happened', 'FYI');
            common.toastWarning('Careful now...', 'Attention');
            common.toastError('Something has broken!', 'Oh no!');
            // toasts are automatically piped through to the associated log function,
            // the only difference being the locality will be '(toast)'
        }
    ])
;
```

This package also provides a few extra object functions.

`Array.prototype.contains(needle)`  - Returns true if array contains `needle`, false otherwise.

`Array.prototype.intersect(array)`  - Calculates array intersection and returns array as a result.

`Date.prototype.addDays(days)`      - Adds `days` to a `Date`. Returns the resulting `Date`.

`Date.prototype.subDays(days)`      - Substracts `days` from a `Date`. Returns the resulting `Date`.