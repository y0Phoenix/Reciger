import { AxiosResponse } from "axios"
import { RecipeIngredient } from "./Ingredient"

export interface Calories {
    total: string,
    g: string
};

export interface Yield {
    number: number,
    string: string
};

export interface Nutrients {
    g: RecipeNutrients,
    total: RecipeNutrients
};

export class Recipe {
    calories: Calories =  {
        total: '',
        g: ''
    };
    _id: string = '';
    rec?: string = '';
    user: string = '';
    name: string = '';
    img: string = '';
    type: string = '';
    price: string = '';
    categories: string[] = [];
    totalAmount: number = 0;
    instructions: string = '';
    yield: Yield = {
        number: 0,
        string: ''
    };
    ingredients: RecipeIngredient[] = [];
    nutrients: Nutrients = {
        g: {
            protein: {
                unit: 'g',
                amount: 0
            },
            fat: {
                unit: 'g',
                amount: 0
            },
            carbs: {
                unit: 'g',
                amount: 0
            },
            sugars: {
                unit: 'g',
                amount: 0
            },
            fiber: {
                unit: 'g',
                amount: 0
            },
            calcium: {
                unit: 'mg',
                amount: 0
            },
            iron: {
                unit: 'mg',
                amount: 0
            },
            sodium: {
                unit: 'mg',
                amount: 0
            },
        },
        total: {
            protein: {
                unit: 'g',
                amount: 0
            },
            fat: {
                unit: 'g',
                amount: 0
            },
            carbs: {
                unit: 'g',
                amount: 0
            },
            sugars: {
                unit: 'g',
                amount: 0
            },
            fiber: {
                unit: 'g',
                amount: 0
            },
            calcium: {
                unit: 'mg',
                amount: 0
            },
            iron: {
                unit: 'mg',
                amount: 0
            },
            sodium: {
                unit: 'mg',
                amount: 0
            },
        }
    };
    lastEdit: number = Date.now();
    constructor(id?: string) {
        this._id = id ? id : 'new';
        if (this._id == 'new') {
            this.ingredients.push(new RecipeIngredient());
        }
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
    filter: Recipe[],
    filtered: boolean,
    error: {}
};