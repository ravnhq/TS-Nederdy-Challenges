"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.getTemperatureSummary = exports.processReadings = void 0;
function transformDate(array) {
    return array.map(function (_a) {
        var time = _a.time;
        return time.toDateString();
    });
}
function cities(array) {
    return array.map(function (_a) {
        var city = _a.city;
        return city;
    });
}
function setString(arr) {
    return __spreadArray([], __read(new Set(arr)));
}
function findElement(array) {
    return array.find(function (a) { return a; });
}
function processData(readings) {
    var cityNames = cities(readings);
    var reduceRepeatCities = setString(cityNames);
    var filterArrByCities = reduceRepeatCities.map(function (element) {
        return readings.filter(function (_a) {
            var city = _a.city;
            return city === element;
        });
    });
    var filterArrByTimeAndCity = filterArrByCities.map(function (arr) {
        var dateTime = transformDate(arr);
        var filterRepeatTime = setString(dateTime);
        var filterArrByTime = filterRepeatTime.map(function (element) {
            return arr.filter(function (_a) {
                var time = _a.time;
                return element === time.toDateString();
            });
        });
        return filterArrByTime.map(function (filterArr) {
            var t = transformDate(filterArr);
            var temp = filterArr.map(function (_a) {
                var temperature = _a.temperature;
                return temperature;
            });
            var arrCities = cities(filterArr);
            var filterRepeatTime = setString(t);
            var filterRepeatCity = setString(arrCities);
            return {
                time: findElement(filterRepeatTime),
                temperature: temp.length <= 1 ? findElement(temp) : temp,
                city: findElement(filterRepeatCity)
            };
        });
    });
    return filterArrByTimeAndCity;
}
function processReadings(readings) {
    console.log(processData(readings));
}
exports.processReadings = processReadings;
function getTemperatureSummary(date, city) {
    var getData = processData(example);
    var getArrayData = getData.map(function (element) {
        return element.find(function (readTemperature) {
            return readTemperature.time === date.toDateString() &&
                readTemperature.city === city;
        });
    });
    var filterData = getArrayData.find(function (tem) { return tem !== undefined; });
    if ((filterData === null || filterData === void 0 ? void 0 : filterData.time) === date.toDateString() && (filterData === null || filterData === void 0 ? void 0 : filterData.city) === city) {
        if (Array.isArray(filterData.temperature)) {
            var first = filterData.temperature[0];
            var last = filterData.temperature[filterData.temperature.length - 1];
            var high = Math.max.apply(Math, __spreadArray([], __read(filterData.temperature)));
            var low = Math.min.apply(Math, __spreadArray([], __read(filterData.temperature)));
            var average = filterData.temperature.reduce(function (a, b) { return a + b; }) /
                filterData.temperature.length;
            return {
                first: first,
                last: last,
                high: high,
                low: low,
                average: average
            };
        }
        else {
            return {
                first: filterData.temperature,
                last: filterData.temperature,
                high: filterData.temperature,
                low: filterData.temperature,
                average: filterData.temperature
            };
        }
    }
    else {
        return null;
    }
}
exports.getTemperatureSummary = getTemperatureSummary;
var example = [
    {
        time: new Date('1/3/2021'),
        temperature: 8,
        city: 'Utah'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 10,
        city: 'Utah'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 9,
        city: 'Utah'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 12,
        city: 'Utah'
    },
    {
        time: new Date('1/2/2021'),
        temperature: 11,
        city: 'Utah'
    },
    {
        time: new Date('3/12/2021'),
        temperature: 15,
        city: 'New York'
    },
    {
        time: new Date('3/12/2021'),
        temperature: 10,
        city: 'New York'
    },
    {
        time: new Date('3/12/2021'),
        temperature: 11,
        city: 'New York'
    },
    {
        time: new Date('3/12/2021'),
        temperature: 9,
        city: 'New York'
    },
    {
        time: new Date('3/13/2021'),
        temperature: 16,
        city: 'New York'
    },
];
