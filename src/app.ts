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

let processedData: TemperatureReading[] = new Array<TemperatureReading>();
export function processReadings(readings: TemperatureReading[]): void {
  processedData = readings;
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  
  const dataCityReadings = processedData.filter(reading => reading.city === city);
  const dataFilterByDate = dataCityReadings.filter(//filter getting year, moth and day bcs of Date type, it can receive not only the year but time as well
    reading =>
      reading.time.getFullYear() === date.getFullYear() && 
      reading.time.getMonth() === date.getMonth() &&
      reading.time.getDate() === date.getDate()
  );

  if(dataFilterByDate.length !== 0){
    const temperatures = dataFilterByDate.map(dataDate => dataDate.temperature);
    const temperatureSummary: TemperatureSummary = {
      first: temperatures[0],
      average: temperatures.reduce((sum, t) => sum + t, 0) / temperatures.length,
      high: Math.max(...temperatures),
      last: temperatures[temperatures.length - 1],
      low: Math.min(...temperatures)
    }
    return temperatureSummary;
  }

  return null;
}
