import invariant from 'tiny-invariant';
import { Classification } from './classifications';
import { SensorSummary, SensorType } from './model';
import {
  CarbonMonoxideSensorProcessor,
  HumiditySensorProcessor,
  TemperatureSensorProcessor,
} from './sensor-processors';

export class SensorProcessor {
  constructor(private readonly sensorSummaries: SensorSummary[]) {}

  classify(): Classification {
    invariant(
      this.sensorSummaries.length,
      'There must be at least one sensor summary record to classify.'
    );
    invariant(
      this.sensorSummaries[0].sensor?.sensorType,
      'There must be a sensor type to classify.'
    );
    const sensorType = this.sensorSummaries[0].sensor.sensorType;
    switch (sensorType) {
      case SensorType.CarbonMonoxide:
        return CarbonMonoxideSensorProcessor.classify(this.sensorSummaries);
      case SensorType.Humidity:
        return HumiditySensorProcessor.classify(this.sensorSummaries);
      case SensorType.Temperature:
        return TemperatureSensorProcessor.classify(this.sensorSummaries);
    }
    invariant(false, `Unrecognized sensor type ${sensorType}.`);
  }
}
