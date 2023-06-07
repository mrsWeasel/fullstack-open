type Operation = 'multiply' | 'add' | 'divide';

const validateArgumentsLength = (args: string[]): boolean => {
    if (!args) return false;
    if (args.length !== 5) return false;

    return true;
};

const parseNumber = (arg: string): number => {
    const parsedNumber = Number(arg);
    if (isNaN(parsedNumber)) {
        throw new Error('Argument is NaN');
    }
    return parsedNumber;
};

const parseOperation = (arg: string): Operation => {
    const parsedOperation = arg;
    switch (arg) {
        case 'multiply':
        case 'add':
        case 'divide':
            return arg;
        default:
            throw new Error('Argument is not valid operation');
    }
};

const calculator = (a: number, b: number, op: Operation): number => {
    switch (op) {
        case 'multiply':
            return a * b;
        case 'add':
            return a + b;
        case 'divide':
            if (b === 0) throw new Error('Cannot divide by 0');
            return a / b;
        default:
            throw new Error(`${op} is not a valid operation!`);
    }
};

try {
    if (!validateArgumentsLength(process.argv)) throw new Error('Wrong amount of arguments');
    const a: number = parseNumber(process.argv[2]);
    const b: number = parseNumber(process.argv[3]);
    const op: Operation = parseOperation(process.argv[4]);
    console.log(calculator(a, b, op));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
