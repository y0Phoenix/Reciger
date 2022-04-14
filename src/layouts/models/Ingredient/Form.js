import React from 'react'

const Form = ({onSubmit, onChange, name, categories, price, noNut}) => {
    return (
        <div>
            <form onSubmit={e => onSubmit(e)} autoComplete='off'>
                <div className='new-ingredient-form-name'>
                    <input className='new-ingredient-form-input' type='text' value={name} name='name' onChange={e => onChange(e)} placeholder='name'></input>
                </div>
                <div className='new-ingredient-form-categories'>
                    <input className='new-ingredient-form-input' type='text' value={categories} name='categories' onChange={e => onChange(e)} placeholder='categories ex: Baking, Meat'></input>
                </div>
                <div className='new-ingredient-form-price'>
                    <input className='new-ingredient-form-input' type='text' value={price} name='price' onChange={e => onChange(e)} placeholder='price'></input>
                </div>
                {/* not intuitive */}
                {/* <input type='checkbox' value={showPrefs} onChange={e => setShowPrefs(e.target.checked)} className='new-ingredient-checkbox'></input>
                <span className='new-ingredient-p'>Set Prefered Weight and Volume Specifically<br></br>
                (defaults to standard oz, floz)</span>
                {showPrefs &&
                    <>
                        <div className='new-ingredient-form-volume'>
                            <input className='new-ingredient-form-input' type='text' value={volume} name='volume' onChange={e => onChange(e)} placeholder='volume measurement'></input>
                        </div>
                        <div className='new-ingredient-form-weight'>
                            <input className='new-ingredient-form-input' type='text' value={weight} name='weight' onChange={e => onChange(e)} placeholder='weight measurement'></input>
                        </div>
                    </>
                }
                <br></br>
                <br></br> */}
                <div className='new-ingredient-form-nonut'>
                    <input className='new-ingredient-checkbox' type='checkbox' value={noNut} name='noNut' onChange={e => onChange(e)}></input>
                    <span className='new-ingredient-p'>Opt In To Nutritional Data</span>
                </div>
                <button type='submit' className='new-ingredient-btn'>
                    Submit <i className="fa-solid fa-arrow-up"></i>
                </button>
            </form>
        </div>
    )
}

export default Form