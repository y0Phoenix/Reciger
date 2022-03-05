import React from 'react';

const RecentIngs = ({user, showModal, setShowModal}) => 
    user.recents.ingredients.length > 0 ?
    user.recents.ingredients.map((ing, i, arr) => {
        i = i + 1;
        let cats = ``;
        ing.categories.forEach((cat, i, arr) => {
            if (i === arr.length -1) {
                cats += `${cat}`;
            }
            else {
                cats += `${cat}, `;
            }
        });
        return (
            <div className={`recent-ings${i}`} key={i}>
                <div className={`recent-ings${i}1`} key={i + 10}>
                    <p className='recent-ings-name'>{ing.name}</p>
                    <p className='recent-ings-categories'>Categories: {cats}</p>
                    <p className='recent-ings-calories'>Calories: {ing.calories}</p>
                    <p className='recent-ings-price'>Price: {ing.price}</p>
                </div>
                <button onClick={e => setShowModal({...showModal, IngredientM: {bool: true, id: ing.ing}})}>Edit</button>
            </div>
        )
    }) :
    <h5 key='noing'>No Recent Ingredients</h5>

export default RecentIngs