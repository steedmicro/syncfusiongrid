export function getIndexOfChildElement(childElement: any) {
  let index = 0;
  childElement?.parentElement?.childNodes.forEach(
    (element: any, key: number) => {
      if (element === childElement) {
        index = key;
      }
    }
  );
  return index - 1;
}
