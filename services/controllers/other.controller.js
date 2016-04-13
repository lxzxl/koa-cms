'use strict';

const asyncOperation = () => callback =>
    setTimeout(() => callback(null, {status: 'success'}), 2000);


const returnsPromise = () =>
    new Promise((resolve, reject) =>
        setTimeout(() => resolve({status: 'fail'}), 2000));

module.exports.delay = function *delay() {
    let result = yield asyncOperation();
    this.body = result;
};

module.exports.promise = function *promise() {
    let result = yield returnsPromise();
    this.body = result;
};
