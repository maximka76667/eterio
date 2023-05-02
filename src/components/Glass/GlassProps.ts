import IngredientInterface from '../../interfaces/Ingredient';

export default interface GlassProps {
  ingredientList: IngredientInterface[];
  ingredientCount: number;
  extras: string[];
}
