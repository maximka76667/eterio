export default interface IDrink {
  id: string;
  name: string;
  img: string;
  code: string;
  ingredients: {
    [key: string]: number;
  };
  extra: string[];
  description: string;
}
