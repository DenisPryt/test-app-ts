import { useState, useRef, useEffect, useMemo } from "react";

interface CalculateIndexParams {
  scrollOffset: number
  containerHeight: number;
  itemHeight: number;
  itemsCount: number;
  bufferSize: number;
}

const calculateEndIndex = ({scrollOffset, containerHeight, itemHeight, itemsCount, bufferSize}: CalculateIndexParams) => {
  return Math.min(itemsCount, Math.ceil((scrollOffset + containerHeight) / itemHeight) + bufferSize);
}

const calculateStartIndex = ({scrollOffset, itemHeight, bufferSize}: CalculateIndexParams) => {
  return Math.max(0, Math.floor(scrollOffset / itemHeight) - bufferSize);
}

interface UseLazyScrollParams {
  itemHeight: number;
  itemsCount: number;
  bufferSize?: number;
}

export const useLazyScroll = <ContainerType extends Element>({
  itemHeight,
  itemsCount,
  bufferSize = 2
}: UseLazyScrollParams) => {
  const containerRef = useRef<ContainerType>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateIndices = (scrollOffset: number, containerHeight: number) => {
      requestAnimationFrame(() => {
        const startIndex = calculateStartIndex({scrollOffset, containerHeight, itemHeight, itemsCount, bufferSize});
        const endIndex = calculateEndIndex({scrollOffset, containerHeight, itemHeight, itemsCount, bufferSize});
      
        setStartIndex(startIndex);
        setEndIndex(endIndex);
      });
    };

    const handleScroll = () => {
      updateIndices(container.scrollTop, container.getBoundingClientRect().height);
    };

    handleScroll(); // initialize indexes

    const resizeObserver = new ResizeObserver(([entry]) => {
      updateIndices(entry.target.scrollTop, entry.contentRect.height);
    });
    resizeObserverRef.current = resizeObserver;

    resizeObserver.observe(container);
    container.addEventListener("scroll", handleScroll);

    return () => {
      resizeObserver.unobserve(container);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return useMemo(() => ({containerRef, endIndex, startIndex}), [endIndex, startIndex]);
};
