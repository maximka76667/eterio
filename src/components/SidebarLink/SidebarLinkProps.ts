import Drink from '../../interfaces/DrinkInterface';

export default interface SidebarLinkProps {
  drink: Drink;
  onListItemClick: () => void;
  onToggleFavorite: (isFavorite: boolean, drinkId: string) => void;
}
