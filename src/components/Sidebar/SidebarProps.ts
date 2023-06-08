export default interface SidebarProps {
  isOpened: boolean;
  onListItemClick: () => void;
  onToggleFavorite: (isFavorite: boolean, drinkId: string) => void;
}
