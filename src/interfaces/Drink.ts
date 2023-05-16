export default interface Drink {
  id: string;
  name: string;
  img: string;
  code: string;
  ingredients: {
    [key: string]: number;
  };
  extra: string[];
  description: string;
  is_community: boolean;
  author: string;
  favorites: string[];
  category: string;
}
