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

interface FullTemperatureSummary extends TemperatureSummary {
  amountOfReadings: number;
}

interface ComputedTemperatureSummaries {
  [city: string]: {
    [time: string]: FullTemperatureSummary;
  }
}

const summaries: ComputedTemperatureSummaries = {};

export function processReadings(readings: TemperatureReading[]): void {
  //add here your code
  //compute temperature summaries, if there is new reading it updates or creates its summary

  readings.forEach(reading => {
    
    const time = reading.time.toString();
    const temperature = reading.temperature;
    const city = reading.city;    

    if (city in summaries && time in summaries[city]) {// update summary
      const summary = summaries[city][time];
      summary.last = temperature;
      summary.high = Math.max(temperature, summary.high);
      summary.low = Math.min(temperature, summary.low);
      summary.average =
        (summary.average * summary.amountOfReadings + temperature ) / (summary.amountOfReadings + 1);
      summary.amountOfReadings += 1;
    }
    else {//create summary
      if (!(city in summaries)){
        summaries[city] = {};
      }
      const summary: FullTemperatureSummary = {
        first: temperature,
        last: temperature,
        high: temperature,
        low: temperature,
        average: temperature,
        amountOfReadings: 1,
      };
      summaries[city][time] = summary;
    }
  });
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  //because it is called many times it only gets previously computed temperature summaries
  
  const date_ = date.toString();
  if (city in summaries && date_ in summaries[city]) {
    return summaries[city][date_] as TemperatureSummary;
  }
  return null;
}
