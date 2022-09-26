import Drink from './DrinkInterface';

export default interface SidebarLinkProps {
  drink: Drink;
  onListItemClick: () => void;
}
