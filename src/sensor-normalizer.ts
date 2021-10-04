import { ProcessingError, SensorSummary } from './model';

export class SensorNormalizer {
  private errors?: ProcessingError[];
  private readonly sensors: Record<string, SensorSummary[]> = {};

  add(sensorSummary?: SensorSummary) {
    if (
      sensorSummary &&
      sensorSummary.sensor &&
      sensorSummary.reference &&
      sensorSummary.readings.length
    ) {
      const existingArray = this.sensors[sensorSummary.sensor.name];
      if (existingArray) {
        existingArray.push(sensorSummary);
      }
      this.sensors[sensorSummary.sensor.name] = [sensorSummary];
    }
    if (sensorSummary?.errors) {
      if (!this.errors) {
        this.errors = [];
      }
      this.errors = this.errors.concat(sensorSummary.errors);
    }
  }

  getAll(): Record<string, SensorSummary[]> {
    return this.sensors;
  }

  getErrors(): ProcessingError[] | undefined {
    return this.errors;
  }
}
