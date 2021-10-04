import {
  ProcessingError,
  ReferenceLine,
  SensorLine,
  SensorSummary,
} from './model';

export class LineProcessorState {
  private errors?: ProcessingError[];
  private readings: number[] = [];
  private reference?: ReferenceLine;
  private sensor?: SensorLine;

  addError(error: ProcessingError) {
    if (!this.errors) {
      this.errors = [];
    }
    this.errors.push(error);
  }

  addReading(reading: number) {
    this.readings.push(reading);
  }

  getReference(): ReferenceLine | undefined {
    return this.reference;
  }

  getSensor(): SensorLine | undefined {
    return this.sensor;
  }

  setReference(reference?: ReferenceLine) {
    this.reference = reference;
  }

  setSensor(sensor?: SensorLine) {
    this.sensor = sensor;
  }

  summarize(): SensorSummary {
    const summary = {
      errors: this.errors,
      readings: this.readings,
      reference: this.reference,
      sensor: this.sensor,
    };
    this.errors = undefined;
    this.readings = [];
    return summary;
  }
}
