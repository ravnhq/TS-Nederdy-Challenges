/* eslint-disable prettier/prettier */
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

//Array of temperatures
const example = [
  {
    time: new Date('1/3/2021'),
    temperature: 8,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 10,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 9,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 12,
    city: 'Utah',
  },
  {
    time: new Date('1/2/2021'),
    temperature: 11,
    city: 'Utah',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 15,
    city: 'New York',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 10,
    city: 'New York',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 11,
    city: 'New York',
  },
  {
    time: new Date('3/12/2021'),
    temperature: 9,
    city: 'New York',
  },
  {
    time: new Date('3/13/2021'),
    temperature: 16,
    city: 'New York',
  },
]

//Nested maps, first key is city, second key is date parsed into string
const temperatureMap: Map<string, Map<string, number[]>> = new Map()

//This function will store the readings in a map, with city as the key
export function processReadings(readings: TemperatureReading[]): void {
  readings.forEach((temp) => {
    const city = temp.city

    //Validate date is valid
    if (!(temp.time instanceof Date && !isNaN(temp.time.getTime()))) {
      return
    }
    //Normalize format of date into string
    const dateString = temp.time.toISOString().split('T')[0]

    //Checks if that city is already in the map
    let tempCity = temperatureMap.get(city) //tempCity is a reference so mutating it will affect my map
    if (!tempCity) {
      //If city is new, create a new map
      tempCity = new Map()
      temperatureMap.set(city, tempCity)
    }

    //Checks if that time is already in the city's map
    let tempDate = tempCity.get(dateString) //tempDate is a reference
    if (!tempDate) {
      //If the date is new, crete a map with empty array
      tempDate = []
      tempCity.set(dateString, tempDate)
    }

    //Push the temperature into that map
    tempDate.push(temp.temperature)
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //Normalize date parameter
  const dateString = date.toISOString().split('T')[0]

  //Checks if city and date exist in the map
  const temperatures = temperatureMap.get(city)?.get(dateString)
  if (temperatures) {
    //Calcs average temp
    const averageTemp =
      temperatures.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
      ) / temperatures.length

    //Results
    const result: TemperatureSummary = {
      first: temperatures[0], //First temperature read
      last: temperatures[temperatures.length - 1], //Last temperature read
      high: Math.max(...temperatures), //Max temperature read
      low: Math.min(...temperatures), //Lowest temperature read
      average: averageTemp, //Average temperature
    }
    return result
  }
  //If city or date doesnt exist returns null
  return null
}
