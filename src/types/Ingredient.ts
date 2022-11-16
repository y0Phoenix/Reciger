import { CLEAR_INGREDIENTS, FILTER_INGREDIENTS, GET_INGREDIENT, GET_INGREDIENTS, GET_INGREDIENTS_FAIL, RESET_FILTER_INGREDIENTS } from "../actions/types";

export class Ingredient {
    _id: string = '';
    ing: string = '';
    user: string = '';
    name: string = '';
    price: string = '';
    type: 'recipe' | 'ingredient' = 'ingredient';
    categories: string[] = []
    img: string = ''
    calories: IngredientCalories = {
        g: 0,
        oz: 0,
        ml: 0,
        floz: 0,
        pref: 0
    }
    nutrients: IngredientNutrients = {
        protein: {
            unit: 'g',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        fat: {
            unit: 'g',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        carbs: {
            unit: 'g',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        sugars: {
            unit: 'g',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        fiber: {
            unit: 'g',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        calcium: {
            unit: 'mg',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        iron: {
            unit: 'mg',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        sodium: {
            unit: 'mg',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        }
    };
    quantity: IngredientQuantity = {
        unit: '',
        amount: '',
        type: 'weight'
    };
    lastEdit: number = Date.now();
    units: any = {
        prefered: 'g',
        volume: [''],
        weight: ['']
    }
};
export interface IngredientQuantity {
    unit: string,
    amount: string
    type: 'weight' | 'volume'
}


export class RecipeIngredient {
    _id: string = '';
    ing: string = '';
    user: string = '';
    name: string = '';
    price: string = '';
    categories: string[] = [];
    instructions: string = '';
    calories: IngredientCalories = {
        g: 0,
        oz: 0,
        ml: 0,
        floz: 0,
        pref: 0
    }
    nutrients: IngredientNutrients = {
        protein: {
            unit: 'g',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        fat: {
            unit: 'g',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        carbs: {
            unit: 'g',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        sugars: {
            unit: 'g',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        fiber: {
            unit: 'g',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        calcium: {
            unit: 'mg',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        iron: {
            unit: 'mg',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        },
        sodium: {
            unit: 'mg',
            g: 0,
            oz: 0,
            ml: 0,
            floz: 0,
            pref: 0
        }
    };
    quantity: IngredientQuantity = {
        unit: '',
        amount: '',
        type: 'weight'
    };
    units: any = {
        prefered: 'g',
        volume: [''],
        weight: ['']
    }
    constructor(id: string, ing?: Ingredient) {
        if (id === 'new' || !ing) this.ing = 'new';
        else {
            this.name = ing.name;
            this._id = ing._id;
            this.calories = ing.calories;
            this.categories = ing.categories;
            this.ing = ing.ing;
            this.nutrients = ing.nutrients;
            this.price = ing.price;
            this.units = ing.units;
            this.user = ing.user;
        }
    }
};

export interface GetIngredientsAction {
    type: typeof GET_INGREDIENTS,
    payload: Ingredient[]
};

export interface GetIngredientAction {
    type: typeof GET_INGREDIENT,
    payload: Ingredient
};

export interface FilterIngredientsAction {
    type: typeof FILTER_INGREDIENTS,
    payload: Ingredient[]
};

export interface ResetFilterIngredientsAction {
    type: typeof RESET_FILTER_INGREDIENTS
};

export interface GetIngredientsFailAction {
    type: typeof GET_INGREDIENTS_FAIL
};

export interface ClearIngredientsAction {
    type: typeof CLEAR_INGREDIENTS
};

export type IngredientAction = GetIngredientsAction | GetIngredientAction | FilterIngredientsAction | ResetFilterIngredientsAction | GetIngredientsFailAction | ClearIngredientsAction;

export interface IngredientState {
    ingredients: Ingredient[],
    filter: Ingredient[],
    filtered: boolean,
    error: {},
    loading: boolean
};

export interface IngredientCalories {
    g: number,
    oz: number,
    ml: number,
    floz: number,
    pref: number
}

export interface IngredientNutrients {
    protein: {
        unit: string,
        g: number,
        oz: number,
        ml: number,
        floz: number,
        pref: number
    },
    fat: {
        unit: string,
        g: number,
        oz: number,
        ml: number,
        floz: number,
        pref: number
    },
    carbs: {
        unit: string,
        g: number,
        oz: number,
        ml: number,
        floz: number,
        pref: number
    },
    sugars: {
        unit: string,
        g: number,
        oz: number,
        ml: number,
        floz: number,
        pref: number
    },
    fiber: {
        unit: string,
        g: number,
        oz: number,
        ml: number,
        floz: number,
        pref: number
    },
    calcium: {
        unit: string,
        g: number,
        oz: number,
        ml: number,
        floz: number,
        pref: number
    },
    iron: {
        unit: string,
        g: number,
        oz: number,
        ml: number,
        floz: number,
        pref: number
    },
    sodium: {
        unit: string,
        g: number,
        oz: number,
        ml: number,
        floz: number,
        pref: number
    }
};