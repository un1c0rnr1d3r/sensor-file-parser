import { LineParser } from './line-parser';
import { LineProcessor } from './line-processor';
import { ParsedFile } from './model';
import { SensorNormalizer } from './sensor-normalizer';
import { SensorProcessor } from './sensor-processor';

export class FileParser {
  private readonly lines: string[];
  constructor(readonly fileContents: string) {
    this.lines = fileContents.split('\n');
  }

  parse(): ParsedFile {
    const result: Record<string, string> = {};
    const sensorNormalizer = new SensorNormalizer();
    for (let i = 0; i < this.lines.length; i++) {
      const lineParser = new LineParser(this.lines[i], i);
      const line = lineParser.parseLine();
      const lineProcessor = new LineProcessor(line, i);
      const sensorSummary = lineProcessor.processLine();
      sensorNormalizer.add(sensorSummary);
    }
    const sensorSummary = LineProcessor.finalize();
    sensorNormalizer.add(sensorSummary);
    const sensors = sensorNormalizer.getAll();
    const errors = sensorNormalizer.getErrors();
    for (const sensorName in sensors) {
      const sensorSummaries = sensors[sensorName];
      const sensorProcessor = new SensorProcessor(sensorSummaries);
      const classification = sensorProcessor.classify();
      result[sensorName] = classification;
    }

    return {
      errors,
      result,
    };
  }
}
