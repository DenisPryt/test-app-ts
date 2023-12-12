import React, { ReactElement } from "react";
import styled, { StyledComponentPropsWithRef } from "styled-components";

import { List } from "../list";

import { useLazyScroll } from "../../hooks/use-lazy-scroll";

const ScrollableContainer = styled.section`
  overflow: auto;
`;

const VirtualRow = styled.li<{$height: number}>`
  height: ${props => props.$height}px;
  
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  display: grid;
`;

const StyledList = styled(List)<{$height: number}>`
  height: ${props => props.$height}px;

  position: relative;
  
  overflow: hidden;
`;

interface ILazyDrawList<Item> extends StyledComponentPropsWithRef<typeof List> {
  items: Item[];
  renderItem: (item: Item) => ReactElement;
  itemHeight?: number;
}

const LazyDrawListInner = <Item extends { id: React.Key }>({
	items,
	renderItem,
	itemHeight = 40,
	className,
	...otherProps
}: ILazyDrawList<Item>) => {
	const { containerRef, startIndex, endIndex } = useLazyScroll<HTMLUListElement>({
    itemHeight,
    itemsCount: items.length
  });

	return (
		<ScrollableContainer ref={containerRef} className={className}>
			<StyledList {...otherProps} $height={items.length * itemHeight}>
				{items.slice(startIndex, endIndex).map((item, index) => (
					<VirtualRow
						key={item.id}
						$height={itemHeight}
						style={{ transform: `translateY(${itemHeight * (startIndex + index)}px)` }}
					>
						{renderItem(item)}
					</VirtualRow>
				))}
			</StyledList>
		</ScrollableContainer>
	);
};

export const LazyDrawList = React.memo(LazyDrawListInner) as typeof LazyDrawListInner;
