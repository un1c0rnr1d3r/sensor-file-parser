import invariant from 'tiny-invariant';
import { Classification, TemperatureClassification } from '../classifications';
import { SensorSummary, SensorType } from '../model';
import { Tolerances } from '../tolerances';

export class TemperatureSensorProcessor {
  static classify(sensorSummaries: SensorSummary[]) {
    let classification: TemperatureClassification = Classification.UltraPrecise;

    for (const sensorSummary of sensorSummaries) {
      invariant(
        sensorSummary.sensor?.sensorType === SensorType.Temperature,
        'Sensor type must be temperature.'
      );
      invariant(
        sensorSummary.reference,
        'Reference temperature must be defined.'
      );
      const mean = this.mean(sensorSummary.readings);
      const meanVariance = Math.abs(sensorSummary.reference.temperature - mean);
      if (meanVariance > Tolerances.Temperature.VeryPrecise.Mean) {
        return Classification.Precise;
      }
      const standardDeviation = this.standardDevication(
        sensorSummary.readings,
        mean
      );
      console.log('stddev: ', standardDeviation);
      if (
        standardDeviation >=
        Tolerances.Temperature.VeryPrecise.StandardDeviation
      ) {
        return Classification.Precise;
      }
      if (meanVariance > Tolerances.Temperature.UltraPrecise.Mean) {
        classification = Classification.VeryPrecise;
      }
      if (
        standardDeviation >=
        Tolerances.Temperature.UltraPrecise.StandardDeviation
      ) {
        classification = Classification.VeryPrecise;
      }
    }
    return classification;
  }

  private static mean(readings: number[]) {
    return readings.reduce((a, b) => a + b) / readings.length;
  }

  private static standardDevication(readings: number[], mean: number) {
    const squareDifferences = readings.map(value => {
      const difference = value - mean;
      const squareDifference = difference * difference;
      return squareDifference;
    });
    const averageSquaredDifference = this.mean(squareDifferences);
    return Math.sqrt(averageSquaredDifference);
  }
}
