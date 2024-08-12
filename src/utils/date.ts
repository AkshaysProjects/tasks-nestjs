import { isValid, parse } from 'date-fns';

// Custom Date Validator
export class IsDateFormatValid {
  validate(value: any): boolean {
    if (typeof value !== 'string') return false;

    const formats = ['dd-MM-yyyy', 'dd/MM/yyyy'];
    return formats.some((format) => {
      const parsedDate = parse(value, format, new Date());
      return (
        isValid(parsedDate) && parsedDate.toISOString().slice(0, 10) === value
      );
    });
  }

  defaultMessage(): string {
    return 'Date format should be DD-MM-YYYY or DD/MM/YYYY';
  }
}

// Custom Date Transformer
export const dateTransformer = (value: string): Date => {
  if (!value) throw new Error('No date provided');

  const formats = ['dd-MM-yyyy', 'dd/MM/yyyy'];
  for (const format of formats) {
    const parsedDate = parse(value, format, new Date());
    if (isValid(parsedDate)) {
      return parsedDate;
    }
  }

  throw new Error('Invalid date format');
};
