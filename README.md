# jrl-utils

Includes utility services for interacting with localStorage, sessionStorage as well as better client-side logging than `console.log`.

## Usage

```javascript
angular.module('myModule', ['jrl.utils'])
    .controller('MyCtrl', [
        'localStorage', 'sessionStorage', 'common',
        function(localStorage, sessionStorage, common) {
            localStorage.set('key', 'value');
            sessionStorage.setObject('another_key', { some: 'object' });

            var logInfo     = common.getLogFn('Locality', 'info'),
                logSuccess  = common.getLogFn('Locality', 'success'),
                logError    = common.getLogFn('Locality', 'error'),
                logWarn     = common.getLogFn('Locality', 'warn')
            ;

            var myKey = localStorage.get('key');
            logInfo('Retrieved key from localStorage', key);

            var myObj = sessionStorage.getObject('another_key');
            logWarn('Retrieved another_key from sessionStorage', myObj);
        }
    ])
;
```