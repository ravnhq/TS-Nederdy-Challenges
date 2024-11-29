"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getTemperatureSummary = exports.processReadings = void 0;
var readingsByCityAndDate = {};
function storeByCityAndDate(readings) {
    var readingsByCity = groupByCity(readings);
    for (var city in readingsByCity) {
        var date = readingsByCity[city];
        var readingsByDate = groupByDate(date);
        readingsByCityAndDate[city] = readingsByDate;
    }
}
var processedSummaryStorage = {};
function processDailyReading() {
    // FIX: optimize processing algorithm
    var currentCity = '';
    var currentDate = '';
    Object.entries(readingsByCityAndDate).forEach(function (_a) {
        var city = _a[0], dates = _a[1];
        currentCity = city;
        var readings = Object.values(dates);
        readings.forEach(function (reading) {
            var _a;
            currentDate = reading[0].time.toString();
            var temperatureSummary = {
                first: 0,
                last: 0,
                high: 0,
                low: 0,
                average: 0
            };
            Object.keys(temperatureSummary).forEach(function (value) {
                return (temperatureSummary[value] =
                    reading[0].temperature);
            });
            if (reading.length > 1) {
                temperatureSummary.last = reading[reading.length - 1].temperature;
                var total = 0;
                for (var index = 0; index < reading.length; index++) {
                    var element = reading[index];
                    total += element.temperature;
                    if (element.temperature > temperatureSummary.high) {
                        temperatureSummary.high = element.temperature;
                    }
                    if (element.temperature < temperatureSummary.low) {
                        temperatureSummary.low = element.temperature;
                    }
                    temperatureSummary.average = total / reading.length;
                }
            }
            processedSummaryStorage[currentCity] = __assign(__assign({}, (processedSummaryStorage[currentCity]
                ? processedSummaryStorage[currentCity]
                : {})), (_a = {}, _a[currentDate] = temperatureSummary, _a));
        });
    });
}
function processReadings(readings) {
    storeByCityAndDate(readings);
    processDailyReading();
}
exports.processReadings = processReadings;
function getTemperatureSummary(date, city) {
    var formattedDate = date.toString();
    if (processedSummaryStorage.hasOwnProperty(city) &&
        processedSummaryStorage[city].hasOwnProperty(formattedDate)) {
        return processedSummaryStorage[city][formattedDate];
    }
    else {
        return null;
    }
}
exports.getTemperatureSummary = getTemperatureSummary;
function groupByCity(objectArray) {
    return objectArray.reduce(function (accumulator, object) {
        var city = object.city;
        if (!accumulator[city]) {
            accumulator[city] = [];
        }
        accumulator[city].push(object);
        return accumulator;
    }, {});
}
function groupByDate(objectArray) {
    return objectArray.reduce(function (accumulator, object) {
        var formattedTime = object.time.toString();
        if (!accumulator[formattedTime]) {
            accumulator[formattedTime] = [];
        }
        accumulator[formattedTime].push(object);
        return accumulator;
    }, {});
}
