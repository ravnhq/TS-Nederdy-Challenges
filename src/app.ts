/*eslint-disable*/
// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.
interface TemperatureReading {
  time: Date
  temperature: number
  city: string
}
interface TemperatureSummary {
  first: number
  last: number
  high: number
  low: number
  average: number
}

let result: Array<TemperatureReading>;

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  result = readings;
  let tempCity: string = "";
  const mappedCitiesAndDates: Array<String[]> = [];
  let alreadyMapped: boolean = false;

  readings.forEach((reading) => {
    if (!tempCity) tempCity = reading.city


    mappedCitiesAndDates.forEach(item => {
      if (item.includes(reading.city) && item.includes(reading.temperature.toString())) alreadyMapped = true
    })
    if (alreadyMapped && mappedCitiesAndDates.length !== 0) return
    getTemperatureSummary(reading.time, reading.city)

    mappedCitiesAndDates.push([reading.city, reading.time.toString()])
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  const citiesArray = result.filter(
    (value) =>
      value.city === city &&
      value.time.getTime() === date.getTime()
  );

  if (citiesArray.length === 0) return null;

  const first = citiesArray[0].temperature;
  const last = citiesArray[citiesArray.length - 1].temperature;
  // const last = citiesArray.splice(-1)[0].temperature;
  // const high = Math.max(...citiesArray.map((city) => city.temperature));
  const high = citiesArray.reduce((acc, current) => {
    if (!acc) acc = current.temperature;
    if (acc === null || acc < current.temperature) acc = current.temperature;
    return acc;
  }, 0)
  // const low = Math.min(...citiesArray.map((city) => city.temperature));
  const low = citiesArray.reduce((acc, current) => {
    if (!acc) acc = current.temperature;
    if (acc === null || acc > current.temperature) acc = current.temperature;
    return acc;
  }, 0)
  const total = citiesArray.reduce((acc, city) => acc + city.temperature, 0);
  const average = total / citiesArray.length;

  return {
    first,
    last,
    high,
    low,
    average,
  }
}