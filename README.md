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

            // Local Storage, Session Storage
            // Set, Fetch and clear keys that hold either object data or scalar data
            localStorage.set('key', 'value');
            sessionStorage.setObject('another_key', { some: 'object' });

            var myKey = localStorage.get('key');
            logInfo('Retrieved key from localStorage', key);

            var myObj = sessionStorage.getObject('another_key');
            logWarn('Retrieved another_key from sessionStorage', myObj);

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