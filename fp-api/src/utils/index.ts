export function isEmpty(obj: object): boolean {
  return JSON.stringify(obj) === "{}"
}
