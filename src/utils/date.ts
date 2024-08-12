import { isValid, parse } from 'date-fns';

// Custom Date Transformer
export const dateTransformer = (value: string) => {
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
