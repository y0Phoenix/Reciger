import React from 'react';
import {v4 as uuid} from 'uuid';

const RecentIngs = ({user}) => 
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
        const one = uuid();
        return (
            <div className={`recent-ings${i}`} key={one}>
                <div className={`recent-ings${i}1`}>
                    <p className='recent-ings-name'>{ing.name}</p>
                    <p className='recent-ings-categories'>Categories: {cats}</p>
                    <p className='recent-ings-calories'>Calories: {ing.calories}</p>
                    <p className='recent-ings-price'>Price: {ing.price}</p>
                </div>
            </div>
        )
    }) :
    <h5 key='noing'>No Recent Ingredients</h5>

export default RecentIngs