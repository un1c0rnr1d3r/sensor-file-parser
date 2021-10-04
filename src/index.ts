import invariant from 'tiny-invariant';
import { FileParser } from './file-parser';

export const evaluateLogFile = (logContentsStr: string) => {
  invariant(
    typeof logContentsStr === 'string',
    'logContentsStr must be a string'
  );
  const parser = new FileParser(logContentsStr);
  const parsedFile = parser.parse();
  if (parsedFile.errors) {
    for (const error of parsedFile.errors) {
      console.error(error);
    }
  }
  return parsedFile.result;
};
