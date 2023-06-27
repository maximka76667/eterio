import { ReactNode } from 'react';

export default interface NestedSidebarLinkProps {
  link: string;
  onListItemClick: () => void;
  children: ReactNode;
  extraClass: string;
  mainActiveClass: string;
  secondaryActiveClass: string;
}
