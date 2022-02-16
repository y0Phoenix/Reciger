import React from 'react';

const RecentIngs = ({user}) => 
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
            <div className={`recent-ings${i}`}>
                <div className={`recent-ings${i}1`}>
                    <p className='recent-ings-name'>{ing.name}</p>
                    <p className='recent-ings-categories'>Categories: {cats}</p>
                    <p className='recent-ings-calories'>Calories: {ing.calories}</p>
                    <p className='recent-ings-price'>Price: {ing.price}</p>
                </div>
            </div>
        )
    })

export default RecentIngs