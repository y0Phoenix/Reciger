import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { postIngredient } from '../../actions/ingredient';

const IngredientM = ({showModal, setShowModal, postIngredient}) => {
	const background = {
		initial: {
		  opacity: 0
		}, 
		enter: {
		  opacity: 1
		}, 
		exit: {
		  opacity: 0
		}, 
	  };
	  const modal = {
		initial: {
		  y: "-100vh",
		  opacity: 0
		},
		enter: {
		  y: "200px",
		  opacity: 1,
		  transition: {
			delay: 0.5
		  }
		}
	  }
	const [formData, setFormData] = useState({
		name: '',
		categories: '',
		price: '',
		volume: '',
		weight: '',
		prefered: '',
		noNut: false
	});

	const {
		name,
		categories,
		price,
		volume,
		weight,
		prefered,
		noNut
	} = formData;
	const onSubmit = e => {
		e.preventDefault();
		postIngredient({name, categories, price, volume, weight, prefered}, noNut, false, setShowModal);
	};

	const onChange = e => setFormData({...formData, [e.target.name]: e.target.name === 'noNut' ? e.target.checked : e.target.value});
	return (
		<>
		{showModal.IngredientM && (
            <AnimatePresence exitBeforeEnter={true}>
                <motion.div className='background'
                    variants={background}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    key='background'>
                </motion.div>
				<motion.div className='new-ingredient'
					variants={modal}
					initial='initial'
					animate='enter'
					exit='initial'
					>
					<div className='new-ingredient-h'><h1>New Ingredient <i className='fa-solid fa-carrot'></i></h1></div>
					<div className='new-ingredient-form'>
						<form onSubmit={e => onSubmit(e)}>
							<div className='new-ingredient-form-name'>
								* Name: <input className='new-ingredient-form-input' type='text' value={name} name='name' onChange={e => onChange(e)}></input>
							</div>
							<div className='new-ingredient-form-categories'>
								Categories: <input type='text' value={categories} name='categories' onChange={e => onChange(e)}></input>
							</div>
							<div className='new-ingredient-form-price'>
								Price: <input type='text' value={price} name='price' onChange={e => onChange(e)}></input>
							</div>
							<div className='new-ingredient-form-volume'>
								<input type='text' value={volume} name='volume' onChange={e => onChange(e)}></input>
							</div>
							<div className='new-ingredient-form-weight'>
								<input type='text' value={weight} name='weight' onChange={e => onChange(e)}></input>
							</div>
							<div className='new-ingredient-form-pref'>
								<input type='text' value={prefered} name='prefered' onChange={e => onChange(e)}></input>
							</div>
							<div className='new-ingredient-form-nonut'>
								<input type='checkbox' value={noNut} name='noNut' onChange={e => onChange(e)}></input>
							</div>
							<input type='submit' value='submit New Ingredient'></input>
						</form>
					</div>
				</motion.div>
			</AnimatePresence>
		)}
		</>
	)
}

const mapStateToProps = state => ({
	ingredients: state.ingredient.ingredients
})

export default connect(mapStateToProps, {postIngredient})(IngredientM)