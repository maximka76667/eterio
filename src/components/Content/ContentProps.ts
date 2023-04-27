export default interface ContentProps {
  toggleSidebar: () => void;
  closeSidebar: () => void;
  isSidebarOpened: boolean;
  onToggleFavorite: (isFavorite: boolean, drinkId: string) => void;
}
