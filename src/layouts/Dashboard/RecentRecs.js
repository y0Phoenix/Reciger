import React, { Fragment, useState } from 'react';
import { Navigate } from 'react-router';
import {v4 as uuid} from 'uuid';

const RecentRecs = ({user}) => {
    const [navigate, setNavigate] = useState({
        bool: false,
        id: ''
    });
    return (
        user.recents.recipes.length > 0 && !navigate.bool ?
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
                <div className={`recent-recs${i}`} key={i}>
                    <div className={`recent-recs${i}1`} key={i + 10}>
                        <p className='recent-recs-name'>{rec.name}</p>
                        <p className='recent-recs-categories'>Categories: {cats}</p>
                        <p className='recent-recs-calories'>Calories: {rec.calories}</p>
                        <p className='recent-recs-yield'>Yield: {rec.yield}</p>
                        <p className='recent-recs-price'>{rec.price}</p>
                    </div>
                    <button onClick={() => setNavigate({...navigate, bool: true, id: rec.rec})}>Edit</button>
                </div>
                </Fragment>
            )
        }) :
        <>
            {navigate.bool ? <Navigate to={`/recipe/${navigate.id}`}/> : <h5 key='norec'>No Recent Recipes</h5>}
        </> 
    )
}

export default RecentRecs;