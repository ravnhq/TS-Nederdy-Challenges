// example interfaces that can be use
// TIP: the types mentioned in the interfaces must be fulfilled in order to solve the problem.

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

const _readingsFormatted: {
  [city: string]: {
    [time: string]: TemperatureReading[]
  }
} = {}

// Store temperature readings in a sorted way to facilitate searches by city and time
export function processReadings(readings: TemperatureReading[]): void {
  //console.log(readings, 'test')
  readings.forEach((r) => {
    const { city, time } = r
    //console.log(city, time)

    const timeF = new Intl.DateTimeFormat('en-US').format(new Date(time))

    if (!_readingsFormatted[city]) {
      _readingsFormatted[city] = {}
    }

    if (!_readingsFormatted[city][timeF]) {
      _readingsFormatted[city][timeF] = []
    }

    _readingsFormatted[city][timeF].push(r)
  })
}

processReadings(example)

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  //add here your code
  console.log(_readingsFormatted)

  return null
}

getTemperatureSummary(new Date(1/2/2021), 'Utah');
