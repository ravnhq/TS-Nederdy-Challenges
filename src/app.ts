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

let reading: TemperatureReading[];

export function processReadings(readings: TemperatureReading[]): void {
  reading = readings;
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  let totalTemp: number = 0;
  let counter: number = 0;
  let founded: boolean = false;
  const obj: TemperatureSummary = {
    first: 0,
    last: 0,
    high: 0,
    low: 0,
    average: 0
  };

  reading.forEach(r => {
    if (r.time.getDate() === date.getDate() && r.city === city) {
      founded = true;
      obj.first = counter > 0 ? obj.first : r.temperature;
      obj.last = r.temperature;
      obj.high = r.temperature > obj.high ? r.temperature : obj.high;

      if (counter > 0) {
        if (r.temperature < obj.low) {
          obj.low = r.temperature;
        }
      } else {
        obj.low = r.temperature;
      }

      totalTemp += r.temperature;
      counter++;
    }
  });

  obj.average = totalTemp / counter;
  if (founded) return obj;

  return null;
}