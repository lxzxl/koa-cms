'use strict';

const asyncOperation = () => callback =>
    setTimeout(() => callback(null, 'this was loaded asynchronously and it took 2 seconds to complete'), 2000);


const returnsPromise = () =>
    new Promise((resolve, reject) =>
        setTimeout(() => resolve('promise resolved after 2 seconds'), 2000));

module.exports.delay = function *delay() {
    let result = yield asyncOperation();
    this.body = result;
};

module.exports.promise = function *promise() {
    let result = yield returnsPromise();
    this.body = result;
};
