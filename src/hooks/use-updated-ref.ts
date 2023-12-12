import { MutableRefObject, useRef } from "react";

export const useUpdatedRef = <T>(data: T): MutableRefObject<T> => {
  const updatedRef = useRef<T>(data);
  updatedRef.current = data;

  return updatedRef;
};
