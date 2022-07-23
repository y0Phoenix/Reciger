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
            iron: {amount: Number(initAmounts.iron.amount * scale).toFixed(0), unit: initAmounts.iron.unit},
            sodium: {amount: Number(initAmounts.sodium.amount * scale).toFixed(0), unit: initAmounts.sodium.unit},
            calcium: {amount: Number(initAmounts.calcium.amount * scale).toFixed(0), unit: initAmounts.calcium.unit},
            fiber: {amount: Number(initAmounts.fiber.amount * scale).toFixed(0) , unit: initAmounts.fiber.unit},
            sugars: {amount: Number(initAmounts.sugars.amount * scale).toFixed(0) , unit: initAmounts.sugars.unit},
            carbs: {amount: Number(initAmounts.carbs.amount * scale).toFixed(0) , unit: initAmounts.carbs.unit},
            fat: {amount: Number(initAmounts.fat.amount * scale).toFixed(0) , unit: initAmounts.fat.unit},
            protein: {amount: Number(initAmounts.protein.amount * scale).toFixed(0) , unit: initAmounts.protein.unit},
        });
        setCalories(Number(initCalories * scale).toFixed(0));
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