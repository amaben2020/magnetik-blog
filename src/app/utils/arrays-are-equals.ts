export function arraysAreEqual(arr1: string[], arr2: string[]) {
  // early return
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    console.log(arr1[i]);
    console.log("arr2", arr2[i]);
    if (arr1[i] === arr2[i]) {
      return true;
    }
  }

  return false;
}
