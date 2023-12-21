import { Recipe } from "../types/Recipe";

export type ValidRecipe = {
    isValid: boolean,
    msg: string
};

export function checkRecipe(recipe: Recipe): ValidRecipe {
    // check ingredients for NaN amount and invalid units
    for (let i = 0; i < recipe.ingredients.length; i++) {
        let ing = recipe.ingredients[i];
        let amount =  Number(ing.quantity.amount);
        if (Number.isNaN(amount)) {
            return {
                isValid: false,
                msg: `Invalid Ingredient Amount for ${ing.name}`
            }
        }
        ing.quantity.amount = amount;
        // if (ing.quantity.unit !==)
        // switch (ing.quantity.unit) {
        //     case 'kg':
        //     case 'oz':
        //     case 'lb':
        //     case 'tsp':
        //     case 'tbl':
        //     case 'floz':
        //     case 'cup':
        //     case 'quart':
        //     case 'gallon':
        //     case 'liter':
        //     case 'pinch':
        //     case ''
        //     default:
        //         break;
        // }
    }
    return {
        isValid: true,
        msg: ""
    }
}