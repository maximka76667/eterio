import { ReactNode } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default PopupProps;
