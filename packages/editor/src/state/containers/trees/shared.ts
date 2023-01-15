export function filterNotNull<T>(t: T | null): t is T {
  return t !== null;
}
