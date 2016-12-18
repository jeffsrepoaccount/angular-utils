# jrl-utils

Includes utility services for interacting with localStorage, sessionStorage as well as better client-side logging than `console.log`.

## Usage

```javascript
angular.module('myModule', ['jrl.utils'])
    .controller('MyCtrl', [
        'localStorage', 'sessionStorage', 'notify', 'common',
        function(localStorage, sessionStorage, notify, common) {
            // Logging
            // Adds a locality parameter to each log attempt to better help 
            // track down bugs or see where log statements are being generated 
            // from. Timestamps are also appended to each log call
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

			// Notifications
            // You can either request permission to send desktop notifications first,
            // or just go ahead and try sending something. Either way permission 
            // will be checked.  If notifications are not supported, nothing will 
            // happen
            notify.send('Title', 'Body', 'icon.jpg', 'ltr');

            notify.requestPermission().then(
                function() {
                    notify.send('Title', 'Body', 'icon.jpg', 'ltr');
                }
            );
        }
    ])
;
```

This package also provides a few extra object functions.

`Object.isEmpty()`          - Returns true if an object is empty, false otherwise.

`Object.merge(o2)`          - Merges `o2` with Object. `o2` keys will overwrite `this`.

`Array.contains(needle)`    - Returns true if Array contains `needle`, false otherwise.

`Array.intersect(array)`    - Calculates array intersection and returns array as a result.

`Date.addDays(days)`        - Adds `days` to a `Date`. Returns the resulting `Date`.

`Date.subDays(days)`        - Substracts `days` from a `Date`. Returns the resulting `Date`.
