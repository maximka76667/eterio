export default interface Drink {
  _id: string,
  name: string,
  ingredients: {
    [key: string]: number
  },
  extra: string[],
  description: string
}