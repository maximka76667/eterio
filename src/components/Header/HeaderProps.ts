export default interface HeaderProps {
  closeSidebar: () => void;
  isSidebarOpened: boolean;
  openLoginPopup: () => void;
  openRegistrationPopup: () => void;
  handleLogout: () => void;
}
