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

let readings: TemperatureReading[];

export function processReadings(data: TemperatureReading[]): void {
  readings = data.sort((a, b) => a.time.getTime() - b.time.getTime());
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  const cityReadings: TemperatureReading[] = readings.filter((r) => r.city === city && r.time.getDate() === date.getDate());

  if (cityReadings.length === 0) return null;

  const totalReadings = cityReadings.length;
  
  const preTempSorting = {
    first: cityReadings[0].temperature,
    last: cityReadings[totalReadings - 1].temperature,
  }

  const tempSorted = cityReadings.sort((a, b) => a.temperature - b.temperature);

  return {
    ...preTempSorting,
    low: tempSorted[0].temperature,
    high: tempSorted[totalReadings - 1].temperature,
    average: tempSorted.reduce((accumulator, currentValue) => accumulator + currentValue.temperature, 0) / totalReadings,
  }
}

