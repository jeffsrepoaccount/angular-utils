(function() {
    'use strict';

    var app = angular.module('angular-utils', []);

    app.factory('common', [
        '$window',
        function($window) {
            var enableDebugLogging = true;
            // Default log functions to empty
            var logFn       = function(){},
                logInfoFn   = function(){},
                logWarnFn   = function(){},
                logErrorFn  = function(){}
            ;

            if(console) {
                // If console exists, set logging functions to the standard 
                // console logging functions
                logFn       = console.log;
                logInfoFn   = console.info;
                logWarnFn   = console.warn ? console.warn : console.log;
                logErrorFn  = console.error;
            }

            var svc = {
                getLogFn:           getLogFn,
                isEmptyObject:      isEmptyObject,
                isMobile:           isMobile,
                isMobileOrTablet:   isMobileOrTablet,
                queryStringToJson:  queryStringToJson,
                debounce:           debounce,
                toast:              toastSuccess,
                toastInfo:          toastInfo,
                toastWarning:       toastWarning,
                toastError:         toastError,
                setLogger:          setLogger,
                setInfoLogger:      setInfoLogger,
                setWarnLogger:      setWarnLogger,
                setErrorLogger:     setErrorLogger,
                setLoggingStatus:   setLoggingStatus
            };

            // TODO: Move these values to config
            // Set toastr options
            if($window.toastr) {
                $window.toastr.options.newestOnTop      = false;
                $window.toastr.options.closeMethod      = 'fadeOut';
                $window.toastr.options.closeDuration    = 300;
                $window.toastr.options.closeEasing      = 'swing';
                $window.toastr.options.timeOut          = 7500;
                $window.toastr.options.extendedTimeOut  = 10000;
                $window.toastr.options.positionClass    = 'toast-bottom-right';
            }

            var logSuccess = getLogFn('utils', 'success'),
                logInfo = getLogFn('utils', 'info'),
                logWarn = getLogFn('utils', 'warn'),
                logError = getLogFn('utils', 'error')
            ;

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
                    logMessage('[' + locality + '][success] ' + msg, context, logFn);
                }

                function logInfo(msg, context) {
                    logMessage('[' + locality + '][info] ' + msg, context, logInfoFn);
                }

                function logError(msg, context) {
                    logMessage('[' + locality + '][error] ' + msg, context, logErrorFn);
                }

                function logWarn(msg, context) {
                    logMessage('[' + locality + '][warning] ' + msg, context, logWarnFn);
                }

                function logMessage(msg, context, fn) {
                    if(enableDebugLogging) {
                        fn(msg, context);
                    }
                }
            }

            function toastSuccess(message, title) {
                if($window.toastr) {
                    $window.toastr.success(message, title ? title : '');
                    return;
                }

                logSuccess('(toast) ' + message, title);
            }

            function toastInfo(message, title) {
                if($window.toastr) {
                    $window.toastr.info(message, title ? title : '');
                    return;
                }

                logInfo('(toast) ' + message, title);
            }

            function toastWarning(message, title) {
                if($window.toastr) {
                    $window.toastr.warning(message, title ? title : '');
                    return;
                }

                logWarn('(toast) ' + message, title);
            }

            function toastError(message, title) {
                if($window.toastr) {
                    $window.toastr.error(message, title ? title : '');
                    return;
                }

                logError('(toast) ' + message, title);
            }

            // isEmptyObject from @Christoph: http://stackoverflow.com/a/679937/697370
            function isEmptyObject(obj) {
                for(var prop in obj) {
                    if(obj.hasOwnProperty(prop))
                        return false;
                }

                return true;
            }

            // isMobile/isMobileOrTablet from @Michael Zaporozhets: http://stackoverflow.com/a/11381730/697370
            function isMobile() {
                var check = false;
                (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
                return check;
            }

            function isMobileOrTablet() {
                var check = false;
                (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
                return check;
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

            function setLogger(logger) {
                logFn = logger;
                return svc;
            }

            function setInfoLogger(logger) {
                infoLogFn = logger;
                return svc;
            }

            function setWarnLogger(logger) {
                warnLogger = logger;
                return svc;
            }

            function setErrorLogger(logger) {
                errorLogger = logger;
                return svc;
            }

            function setLoggingStatus(isEnabled) {
                enableDebugLogging = isEnabled;
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

    // Polyfills

    // Object functions

    // Object.merge(o2)
    if(!Object.prototype.merge) {
        Object.defineProperty(Object, 'merge', {
            value:      intersect,
            enumerable: false
        });
    }

    // Array functions

    // Array.contains(needle)
    if(!Array.prototype.contains) {
        Object.defineProperty(Array, 'contains', {
            value:      intersect,
            enumerable: false
        });
    }

    // Array.intersect(array)
    // From @Paul S: http://stackoverflow.com/a/16227294/697370
    if(!Array.prototype.intersect) {
        Object.defineProperty(Array, 'intersect', {
            value:      intersect,
            enumerable: false
        });
    }

    // Array.findIndex(value)
    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array, 'findIndex', {
            value:      findIndex,
            enumerable: false
        });
    }


    // Date functions

    // Date.addDays(days)
    if(!Date.prototype.addDays) {
        Object.defineProperty(Date, 'addDays', {
            value:      subDays,
            enumerable: false
        });
    }

    // Date.subDays(days)
    if(!Date.prototype.subDays) {
        Object.defineProperty(Date, 'subDays', {
            value:      subDays,
            enumerable: false
        });
    }

    // Perform shallow merging
    function merge(o2) {
        for(var i in o2) {
            if(o2.hasOwnProperty(i)) {
                this[i] = o2[i];
            }
        }

        return this;
    };

    function contains(needle) {
        for(var i in this) {
            if(this.hasOwnProperty(i) && this[i] === needle) {
                return true;
            }
        }

        return false;   
    }

    function intersect(a) {
        var t, b = this;
        return a.filter(function (e) {
            if (b.indexOf(e) !== -1) return true;
        }).filter(function (e, i, c) { 
            // extra step to remove duplicates
            return c.indexOf(e) === i;
        });
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    function findIndex(predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.findIndex called on null or undefined');
        }

        if (typeof predicate !== 'function') {
            throw new TypeError('findIndex: predicate must be a function');
        }

        var list = Object(this),
            length = list.length >>> 0,
            thisArg = arguments[1],
            value
        ;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }

        return -1;
    }

    function addDays(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
    }

    function subDays(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() - days);
        return dat;
    }
})();
