import IngredientInterface from '../../interfaces/IngredientInterface';

export default interface GlassProps {
  ingredientList: IngredientInterface[];
  ingredientCount: number;
  extras: string[];
}
