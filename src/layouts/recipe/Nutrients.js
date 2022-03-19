import React, { useEffect, useState } from 'react'

const Nutrients = ({recipe, scale}) => {
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
        if (!recipe?.nutrients) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scale]);

    return (
        <>
            {recipe.nutrients &&
                <>
                    <div className='nutrients-container'>
                        <p className='recipe-calories'>Calories {calories}</p>
                        <p className='recipe-iron'>Iron {nutrients.iron.amount} {nutrients.iron.unit}</p>
                        <p className='recipe-sodium'>Sodium {nutrients.sodium.amount} {nutrients.sodium.unit}</p>
                        <p className='recipe-calcium'>Calcium {nutrients.calcium.amount} {nutrients.calcium.unit}</p>
                        <p className='recipe-fiber'>Fiber {nutrients.fiber.amount} {nutrients.fiber.unit}</p>
                        <p className='recipe-sugar'>Sugars {nutrients.sugars.amount} {nutrients.sugars.unit}</p>
                        <p className='recipe-carbs'>Carbs {nutrients.carbs.amount} {nutrients.carbs.unit}</p>
                        <p className='recipe-fat'>Fats {nutrients.fat.amount} {nutrients.fat.unit}</p>
                        <p className='recipe-protein'>Protein {nutrients.protein.amount} {nutrients.protein.unit}</p>
                    </div>
                </>
            }
        </>
    )
}

export default Nutrients