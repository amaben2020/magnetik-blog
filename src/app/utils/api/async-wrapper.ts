//This makes our code DRY as we do not need to write too many try/catch all over the codebase

type AsyncFunc = (...args: any[]) => Promise<any>;

export const asyncWrapper = async (asyncFunc: AsyncFunc, ...args: any[]) => {
  // calls any asynchronous function inside try/catch block
  try {
    let data;
    if (args.length === 1) {
      data = await asyncFunc(args[0]);
    } else if (args.length > 1 && args.length === 2) {
      const [a, b] = args;

      data = await asyncFunc(a, b);
    } else if (args.length > 2 && args.length === 3) {
      const [a, b, c] = args;
      data = await asyncFunc(a, b, c);
    } else if (args.length > 3) {
      throw new Error("Too many arguments specified");
    } else {
      data = await asyncFunc();
    }
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
