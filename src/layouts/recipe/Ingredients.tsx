export {};
// import React from 'react'
// import Suggestions from './Suggestions';
 /*
|----------------------------------------------|
|-----------------Legacy Code------------------|
|------------Breaks App Don't Use--------------|
|------Check Comments In Recipe Component------|
|----------------For More Info-----------------|
|----------------------------------------------|
*/

// const Ingredients = ({ingData, onchange, suggs, _loading, onblur, showModal, ingredients, setStateChange, addIng, removeIng}) => {
//     return (
//         <>
//             <div className='new-recipe-ingredients'>
//                 {ingData.length > 0 && !_loading.bool && ingData.map((ing, i, arr) => {
//                     if (!suggs[i]) setStateChange({newState: [...suggs, []], type: 'setSuggs'});
//                     return (
//                         <div key={i} className='new-recipe-ingredient-item'>
//                             <input type='text' name='ing-name' value={ingData[i].name} onChange={e => onchange(e, i)} onBlur={e => onblur(i, ing.name)} placeholder='name'></input>
//                             <Suggestions {...{suggs, ingData, i, showModal, setStateChange}}/>
//                             <input type='text' name='ing-amount' value={ingData[i].quantity.amount} onChange={e => onchange(e, i)} placeholder='amount'></input>
//                             <input type='text' name='ing-unit' value={ingData[i].quantity.unit} onChange={e => onchange(e, i)} placeholder='unit'></input>
//                             <button type='button' className='edit-btn' onClick={e => {
//                                 const index = ingredients.map(ing => ing.name).indexOf(ingData[i].name);
//                                 if (index === -1) return;
//                                setStateChange({newState: {...showModal, IngredientM: {bool: true, id: ingredients[index]._id}}, type: 'setShowModal'});
//                             }}>Edit</button>
//                             <button className='remove-btn' type='button' onClick={e => removeIng(e, i)}>
//                                 <i className='fa-solid fa-x'></i>
//                             </button>
//                         </div>
//                     )
//                 })}
//             </div>
//             <button className='btn' type='button'onClick={e => addIng(e)}>Add Ingredient</button>
//         </>
//     )
// }

// export default Ingredients;