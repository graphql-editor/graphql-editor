export const useDomOperations = (className: string) => {
  const selectAll = () => document.querySelectorAll(`.${className}`);
  const addClassToAll = (addedClassName: string) => {
    selectAll().forEach((e) => e.classList.add(addedClassName));
  };
  const leaveWithBaseClass = (classesToRemove: string[]) => {
    selectAll().forEach((e) =>
      classesToRemove.forEach((ctr) => e.classList.remove(ctr)),
    );
  };
  const addClassByFn = (
    addedClassName: string,
    fn: (element: Element) => boolean,
  ) => {
    selectAll().forEach((e) => {
      if (fn(e)) {
        e.classList.add(addedClassName);
      }
    });
  };
  return {
    addClassToAll,
    leaveWithBaseClass,
    addClassByFn,
  };
};
