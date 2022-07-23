import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { deleteRecipe } from '../../actions/recipe';
import { motion } from 'framer-motion';

const hover = {
    scale: 1.03
};

const RecentRecs = ({user, setShowModal, showModal, deleteRecipe, search}) => {
    const [navigate, setNavigate] = useState({
        bool: false,
        id: ''
    });
    const [width, setWidth] = useState(window.innerWidth <= 1700 ? 250 : 450);
    window.addEventListener('resize', () => window.innerWidth <= 1700 ? setWidth(250) : width === 250 && setWidth(450));
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
                        <div className='recent-item-main recent-recs' style={{width: `${width}px`}} key={i}>
                            <div className={`recent-name recent-item`}>{rec.name}</div>
                            <div className={`recent-categories recent-item`}>Categories: {cats}</div>
                            <div className={`recent-calories recent-item`}>Calories: {rec.calories}</div>
                            <div className={`recent-yield recent-item`}>Yield: {rec.yield}</div>
                            <div className={`recent-price recent-item`}>{rec.price}</div>
                            <div className={`recent-edit`}>
                                <motion.button whileHover={hover} type="button" className='btn no-radius' onClick={() => setNavigate({...navigate, bool: true, id: rec.rec})}>
                                    <i className='fa-solid fa-edit'></i>  
                                </motion.button>
                            </div>
                            <div className={`recent-delete`}>
                                <motion.button whileHover={hover} className='btn-red no-radius' onClick={() => setShowModal({...showModal, YesorNo: {direct: deleteRecipe, bool: true, params: {id: rec.rec, setShowModal, showModal}}})}>
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