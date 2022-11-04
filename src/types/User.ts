import {Ingredient} from "./Ingredient"
import {Recipe} from "./Recipe"

export interface UserPreferences {
    measurements: string[],
    money: string
};

export interface UserCategories {
    ingredient: string[],
    recipe: string[] 
}

export interface UserVerify {
    email: {
        value: string,
        token: string,
        bool: boolean
    }
}

export interface UserRecents {
    ingredients: Ingredient[],
    recipes: Recipe[]
}

export interface UserSubscription {
    isSubscribed: boolean,
    subscribedSince: number,
    subscriptionType: 'personal' | 'personal-plus' | 'bussiness' | 'bussiness-plus' | 'none'
}

export class User {
    preferences: UserPreferences = {
        measurements: [],
        money: ''
    }
    categories: UserCategories = {
        ingredient: [],
        recipe: []
    }
    verify: UserVerify = {
        email: {
            value: '',
            token: '',
            bool: false
        }
    }
    recents: UserRecents = {
        ingredients: [],
        recipes: []
    }
    subscription: UserSubscription = {
        isSubscribed: false,
        subscribedSince: Date.now(),
        subscriptionType: 'none'
    }
    _id: string = ''
    name: string = ''
    avatar: string = ''
    email: string = ''
    changepass: string = ''
    date: string = ''
    __v: number = 0
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
    isAuthenticated: boolean | null,
    user: User | null
};
