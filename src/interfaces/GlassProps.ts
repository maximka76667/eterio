import IngredientInterface from './IngredientInterface';

export default interface GlassProps {
  ingredientList: IngredientInterface[];
  ingredientCount: number;
  extras: string[];
}
