export interface Ingredient {
    _id: string,
    ing: string
    user: string,
    name: string,
    price: string,
    type: string,
    categories: string[],
    img: string,
    calories: Calories,
    nutrients: Nutrients,
    quantity: {
        unit: string,
        amount: number,
        type: string
    },
};


export interface RecipeIngredient {
    _id: string,
    ing: string,
    user: string,
    name: string,
    price: string,
    type: string,
    categories: string[],
    img: string,
    instructions: string,
    nutrients: Nutrients | null,
    calories: Calories | null,
    quantity: {
        unit: string,
        amount: number,
        type: string
    },
    show?: boolean
};

export interface IngredientAction {
    type: string,
    payload: {
        arr?: Ingredient[],
        obj?: Ingredient
    }
};

export interface IngredientState {
    ingredients: Ingredient[],
    error: {},
    loading: boolean
};

export interface Calories {
    g: number,
    oz: number,
    ml: number,
    floz: number,
    pref: number
}

export interface Nutrients {
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