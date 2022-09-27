export default interface HeaderProps {
  closeSidebar: () => void;
  isSidebarOpened: boolean;
  signIn: (email: string) => Promise<void>;
}
