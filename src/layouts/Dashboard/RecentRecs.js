import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { deleteRecipe } from '../../actions/recipe';

const RecentRecs = ({user, setShowModal, showModal, deleteRecipe}) => {
    const [navigate, setNavigate] = useState({
        bool: false,
        id: ''
    });
    return (
        user && 
        <>
            {user.recents.recipes.length > 0 && !navigate.bool ?
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
                        <div className={`recent-recs${i}`} key={i}>
                            <div className={`recent-recs${i}1`} key={i + 10}>
                                <p className='recent-recs-name'>{rec.name}</p>
                                <p className='recent-recs-categories'>Categories: {cats}</p>
                                <p className='recent-recs-calories'>Calories: {rec.calories}</p>
                                <p className='recent-recs-yield'>Yield: {rec.yield}</p>
                                <p className='recent-recs-price'>{rec.price}</p>
                                <button type="button" onClick={() => setNavigate({...navigate, bool: true, id: rec.rec})}>
                                    <i className='fa-solid fa-edit'></i>  
                                </button>
                                <button onClick={() => setShowModal({...showModal, YesorNo: {direct: deleteRecipe, bool: true, params: {id: rec.rec, setShowModal, showModal}}})}>
                                    <i className='fa-solid fa-x'></i>    
                                </button>
                            </div>
                        </div>
                    )
                }) :
                <>
                    {navigate.bool ? <Navigate to={`/recipe/${navigate.id}`}/> : <h5 key='norec'>No Recent Recipes</h5>}
                </> 
            }
        </> 
    )
}

export default connect(null, {deleteRecipe})(RecentRecs);