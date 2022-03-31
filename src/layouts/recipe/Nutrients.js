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
        const temp = {...recipe.nutrients.total};
        setNutrients(temp);
        setInitAmounts(recipe.nutrients.total);
        setCalories(recipe.calories.total);
        setInitCalories(recipe.calories.total);
    }, [recipe]);
    useEffect(() => {
        setNutrients({...nutrients, 
            iron: {amount: initAmounts.iron.amount * scale, unit: initAmounts.iron.unit},
            sodium: {amount: initAmounts.sodium.amount * scale, unit: initAmounts.sodium.unit},
            calcium: {amount: initAmounts.calcium.amount * scale, unit: initAmounts.calcium.unit},
            fiber: {amount: initAmounts.fiber.amount * scale , unit: initAmounts.fiber.unit},
            sugars: {amount: initAmounts.sugars.amount * scale , unit: initAmounts.sugars.unit},
            carbs: {amount: initAmounts.carbs.amount * scale , unit: initAmounts.carbs.unit},
            fat: {amount: initAmounts.fat.amount * scale , unit: initAmounts.fat.unit},
            protein: {amount: initAmounts.protein.amount * scale , unit: initAmounts.protein.unit},
        });
        setCalories(initCalories * scale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scale]);

    return (
        <>
            {recipe.nutrients &&
                <>
                    <div className='nutrients-container'>
                        <p>Calories {calories}</p>
                        <p>kCal</p>
                        <p>Iron {nutrients.iron.amount}</p>
                        <p>{nutrients.iron.unit}</p>
                        <p>Sodium {nutrients.sodium.amount}</p>
                        <p>{nutrients.sodium.unit}</p>
                        <p>Calcium {nutrients.calcium.amount}</p>
                        <p>{nutrients.calcium.unit}</p>
                        <p>Fiber {nutrients.fiber.amount}</p>
                        <p>{nutrients.fiber.unit}</p>
                        <p>Sugars {nutrients.sugars.amount}</p>
                        <p>{nutrients.sugars.unit}</p>
                        <p>Carbs {nutrients.carbs.amount}</p>
                        <p>{nutrients.carbs.unit}</p>
                        <p>Fats {nutrients.fat.amount}</p>
                        <p>{nutrients.fat.unit}</p>
                        <p>Protein {nutrients.protein.amount}</p>
                        <p>{nutrients.protein.unit}</p>
                    </div>
                </>
            }
        </>
    )
}

export default Nutrients