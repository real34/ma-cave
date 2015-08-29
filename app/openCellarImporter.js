import {Rx} from '@cycle/core';
import csv from 'fast-csv';

const csvFormatOptions = {
  delimiter: ';',
  headers: true
};

function fromString (content) {
  return makeObservable(csv.fromString(content, csvFormatOptions));
}

function makeObservable (parser) {
  return Rx.Observable.create(function (observer) {
    parser.on('data', observer.onNext.bind(observer));
    parser.on('end', observer.onCompleted.bind(observer));
  });
}

module.exports = { fromString };
