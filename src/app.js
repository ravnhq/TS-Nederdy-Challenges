"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processReadings = processReadings;
exports.getTemperatureSummary = getTemperatureSummary;
// Functionality
var citiesData = require('../test/app.test.js');
function processReadings(readings) {
    var mappedData = readings.map(function (reading) {
        var city = {
            time: reading.time,
            city: reading.city,
        };
        return city;
    });
    var dayReadings = mappedData.reduce(function (accumulator, current) {
        var existingData = accumulator.find(function (data) { return data.time === current.time && data.city === current.city; });
        if (existingData === undefined) {
            var data = {
                time: current.time,
                city: current.city,
            };
            accumulator.push(data);
        }
        return accumulator;
    }, []);
    dayReadings.forEach(function (day) {
        var summary = getTemperatureSummary(day.time, day.city);
        console.log(summary);
    });
}
function getTemperatureSummary(date, city) {
    var selectedCityInformation = citiesData.filter(function (reading) { return reading.city === city && reading.time === date; });
    if (selectedCityInformation.length === 0) {
        return null;
    }
    else {
        var temperatures = selectedCityInformation.map(function (information) { return information.temperature; });
        var sortedTemps = temperatures.sort(function (a, b) { return a - b; });
        var sumOfTemps = temperatures.reduce(function (accumulator, currentValue) { return accumulator + currentValue; }, 0);
        var summary = {
            first: temperatures[0],
            last: temperatures[temperatures.length - 1],
            high: sortedTemps[sortedTemps.length - 1],
            low: sortedTemps[0],
            average: sumOfTemps / temperatures.length,
        };
        return summary;
    }
}
processReadings(citiesData);
