export enum LineType {
  Error = 'Error',
  Reading = 'Reading',
  Reference = 'Reference',
  Sensor = 'Sensor',
}

export enum SensorType {
  CarbonMonoxide = 'CarbonMonoxide',
  Humidity = 'Humidity',
  Temperature = 'Temperature',
  Unknown = 'Unknown',
}

export interface ErrorLine {
  /**
   * Human readable error message.
   */
  errorMessage: string;
  /**
   * The line number that the parsing error occurred on.
   */
  lineNumber: number;
  /**
   * The raw value of the line string.
   */
  rawValue: string;
  /**
   * The type of data this line contains.
   */
  type: LineType.Error;
}

export interface ReadingLine {
  /**
   * The date and time this reading was taken in YYYY-MM-DDTHH:mm format.
   */
  dateTime: string;
  /**
   * The sensor reading.
   */
  reading: number;
  /**
   * The type of data this line contains.
   */
  type: LineType.Reading;
}

export interface ReferenceLine {
  /**
   * Carbon monoxide in parts per million.
   */
  carbonMonoxide: number;
  /**
   * Relative humidity percentage.
   */
  relativeHumidity: number;
  /**
   * Temperature. Units unclear.
   */
  temperature: number;
  /**
   * The type of data this line contains.
   */
  type: LineType.Reference;
}

export interface SensorLine {
  /**
   * The name of this sensor.
   */
  name: string;
  /**
   * The type of sensor.
   */
  sensorType: SensorType;
  /**
   * The type of data this line contains.
   */
  type: LineType.Sensor;
}

export type Line = ErrorLine | ReadingLine | ReferenceLine | SensorLine;

export interface ProcessingError {
  /**
   * Human readable error message.
   */
  errorMessage: string;
  /**
   * The line entity that caused a processing error.
   */
  line: Line;
  /**
   * The line number that the processing error occurred on.
   */
  lineNumber: number;
  /**
   * The reference values associated with the error reading. Optional.
   */
  reference?: ReferenceLine;
  /**
   * The sensor associated with the error reading. Optional.
   */
  sensor?: SensorLine;
}

export interface SensorSummary {
  errors?: ProcessingError[];
  readings: number[];
  reference?: ReferenceLine;
  sensor?: SensorLine;
}

export interface ParsedFile {
  readonly errors?: ProcessingError[];
  readonly result: Record<string, string>;
}
