import React from 'react'
import Suggestions from './suggestions';

const Ingredients = ({ingData, setIngData, onchange, suggs, setSuggs, _loading, onblur, showModal, setShowModal, ingredients, removeIng, addIng}) => {
    console.log('protoTypes');
    return (
        <>
            <div className='new-recipe-ingredients'>
                {ingData.length > 0 && !_loading.bool && ingData.map((ing, i, arr) => {
                    if (!suggs[i]) setSuggs([...suggs, []]);
                    return (
                        <div key={i} className='new-recipe-ingredient-item'>
                        <input type='text' name='ing-name' value={ingData[i].name} onChange={e => onchange(e, i)} onBlur={e => onblur(i, ing.name)} placeholder='name'></input>
                        {/* <Suggestions {...{suggs, ingData, i, setIngData, setSuggs, setShowModal, showModal}}/> */}
                        {suggs[i]?.length > 0 ?
                            <>
                            <br></br>
                            <div className='suggs'>
                                <ul>
                                {suggs[i].map(sugg => 
                                    <li key={sugg.name} onClick={e => {
                                    const tempdataing = [...ingData];
                                    const tempdatasuggs = [...suggs];
                                    tempdataing[i].name = sugg.name;
                                    tempdataing[i].show = false;
                                    tempdatasuggs[i] = [];
                                    setIngData(tempdataing);
                                    setSuggs(tempdatasuggs);
                                    }}>{sugg.name}</li>)}
                                </ul>
                            </div>
                            </> :
                            <>
                            {ingData[i].show === true &&
                                <div className='suggs'>
                                <button type='button' onClick={e => {
                                    setShowModal({...showModal, IngredientM: {bool: true, id: showModal.IngredientM.id}});
                                    const tempdata = [...ingData];
                                    tempdata[i].show = false;
                                    setIngData(tempdata);
                                }}>
                                    Ingredient Doesn't Exist Want To Create It
                                </button>
                                <button onClick={e => {
                                    const tempdata = [...ingData];
                                    tempdata[i].show = false;
                                    setIngData(tempdata);
                                }}>
                                    <i className='fa-solid fa-x'></i>
                                </button>
                                </div>
                            } 
                            </>
                        }
                        <input type='text' name='ing-amount' value={ingData[i].quantity.amount} onChange={e => onchange(e, i)} placeholder='amount'></input>
                        <input type='text' name='ing-unit' value={ingData[i].quantity.unit} onChange={e => onchange(e, i)} placeholder='unit'></input>
                        <button type='button' className='edit-btn' onClick={e => {
                            const index = ingredients.map(ing => ing.name).indexOf(ingData[i].name);
                            if (index === -1) {
                            return
                            }
                            setShowModal({...showModal, IngredientM: {bool: true, id: ingredients[index]._id}});
                        }}>Edit</button>
                        <button className='remove-btn' type='button' onClick={e => removeIng(e, i)}>
                            <i className='fa-solid fa-x'></i>
                        </button>
                        </div>
                    )
                })}
            </div>
            <button className='btn' type='button'onClick={e => addIng(e)}>Add Ingredient</button>
        </>
    )
}

export default Ingredients;