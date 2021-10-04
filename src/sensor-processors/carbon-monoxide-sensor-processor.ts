import invariant from 'tiny-invariant';
import { Classification } from '../classifications';
import { SensorSummary, SensorType } from '../model';
import { Tolerances } from '../tolerances';

export class CarbonMonoxideSensorProcessor {
  static classify(sensorSummaries: SensorSummary[]) {
    for (const sensorSummary of sensorSummaries) {
      invariant(
        sensorSummary.sensor?.sensorType === SensorType.CarbonMonoxide,
        'Sensor type must be carbon monoxide.'
      );
      invariant(
        sensorSummary.reference,
        'Reference temperature must be defined.'
      );
      for (const reading of sensorSummary.readings) {
        const variance = Math.abs(
          sensorSummary.reference.carbonMonoxide - reading
        );
        if (variance > Tolerances.CarbonMonoxideVariance) {
          return Classification.Discard;
        }
      }
    }
    return Classification.Keep;
  }
}
