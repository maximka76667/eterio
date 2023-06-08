import { DrinkCreate } from '../../interfaces';
import UserUpdate from '../../interfaces/UserUpdate';

export default interface ContentProps {
  toggleSidebar: () => void;
  closeSidebar: () => void;
  isSidebarOpened: boolean;
  onToggleFavorite: (isFavorite: boolean, drinkId: string) => void;
  onUserUpdate: (newUser: UserUpdate) => Promise<void>;
  onOpenLoginPopup: () => void;
  onCreateDrink: (newDrink: DrinkCreate) => void;
  onDeleteDrink: (id: string) => void;
}
