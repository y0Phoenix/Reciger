import React from 'react';
import { motion } from 'framer-motion';

interface Props {
    onSubmit: Function,
    onChange: Function,
    name: string,
    categories: string,
    price: string,
    noNut: boolean,
    hover: any
};

const Form: React.FC<Props> = ({onSubmit, onChange, name, categories, price, noNut, hover}) => {
    return (
        <form className='new-ingredient-form' onSubmit={e => onSubmit(e)} autoComplete='off'>
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
                <input className='new-ingredient-checkbox' type='checkbox' checked={noNut} name='noNut' onChange={e => onChange(e)}></input>
                <span className='new-ingredient-p'>Opt In To Nutritional Data</span>
            </div>
            <motion.button whileHover={hover} type='submit' className='new-ingredient-btn'>
                Submit <i className="fa-solid fa-arrow-up"></i>
            </motion.button>
        </form>
    )
}

export default Form