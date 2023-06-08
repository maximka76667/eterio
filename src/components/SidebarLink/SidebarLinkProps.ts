import { ReactNode } from 'react';

export default interface SidebarLinkProps {
  link: string;
  onListItemClick: () => void;
  children: ReactNode;
  extraClass: string;
}
