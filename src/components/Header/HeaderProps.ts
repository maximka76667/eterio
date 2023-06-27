export default interface HeaderProps {
  onLogoClick: () => void;
  isSidebarOpened: boolean;
  openLoginPopup: () => void;
  openRegistrationPopup: () => void;
  handleLogout: () => void;
}
