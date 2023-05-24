export const manageDomNode = (
  className: string | string[],
  parentClass?: "focus" | "all"
) => {
  const selectAll = () =>
    document.querySelectorAll(
      Array.isArray(className)
        ? className.map((c) => `.${c}`).join(",")
        : parentClass
        ? `.${parentClass} .${className}`
        : `.${className}`
    );
  const addClassToAll = (addedClassName: string) => {
    selectAll().forEach((e) => e.classList.add(addedClassName));
  };
  const removeClasses = (classesToRemove: string[]) => {
    selectAll().forEach((e) =>
      classesToRemove.forEach((ctr) => e.classList.remove(ctr))
    );
  };
  const addClassByFn = (
    addedClassName: string,
    fn: (element: Element) => boolean
  ) => {
    selectAll().forEach((e) => {
      if (fn(e)) {
        e.classList.add(addedClassName);
      }
    });
  };
  const toggleClassByFn = (
    addedClassName: string,
    fn: (element: Element) => boolean
  ) => {
    selectAll().forEach((e) => {
      if (fn(e)) {
        e.classList.add(addedClassName);
      } else {
        e.classList.remove(addedClassName);
      }
    });
  };
  return {
    addClassToAll,
    removeClasses,
    addClassByFn,
    toggleClassByFn,
  };
};
