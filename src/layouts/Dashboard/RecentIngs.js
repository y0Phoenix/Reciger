import React from 'react';
import { connect } from 'react-redux';
import { deleteIngredient } from '../../actions/ingredient';

const RecentIngs = ({user, showModal, setShowModal, deleteIngredient}) => 
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
                <button onClick={e => setShowModal({...showModal, IngredientM: {bool: true, id: ing.ing}})}>
                    <i className='fa-solid fa-edit'></i>    
                </button>
                <button onClick={() => setShowModal({...showModal, YesorNo: {direct: deleteIngredient, bool: true, params: {id: ing.ing, setShowModal, showModal}}})}>
                    <i className='fa-solid fa-x'></i>
                </button>
            </div>
        )
    }) :
    <h5 key='noing'>No Recent Ingredients</h5>

export default connect(null, {deleteIngredient})(RecentIngs)