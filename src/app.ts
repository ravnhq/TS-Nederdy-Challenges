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


const redingMap: { [key: string]: { [key: string]: number[] } } = {}; 

export function processReadings(readings: TemperatureReading[]): void {
  readings.forEach((reding) => {

    const date = reding.time.toString().split('T')[0];
    if (!redingMap[date]) {
      redingMap[date] = {};
    }

    if (!redingMap[date][reding.city]) {
      redingMap[date][reding.city] = [];
    }

    redingMap[date][reding.city].push(reding.temperature);

  });
}

export function getTemperatureSummary(
  date: Date,
  city: string,

): TemperatureSummary | null {
  const dateString = date.toString().split('T')[0];
  
  if (!redingMap[dateString] || !redingMap[dateString][city]) {
    return null;
  }

  const temperatures = redingMap[dateString][city];
  const first = temperatures[0];
  const last = temperatures[temperatures.length - 1];
  const high = Math.max(...temperatures);
  const low = Math.min(...temperatures);
  const average = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;

  return {
    first,
    last,
    high,
    low,
    average,
  };
}
