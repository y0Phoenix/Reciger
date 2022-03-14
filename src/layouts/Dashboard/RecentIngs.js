import React from 'react';
import { connect } from 'react-redux';
import { deleteIngredient } from '../../actions/ingredient';
import { motion } from 'framer-motion';

const hover = {
    scale: 1.03
};

const RecentIngs = ({user, showModal, setShowModal, deleteIngredient}) => 
    user && user?.recents.ingredients.length > 0 ?
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
                <div className={`recent-ings-name${i}`}>{ing.name}</div>
                <div className={`recent-ings-categories${i}`}>Categories: {cats}</div>
                <div className={`recent-ings-calories${i}`}>Calories: {ing.calories}</div>
                <div className={`recent-ings-price${i}`}>Price: {ing.price}</div>
                <div className={`recent-ings-edit${i}`}>
                    <motion.button whileHover={hover} className='btn' onClick={e => setShowModal({...showModal, IngredientM: {bool: true, id: ing.ing}})}>
                        <i className='fa-solid fa-edit'></i>    
                    </motion.button>
                </div>
                <div className={`recent-ings-delete${i}`}>
                    <motion.button whileHover={hover} className='btn-red' onClick={() => setShowModal({...showModal, YesorNo: {direct: deleteIngredient, bool: true, params: {id: ing.ing, setShowModal, showModal}}})}>
                        <i className='fa-solid fa-x'></i>
                    </motion.button>
                </div>
            </div>
        )
    }) :
    <h5 key='noing'>No Recent Ingredients</h5>

export default connect(null, {deleteIngredient})(RecentIngs)