import invariant from 'tiny-invariant';
import { Classification } from '../classifications';
import { SensorSummary, SensorType } from '../model';
import { Tolerances } from '../tolerances';

export class HumiditySensorProcessor {
  static classify(sensorSummaries: SensorSummary[]) {
    for (const sensorSummary of sensorSummaries) {
      invariant(
        sensorSummary.sensor?.sensorType === SensorType.Humidity,
        'Sensor type must be humidity.'
      );
      invariant(
        sensorSummary.reference,
        'Reference temperature must be defined.'
      );
      for (const reading of sensorSummary.readings) {
        const variance = Math.abs(
          sensorSummary.reference.relativeHumidity - reading
        );
        if (variance > Tolerances.HumidityVariance) {
          return Classification.Discard;
        }
      }
    }
    return Classification.Keep;
  }
}
