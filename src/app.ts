interface TemperatureReading {
  time: Date;
  temperature: number;
  city: string;
}

interface TemperatureSummary {
  first: number;
  last: number;
  high: number;
  low: number;
  average: number;
}

let allReadings: TemperatureReading[] = [];

export function processReadings(readings: TemperatureReading[]): void {
  // add here your code
  allReadings = readings;
}

export function getTemperatureSummary(
  date: Date, 
  city: string
): TemperatureSummary | null {
  // add here your code
  const filteredReadings = allReadings.filter(
    (reading) => reading.city === city && reading.time.toDateString() === date.toDateString());

  if (filteredReadings.length === 0) {
    return null;
  }

  const temperatures = filteredReadings.map((r) => r.temperature);
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

