import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { deleteRecipe } from '../../actions/recipe';
import { motion } from 'framer-motion';

const hover = {
    scale: 1.03
};

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
                        <div className={`recent-recs`} key={i}>
                            <div className={`recent-recs-name`}>{rec.name}</div>
                            <div className={`recent-recs-categories`}>Categories: {cats}</div>
                            <div className={`recent-recs-calories`}>Calories: {rec.calories}</div>
                            <div className={`recent-recs-yield`}>Yield: {rec.yield}</div>
                            <div className={`recent-recs-price`}>{rec.price}</div>
                            <div className={`recent-recs-edit`}>
                                <motion.button whileHover={hover} type="button" className='btn' onClick={() => setNavigate({...navigate, bool: true, id: rec.rec})}>
                                    <i className='fa-solid fa-edit'></i>  
                                </motion.button>
                            </div>
                            <div className={`recent-recs-delete`}>
                                <motion.button whileHover={hover} className='btn-red' onClick={() => setShowModal({...showModal, YesorNo: {direct: deleteRecipe, bool: true, params: {id: rec.rec, setShowModal, showModal}}})}>
                                    <i className='fa-solid fa-x'></i>    
                                </motion.button>
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