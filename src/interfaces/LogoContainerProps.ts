export default interface LogoContainerProps {
  isSidebarOpened: boolean;
  closeSidebar: () => void;
  children: JSX.Element[];
}
