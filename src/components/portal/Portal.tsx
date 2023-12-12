import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

interface IPortalProps {
  container?: Element | DocumentFragment | null;
}

export const Portal = ({children, container}: PropsWithChildren<IPortalProps>) => {
  return ReactDOM.createPortal(
    children,
    container ? container : document.body);
};

