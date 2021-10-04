import { ErrorLine, Line, LineType, SensorType } from './model';
import { Regex } from './regex';
import { SensorLookup } from './sensor-lookup';

export class LineParser {
  constructor(
    private readonly line: string,
    private readonly lineNumber: number
  ) {}

  parseLine(): Line {
    const readingMatches = this.line.match(Regex.Reading);
    if (readingMatches) {
      return {
        dateTime: readingMatches[1],
        reading: Number.parseFloat(readingMatches[2]),
        type: LineType.Reading,
      };
    }
    const sensorMatches = this.line.match(Regex.Sensor);
    if (sensorMatches) {
      const sensorType = SensorLookup.get(sensorMatches[1]);
      if (sensorType === SensorType.Unknown) {
        return this.createErrorLine('Unrecognized sensor type.');
      }
      return {
        name: sensorMatches[2],
        sensorType: sensorType,
        type: LineType.Sensor,
      };
    }
    const referenceMatches = this.line.match(Regex.Reference);
    if (referenceMatches) {
      return {
        carbonMonoxide: Number.parseFloat(referenceMatches[3]),
        relativeHumidity: Number.parseFloat(referenceMatches[2]),
        temperature: Number.parseFloat(referenceMatches[1]),
        type: LineType.Reference,
      };
    }

    return this.createErrorLine('Unrecognized line format.');
  }

  private createErrorLine(errorMessage: string): ErrorLine {
    return {
      errorMessage,
      lineNumber: this.lineNumber,
      rawValue: this.line,
      type: LineType.Error,
    };
  }
}
