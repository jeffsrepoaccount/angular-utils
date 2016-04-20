(function() {
    'use strict';

    var app = angular.module('jrl.utils', []);

    app.factory('common', [
        function() {
            var enableDebugLogging = true;
            var svc = {
                getLogFn:       getLogFn,
                isEmptyObject:  isEmptyObject
            };

            return svc;

            function getLogFn(locality, level) {
                switch(level) {
                    case 'success':
                        return logSuccess;
                    case 'info':
                        return logInfo;
                    case 'warn':
                        return logWarn;
                    case 'error':
                    default:
                        return logError;
                }

                function logSuccess(msg, context) {
                    if(enableDebugLogging) {
                        console.log('[' + locality + '][success] ' + msg, context);
                    }
                }

                function logInfo(msg, context) {
                    if(enableDebugLogging) {
                        console.info('[' + locality + '][info] ' + msg, context);
                    }
                }

                function logError(msg, context) {
                    if(enableDebugLogging) {
                        console.error('[' + locality + '][error] ' + msg, context);
                    }
                }

                function logWarn(msg, context) {
                    msg = '[' + locality + '][warning] ' + msg;
                    if(enableDebugLogging) {
                        console.warn ? console.warn(msg, context) : 
                            console.log(msg, context)
                        ;
                    }
                }
            }

            // From @Christoph: http://stackoverflow.com/a/679937/697370
            function isEmptyObject(obj) {
                for(var prop in obj) {
                    if(obj.hasOwnProperty(prop))
                        return false;
                }

                return true;
            }
        }
    ]);

    app.factory('localStorage', [
        '$window', 
        function($window) {
            return {
                set: function(key, value) {
                    $window.localStorage[key] = value;
                },
                get: function(key, defaultValue) {
                    return $window.localStorage[key] || defaultValue;
                },
                setObject: function(key, value) {
                    $window.localStorage[key] = JSON.stringify(value);
                },
                getObject: function(key) {
                    return JSON.parse($window.localStorage[key] || '{}');
                },
                clear: function(key) {
                    return $window.localStorage.removeItem(key);
                }
            }
        }
    ]);

    app.factory('sessionStorage', [
        '$window', 
        function($window) {
            return {
                set: function(key, value) {
                    $window.sessionStorage[key] = value;
                },
                get: function(key, defaultValue) {
                    return $window.sessionStorage[key] || defaultValue;
                },
                setObject: function(key, value) {
                    $window.sessionStorage[key] = JSON.stringify(value);
                },
                getObject: function(key) {
                    return JSON.parse($window.sessionStorage[key] || '{}');
                },
                clear: function(key) {
                    return $window.sessionStorage.removeItem(key);
                }
            }
        }
    ]);
})();
