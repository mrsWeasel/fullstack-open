// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getParsedNumber = (arg: any): number => {
  if (!arg) throw new Error('Argument is missing');

  const parsedNumber = Number(arg);
  if (Number.isNaN(parsedNumber)) {
    throw new Error(`Argument "${arg}" is not a number`);
  }
  return parsedNumber;
};

export const validateArgumentsLength = (args: string[], length: number): boolean => {
  if (!args) return false;
  if (args.length !== length) return false;

  return true;
};
