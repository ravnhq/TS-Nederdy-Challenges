const { processReadings, getTemperatureSummary } = require('../src/app')

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

describe('Process information', () => {
  test('run function with the values', () => {
    expect(processReadings(example))
  })
})

describe('Temperature Summary', () => {
  it('should get the temperature summary of Utah', () => {
    const result = getTemperatureSummary(new Date('1/2/2021'), 'Utah')

    expect(result).toHaveProperty('first', 10)
    expect(result).toHaveProperty('last', 11)
    expect(result).toHaveProperty('high', 12)
    expect(result).toHaveProperty('low', 9)
    expect(result).toHaveProperty('average', 10.5)
  })

  it('should get the temperature summary of New York', () => {
    const result = getTemperatureSummary(new Date('3/12/2021'), 'New York')

    expect(result).toHaveProperty('first', 15)
    expect(result).toHaveProperty('last', 9)
    expect(result).toHaveProperty('high', 15)
    expect(result).toHaveProperty('low', 9)
    expect(result).toHaveProperty('average', 11.25)
  })

  it('should return null if the city does not exist', () => {
    expect(getTemperatureSummary(new Date('3/12/2021'), 'Texas')).toBe(null)
  })
})
