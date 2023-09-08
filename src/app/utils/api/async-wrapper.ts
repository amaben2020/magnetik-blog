//This makes our code DRY as we do not need to write too many try/catch all over the codebase

type AsyncFunc = (...args: any[]) => Promise<any>;

export const asyncWrapper = async (asyncFunc: AsyncFunc, ...args: any[]) => {
  console.log("ARGUMENTS", args);
  try {
    const data = await asyncFunc(args);
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
