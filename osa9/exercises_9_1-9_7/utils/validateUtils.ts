export const getParsedNumber = (arg: string | number): number => {
  const parsedNumber = Number(arg);
  if (isNaN(parsedNumber)) {
    throw new Error('Argument is NaN');
  }
  return parsedNumber;
};

export const validateArgumentsLength = (
  args: string[],
  length: number,
): boolean => {
  if (!args) return false;
  if (args.length !== length) return false;

  return true;
};
