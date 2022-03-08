import React, { useEffect, useState } from 'react'

const Nutrients = ({recipe, scale, setScale}) => {
    const initNuts = {
        iron: {
            amount: 0,
            unit: ''
        },
        sodium: {
            amount: 0,
            unit: ''
        },
        calcium: {
            amount: 0,
            unit: ''
        },
        fiber: {
            amount: 0,
            unit: ''
        },
        sugars: {
            amount: 0,
            unit: ''
        },
        carbs: {
            amount: 0,
            unit: ''
        },
        fat: {
            amount: 0,
            unit: ''
        },
        protein: {
            amount: 0,
            unit: ''
        },
    }
    const [nutrients, setNutrients] = useState(initNuts);
    const [initAmounts, setInitAmounts] = useState(initNuts)
    const [calories, setCalories] = useState(0);
    const [initCalories, setInitCalories] = useState(0);
    useEffect(() => {
        setNutrients(recipe.nutrients.total);
        setInitAmounts(recipe.nutrients.total);
        setCalories(recipe.calories.total);
        setInitCalories(recipe.calories.total);
    }, [recipe]);
    useEffect(() => {
        setNutrients({...nutrients, 
            iron: {amount: initAmounts.iron.amount * scale},
            sodium: {amount: initAmounts.sodium.amount * scale},
            calcium: {amount: initAmounts.calcium.amount * scale},
            fiber: {amount: initAmounts.fiber.amount * scale},
            sugars: {amount: initAmounts.sugars.amount * scale},
            carbs: {amount: initAmounts.carbs.amount * scale},
            fat: {amount: initAmounts.fat.amount * scale},
            protein: {amount: initAmounts.protein.amount * scale},
        });
        setCalories(initCalories * scale);
    }, [scale]);

    return (
        <>
            {recipe.nutrients &&
                <>
                    <div className='recipe-calories'>Calories {calories}</div>
                    <div className='recipe-iron'>Iron {nutrients.iron.amount} {nutrients.iron.unit}</div>
                    <div className='recipe-sodium'>Sodium {nutrients.sodium.amount} {nutrients.sodium.unit}</div>
                    <div className='recipe-calcium'>Calcium {nutrients.calcium.amount} {nutrients.calcium.unit}</div>
                    <div className='recipe-fiber'>Fiber {nutrients.fiber.amount} {nutrients.fiber.unit}</div>
                    <div className='recipe-sugar'>Sugars {nutrients.sugars.amount} {nutrients.sugars.unit}</div>
                    <div className='recipe-carbs'>Carbs {nutrients.carbs.amount} {nutrients.carbs.unit}</div>
                    <div className='recipe-fat'>Fats {nutrients.fat.amount} {nutrients.fat.unit}</div>
                    <div className='recipe-protein'>Protein {nutrients.protein.amount} {nutrients.protein.unit}</div>
                </>
            }
        </>
    )
}

export default Nutrients