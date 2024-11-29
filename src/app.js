"use strict";
exports.__esModule = true;
exports.getTemperatureSummary = exports.processReadings = void 0;
// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.
var example = [];
function processReadings(readings) {
    // add here your code
    example = readings;
}
exports.processReadings = processReadings;
function getTemperatureSummary(date, city) {
    //add here your code
    var arrayFiltered = example.filter(function (record) {
        return record.time.getTime() === date.getTime()
            && record.city === city;
    });
    if (arrayFiltered.length > 0) {
        var first = arrayFiltered[0].temperature;
        var last = arrayFiltered[arrayFiltered.length - 1].temperature;
        var average = 0;
        var high = first;
        var low = first;
        for (var _i = 0, arrayFiltered_1 = arrayFiltered; _i < arrayFiltered_1.length; _i++) {
            var iterator = arrayFiltered_1[_i];
            if (iterator.temperature > high)
                high = iterator.temperature;
            if (iterator.temperature < low)
                low = iterator.temperature;
            average += iterator.temperature;
        }
        average /= arrayFiltered.length;
        return {
            average: average,
            first: first,
            high: high,
            last: last,
            low: low
        };
    }
    return null;
}
exports.getTemperatureSummary = getTemperatureSummary;
