import { Recipe } from "../types/Recipe";

export default function servingPrice(recipe: Recipe) {
    if (recipe.yield.number !== 1) {
      return `$${(parseFloat(recipe.price.split('$').join('')) / recipe.yield.number).toFixed(2)}`;
    }
    return recipe.price;
  };