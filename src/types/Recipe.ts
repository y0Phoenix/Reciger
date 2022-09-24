import { AxiosResponse } from "axios"
import { RecipeIngredient } from "./Ingredient"

export interface Recipe {
    calories: {
        total: string,
        g: string
    },
    _id: string,
    rec?: string,
    user: string,
    name: string,
    img: string,
    type: string,
    price: string,
    categories: string[],
    totalAmount: number,
    instructions: string,
    yield: {
        number: number,
        string: string
    },
    ingredients: RecipeIngredient[],
    nutrients: {
        g: RecipeNutrients,
        total: RecipeNutrients
    }
};

export interface RecipeNutrients {
    protein: {
        unit: string,
        amount: number
    },
    fat: {
        unit: string,
        amount: number
    },
    carbs: {
        unit: string,
        amount: number
    },
    sugars: {
        unit: string,
        amount: number
    },
    fiber: {
        unit: string,
        amount: number
    },
    calcium: {
        unit: string,
        amount: number
    },
    iron: {
        unit: string,
        amount: number
    },
    sodium: {
        unit: string,
        amount: number
    }
};

export interface RecipeAction {
    type: string,
    payload: Recipe[]
};

export interface RecipeState {
    recipes: Recipe[],
    error: {}
};