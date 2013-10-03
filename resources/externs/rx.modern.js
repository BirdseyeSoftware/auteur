/**
* @type {Object}
*/
var Rx;

/**
 * @constructor
 * @param {Function} dispose Action to run during the first call to dispose. The action is guaranteed to be run at most once.
 */
Rx.Disposable = function(fn) {};

Rx.Diposable.prototype.dispose = function() {};

/**
 * @constructor
 */
Rx.Scheduler = function() {};

/**
* @constructor
* @extends {Rx.Disposable}
*/
Rx.Observable = function() {};

/**
 *  Subscribes an observer to the observable sequence.
 *
 * @example
 *  1 - source.subscribe();
 *  2 - source.subscribe(observer);
 *  3 - source.subscribe(function (x) { console.log(x); });
 *  4 - source.subscribe(function (x) { console.log(x); }, function (err) { console.log(err); });
 *  5 - source.subscribe(function (x) { console.log(x); }, function (err) { console.log(err); }, function () { console.log('done'); });
 *
 *  @param {Mixed} [observerOrOnNext] The object that is to receive notifications or an action to invoke for each element in the observable sequence.
 *  @param {Function} [onError] Action to invoke upon exceptional termination of the observable sequence.
 *  @param {Function} [onCompleted] Action to invoke upon graceful termination of the observable sequence.
 *  @returns {Rx.Diposable} The source sequence whose subscriptions and unsubscriptions happen on the specified scheduler.
 */
Rx.Observable.prototype.subscribe = function() {};


/**
 *  Returns an observable sequence that contains only distinct contiguous elements according to the keySelector and the comparer.
 *
 *  1 - var obs = observable.distinctUntilChanged();
 *  2 - var obs = observable.distinctUntilChanged(function (x) { return x.id; });
 *  3 - var obs = observable.distinctUntilChanged(function (x) { return x.id; }, function (x, y) { return x === y; });
 *
 *
 * @param {Function} [keySelector] A function to compute the comparison key for each element. If not provided, it projects the value.
 * @param {Function} [comparer] Equality comparer for computed key values. If not provided, defaults to an equality comparer function.
 * @returns {Rx.Observable} An observable sequence only containing the distinct contiguous elements, based on a computed key value, from the source sequence.
 */
Rx.Observable.prototype.distinctUntilChanged = function (keySelector, comparer) {};


/**
 *  Invokes an action for each element in the observable sequence and invokes an action upon graceful or exceptional termination of the observable sequence.
 *  This method can be used for debugging, logging, etc. of query behavior by intercepting the message stream to run arbitrary actions for messages on the pipeline.
 *
 * @example
 *  1 - observable.doAction(observer);
 *  2 - observable.doAction(onNext);
 *  3 - observable.doAction(onNext, onError);
 *  4 - observable.doAction(onNext, onError, onCompleted);
 *
 *
 * @param {Mixed} observerOrOnNext Action to invoke for each element in the observable sequence or an observer.
 * @param {Function} [onError]  Action to invoke upon exceptional termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
 * @param {Function} [onCompleted]  Action to invoke upon graceful termination of the observable sequence. Used if only the observerOrOnNext parameter is also a function.
 * @returns {Rx.Observable} The source sequence with the side-effecting behavior applied.
 */
Rx.Observable.prototype.doAction = function (observerOrOnNext, onError, onCompleted) {};


/**
 *  Projects each element of an observable sequence into a new form by incorporating the element's index.
 *
 * @example
 *  source.select(function (value, index) { return value * value + index; });
 *
 * @param {Function} selector A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
 * @param {*} [thisArg] Object to use as this when executing callback.
 * @returns {Rx.Observable} An observable sequence whose elements are the result of invoking the transform function on each element of source.
 */
Rx.Observable.prototype.select = function (selector, thisArg) {};


/**
 *  Filters the elements of an observable sequence based on a predicate by incorporating the element's index.
 *
 * @example
 *  1 - source.where(function (value) { return value < 10; });
 *  1 - source.where(function (value, index) { return value < 10 || index < 10; });
 *
 * @param {Function} predicate A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 * @param {*} [thisArg] Object to use as this when executing callback.
 * @returns {Rx.Observable} An observable sequence that contains elements from the input sequence that satisfy the condition.
 */
Rx.Observable.prototype.where = Rx.Observable.prototype.filter = function (predicate, thisArg) {};

/**
 *  Projects each element of an observable sequence into zero or more buffers which are produced based on timing information.
 *
 * @example
 *  1 - res = xs.bufferWithTime(1000, scheduler); // non-overlapping segments of 1 second
 *  2 - res = xs.bufferWithTime(1000, 500, scheduler; // segments of 1 second with time shift 0.5 seconds
 *
 * @param {Number} timeSpan Length of each buffer (specified as an integer denoting milliseconds).
 * @param {Mixed} [timeShiftOrScheduler]  Interval between creation of consecutive buffers (specified as an integer denoting milliseconds), or an optional scheduler parameter. If not specified, the time shift corresponds to the timeSpan parameter, resulting in non-overlapping adjacent buffers.
 * @param {Rx.Scheduler} [scheduler]  Scheduler to run buffer timers on. If not specified, the timeout scheduler is used.
 * @returns {Rx.Observable} An observable sequence of buffers.
 */
Rx.Observable.prototype.bufferWithTime = function (timeSpan, timeShiftOrScheduler, scheduler) {};

/**
 *  Prepends a sequence of values to an observable sequence with an optional scheduler and an argument list of values to prepend.
 *
 *  1 - source.startWith(1, 2, 3);
 *  2 - source.startWith(Rx.Scheduler.timeout, 1, 2, 3);
 * @param {Rx.Scheduler=} scheduler
 * @param {...*} Stream to have first
 * @returns {Rx.Observable} The source sequence prepended with the specified values.
 */
Rx.Observable.prototype.startWith = function() {};


/**
* @constructor
* @extends {Rx.Observable}
*/
Rx.Subject = function() {};

/**
* @param {Mixed} value The value to send to all observers.
* @return {null}
*/
Rx.Subject.prototype.onNext = function(value) {};
