import React, { Fragment } from 'react'

const RecentRecs = ({user}) => 
    user.recents.recipes.length > 0 ?
    user.recents.recipes.map((rec, i, arr) => {
        i = i + 1;
        let cats = ``;
        rec.categories.forEach((cat, i, arr) => {
            if (i === arr.length -1) {
                cats += `${cat}`;
            }
            else {
                cats += `${cat}, `;
            }
        });
        return (
            <Fragment>
            <div className={`recent-recs${i}`}>
                <div className={`recent-recs${i}1`}>
                    <p className='recent-recs-name'>{rec.name}</p>
                    <p className='recent-recs-categories'>Categories: {cats}</p>
                    <p className='recent-recs-calories'>Calories: {rec.calories}</p>
                    <p className='recent-recs-yield'>Yield: {rec.yield}</p>
                    <p className='recent-recs-price'>{rec.price}</p>
                </div>
            </div>
            </Fragment>
        )
    }) : 
    <h5>No Recent Recipes</h5>

export default RecentRecs;