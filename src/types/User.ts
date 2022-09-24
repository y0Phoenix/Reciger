import {Ingredient} from "./Ingredient"
import {Recipe} from "./Recipe"

export interface User {
    preferences: {
        measurements: string[],
        money: string
    },
    categories: {
        ingredient: string[],
        recipe: string[]
    },
    verify: {
        email: {
            value: string,
            token: string,
            bool: boolean
        }
    },
    recents: {
        ingredients: Ingredient[],
        recipes: Recipe[]
    },
    _id: string,
    name: string,
    avatar: string,
    email: string,
    changepass: string,
    date: string,
    __v: number
};

export interface UserAction {
    type: string,
    payload: UserActionPayload
};

export interface UserActionPayload {
    isAuthenticated: boolean,
    data: User,
    token: string
};

export interface UserState {
    token: string | null,
    isAuthenticated: boolean,
    user: User | null
};
