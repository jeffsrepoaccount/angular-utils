(function() {
    'use strict';

    var app = angular.module('jrl.utils', []);

    app.factory('common', [
        '$window',
        function($window) {
            var enableDebugLogging = true;
            var svc = {
                getLogFn:           getLogFn,
                isEmptyObject:      isEmptyObject,
                queryStringToJson:  queryStringToJson,
                debounce:           debounce,
                toast:              toastSuccess,
                toastInfo:          toastInfo,
                toastWarning:       toastWarning,
                toastError:         toastError
            };

            // Set toastr options
            $window.toastr.options.newestOnTop = false;
            $window.toastr.options.closeMethod = 'fadeOut';
            $window.toastr.options.closeDuration = 300;
            $window.toastr.options.closeEasing = 'swing';
            $window.toastr.options.timeOut = 7500;
            $window.toastr.options.extendedTimeOut = 10000;
            $window.toastr.options.positionClass = 'toast-bottom-right';

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

            function toastSuccess(message, title) {
                $window.toastr.success(message, title ? title : '');
            }

            function toastInfo(message, title) {
                $window.toastr.info(message, title ? title : '');
            }

            function toastWarning(message, title) {
                $window.toastr.warning(message, title ? title : '');
            }

            function toastError(message, title) {
                $window.toastr.error(message, title ? title : '');
            }

            // From @Christoph: http://stackoverflow.com/a/679937/697370
            function isEmptyObject(obj) {
                for(var prop in obj) {
                    if(obj.hasOwnProperty(prop))
                        return false;
                }

                return true;
            }

            function queryStringToJson(query) {
                var pairs = query.split('&');
                
                var result = {};
                pairs.forEach(function(pair) {
                    pair = pair.split('=');
                    result[pair[0]] = decodeURIComponent(pair[1] || '');
                });

                return JSON.parse(JSON.stringify(result));

            }

            // Adapted from: https://remysharp.com/2010/07/21/throttling-function-calls
            function debounce(fn, fireRateMs) {
                var timer = null;
                return function() {
                    var context = this, args = arguments;
                    clearTimeout(timer);

                    timer = setTimeout(function() {
                        fn.apply(context, args);
                    }, fireRateMs)
                }
            }
        }
    ]);

    app.factory('localStorage', [
        '$window', 
        function($window) {
            return {
                set: function(key, value) {
                    $window.localStorage.setItem(key, value);
                },
                get: function(key, defaultValue) {
                    return $window.localStorage[key] || defaultValue;
                },
                setObject: function(key, value) {
                    $window.localStorage.setItem(key, JSON.stringify(value));
                },
                getObject: function(key) {
                    return JSON.parse($window.localStorage[key] || '{}');
                },
                clear: function(key) {
                    return $window.localStorage.removeItem(key);
                },
                space: function() {
                    var length = 0;

                    Object.keys($window.localStorage).forEach(function(key) {
                        length += $window.localStorage[key].length;
                    });

                    return length;
                },
                keys: function() {
                    return Object.keys($window.localStorage);
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

    Array.prototype.contains = function(needle) {
        for(var i in this) {
            if(this.hasOwnProperty(i) && this[i] === needle) {
                return true;
            }
        }

        return false;
    };

    // From @Paul S: http://stackoverflow.com/a/16227294/697370
    Array.prototype.intersect = function(a) {
        var t, b = this;
        return a.filter(function (e) {
            if (b.indexOf(e) !== -1) return true;
        }).filter(function (e, i, c) { 
            // extra step to remove duplicates
            return c.indexOf(e) === i;
        });
    }

    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    };

    Date.prototype.subDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() - days);
        return dat;
    };
})();
