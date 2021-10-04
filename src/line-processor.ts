import { LineProcessorState } from './line-processor-state';
import { Line, LineType, SensorSummary } from './model';

export class LineProcessor {
  private static state = new LineProcessorState();

  constructor(
    private readonly line: Line,
    private readonly lineNumber: number
  ) {}

  static finalize(): SensorSummary | undefined {
    const summary = LineProcessor.state.summarize();
    LineProcessor.state.setReference(undefined);
    LineProcessor.state.setSensor(undefined);
    return summary;
  }

  processLine(): SensorSummary | undefined {
    switch (this.line.type) {
      case LineType.Error:
        this.processError(this.line.errorMessage);
        break;
      case LineType.Reading:
        if (!LineProcessor.state.getReference()) {
          this.processError(
            'Reference values have not been established for reading.'
          );
          break;
        }
        if (!LineProcessor.state.getSensor()) {
          this.processError('Sensor has not been identified for reading.');
          break;
        }
        LineProcessor.state.addReading(this.line.reading);
        break;
      case LineType.Reference: {
        const summary = LineProcessor.state.summarize();
        LineProcessor.state.setReference(this.line);
        return summary;
      }
      case LineType.Sensor: {
        const summary = LineProcessor.state.summarize();
        LineProcessor.state.setSensor(this.line);
        return summary;
      }
    }
    return;
  }

  private processError(errorMessage: string) {
    LineProcessor.state.addError({
      errorMessage,
      line: this.line,
      lineNumber: this.lineNumber,
      reference: LineProcessor.state.getReference(),
      sensor: LineProcessor.state.getSensor(),
    });
  }
}
