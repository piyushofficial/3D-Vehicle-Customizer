export function dataHandler(val: number): number | string {
  if (val === null || val === undefined) {
    return '';
  } else {
    return val;
  }
}
