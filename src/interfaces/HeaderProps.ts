export default interface HeaderProps {
  closeSidebar: () => void;
  isSidebarOpened: boolean;
  signIn: (email: string) => void;
  isLoggedIn: boolean;
  logout: () => void;
  isLoginProcessing: boolean;
}
