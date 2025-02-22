import { Recipe } from "../types/Recipe";

export default function servingPrice(recipe: Recipe) {
    if (recipe.Yield.number !== 1) {
      return `$${(parseFloat(recipe.price.split('$').join('')) / recipe.Yield.number).toFixed(2)}`;
    }
    return recipe.price;
  };