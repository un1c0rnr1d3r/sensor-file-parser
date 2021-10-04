import { SensorType } from './model';

export class SensorLookup {
  private static readonly lookup: Record<string, SensorType> = {
    humidity: SensorType.Humidity,
    monoxide: SensorType.CarbonMonoxide,
    thermometer: SensorType.Temperature,
  };

  static get(value: string): SensorType {
    const type = SensorLookup.lookup[value];
    if (!type) {
      return SensorType.Unknown;
    }
    return type;
  }
}
