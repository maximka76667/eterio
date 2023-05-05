import UserUpdate from '../../interfaces/UserUpdate';

export default interface MainProps {
  isSidebarOpened: boolean;
  toggleSidebar: () => void;
  onUserUpdate: (newUser: UserUpdate) => Promise<void>;
  onListItemClick: () => void;
  onToggleFavorite: (isFavorite: boolean, drinkId: string) => void;
  onOpenLoginPopup: () => void;
}
