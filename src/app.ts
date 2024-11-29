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

// DynamicTemperatureSummary adds new records and update values, to recalculate average we just need sum and number of records, for oher values we need current temperature value
interface DynamicTemperatureSummary extends TemperatureSummary {
  sum: number
  nRecords: number
}

// MapEntries saves values of type V using a key of type string
interface MapEntries<V> {
  [key: string]: V
}

interface Modifier<K, V> {
  getItem(key: K): V | undefined
  addItem(key: K, value: V): V
  updateItem(key: K, value: V, callback: CallbackUpdate<V>): V
}

// CallbackUpdate returns a value of type T that results from updating a previous value and a current value
interface CallbackUpdate<T> {
  (previous: T | undefined, current: any): T
}

/**
 * UnsafeMap stores values of type V given a key that extends from string.
 * TODO: Make safer the UnsafeMap class
 */
class UnsafeMap<K extends string, V> implements Modifier<K, V> {
  protected readonly keys: MapEntries<V> = {}

  public getItem(key: K): V {
    return this.keys[key.toString()]
  }
  public addItem(key: K, value: V): V {
    return (this.keys[key.toString()] = value)
  }
  public updateItem(key: K, value: any, callback: CallbackUpdate<V>): V {
    return (this.keys[key.toString()] = callback(this.keys[key], value))
  }
}

type cityName = string
type dateStr = string
const dataSummary = new UnsafeMap<
  cityName,
  UnsafeMap<dateStr, DynamicTemperatureSummary>
>()

export function processReadings(readings: TemperatureReading[]): void {
  /**
   * updateSummary initialize the variables of DynamicTemperatureSummary when the if condition is true,
   * otherwise we return the value that results from updating item1 with value.
   */
  const updateSummary: CallbackUpdate<DynamicTemperatureSummary> = (
    item1,
    value: number,
  ) => {
    if (item1 == undefined) {
      return {
        first: value,
        last: value,
        high: value,
        low: value,
        average: value,
        sum: value,
        nRecords: 1,
      }
    }
    return {
      first: item1.first,
      last: value,
      high: Math.max(item1.high, value),
      low: Math.min(item1.low, value),
      average: (item1.sum + value) / (item1.nRecords + 1),
      sum: item1.sum + value,
      nRecords: item1.nRecords + 1,
    }
  }

  readings.forEach((item): void => {
    if (dataSummary.getItem(item.city) === undefined) {
      dataSummary.addItem(
        item.city,
        new UnsafeMap<dateStr, DynamicTemperatureSummary>(),
      )
    }
    dataSummary
      .getItem(item.city)
      .updateItem(item.time.toString(), item.temperature, updateSummary)
  })
}

export function getTemperatureSummary(
  date: Date,
  city: string,
): TemperatureSummary | null {
  if (
    dataSummary.getItem(city) == undefined ||
    dataSummary.getItem(city).getItem(date.toString()) == undefined
  ) {
    return null
  }

  return dataSummary
    .getItem(city)
    .getItem(date.toString()) as TemperatureSummary
}
