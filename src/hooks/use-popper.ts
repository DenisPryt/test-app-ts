import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {createPopper, Instance, Placement} from '@popperjs/core';

export const usePopper = <AnchorElement extends Element, PopperElement extends HTMLElement>(placement: Placement) => {
  const popperRef = useRef<Instance>();
  const [anchorElement, setAnchorElement] = useState<AnchorElement | null>(null);
  const [tooltipElement, setTooltipElement] = useState<PopperElement | null>(null);

  const anchorRef = useCallback((node: AnchorElement) => {
    if (node) {
      setAnchorElement(node);
    }
  }, []);

  const tooltipRef = useCallback((node: PopperElement) => {
    if (node) {
      setTooltipElement(node);
    }
  }, []);

  useLayoutEffect(() => {
    if (!anchorElement || !tooltipElement) {
      return;
    }

    const popper = createPopper(anchorElement, tooltipElement, {placement, modifiers: [
      {
        name: 'preventOverflow',
        enabled: false,
      },
    ]});
    
    popperRef.current = popper;

    return () => {
      popper.destroy();
    };
  }, [anchorElement, tooltipElement]);

  return useMemo(() => ({anchorRef, tooltipRef}), [anchorRef, tooltipRef]);
};
