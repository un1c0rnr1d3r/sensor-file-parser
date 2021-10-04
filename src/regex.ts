/**
 * A collection of regular expressions for parsing sensor file lines.
 * Date regex snippets courtesy of
 * https://stackoverflow.com/questions/5465375/javascript-date-regex-dd-mm-yyyy
 * Numeric value regex snippets courtesy of
 * https://stackoverflow.com/questions/2811031/decimal-or-numeric-values-in-regular-expression-validation/39399503
 */
export class Regex {
  private static readonly DateTime =
    '\\d{4}[\\/\\-](?:0?[1-9]|1[012])[\\/\\-](?:0?[1-9]|[12][0-9]|3[01])T(?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]';
  private static readonly Name = '[A-Za-z][A-Za-z0-9_-]*';
  private static readonly SignedFloat =
    '-?(?:0|[1-9]\\d*)?(?:\\.\\d+)?(?<=\\d)';
  private static readonly UnsignedFloat =
    '(?:0|[1-9]\\d*)?(?:\\.\\d+)?(?<=\\d)';
  static readonly Reading = new RegExp(
    `(${Regex.DateTime}) (${Regex.SignedFloat})`
  );
  static readonly Reference = new RegExp(
    `reference (${Regex.SignedFloat}) (${Regex.UnsignedFloat}) (${Regex.UnsignedFloat})`
  );
  static readonly Sensor = new RegExp(`(${Regex.Name}) (${Regex.Name})`);
}
