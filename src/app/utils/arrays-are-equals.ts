export const arraysAreEqual = (
  arr1 = [] as string[],
  arr2 = [] as string[],
) => {
  // we need to sort so that no matter the order, it works fine
  arr1.sort();
  arr2.sort();
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    const firstArray = arr1[i];
    const secondArray = arr2[i];
    if (firstArray === secondArray) {
      return true;
    }

    return false;
  }
};
