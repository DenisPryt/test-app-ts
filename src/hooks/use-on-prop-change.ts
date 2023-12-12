import { useLayoutEffect, useRef } from "react";
import { useUpdatedRef } from "./use-updated-ref";

export const useOnPropChange = <T>(prop: T, onPropChange: (prevProp: T, newProp: T) => void) => {
  const prevPropRef = useRef<T>();
  const onPropChangeRef = useUpdatedRef(onPropChange);

  useLayoutEffect(() => {
    const prevProp = prevPropRef.current;

    if (prevProp !== undefined && prevProp !== prop) {
      onPropChangeRef.current(prevProp, prop);
    }

    prevPropRef.current = prop;
  }, [prop]);
};
