import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { postIngredient, getIngredients } from '../../actions/ingredient';
import { loading, stopLoading } from '../../actions/loading';
import PropTypes from 'prop-types';

const IngredientM = ({showModal, setShowModal, postIngredient, getIngredients, loading, stopLoading}) => {
	const calories = useRef();
	const iron = useRef();
	const calcium = useRef();
	const sodium = useRef();
	const fiber = useRef();
	const sugars = useRef();
	const carbs = useRef();
	const fat = useRef();
	const protein = useRef();
	const data = {
		name: '',
		categories: '',
		price: '',
		volume: '',
		weight: '',
		prefered: '',
		noNut: false
	}
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
	const [formData, setFormData] = useState(data);

	const {
		name,
		categories,
		price,
		volume,
		weight,
		prefered,
		noNut
	} = formData;
	const onSubmit = async e => {
		e.preventDefault();
		let cats = categories.replace(/s/g, '').split(',');
		loading();
		let ingredients = await postIngredient({name, categories: cats, price, units: {volume, weight, prefered}}, noNut, false, setShowModal, showModal, true, true);
		if (!ingredients) {
			return stopLoading();
		}
		let ingredient;
		ingredients.forEach((ing) => ingredient = ing.name === name ? ing : ingredient);
		if (!ingredient) {
			return stopLoading();
		}
		stopLoading();
		const nutrient = ingredient.nutrients;
		const pref = ingredient.units.prefered
		calories.current.innerHTML = `Calories per ${pref}: ${ingredient.calories.pref}`;
		iron.current.innerHTML = `Iron per ${pref}: ${nutrient.iron.pref}${nutrient.iron.unit}`;
		sodium.current.innerHTML = `Sodium per ${pref}: ${nutrient.sodium.pref}${nutrient.sodium.unit}`;
		calcium.current.innerHTML = `Calcium per ${pref}: ${nutrient.calcium.pref}${nutrient.calcium.unit}`;
		fiber.current.innerHTML = `Fiber per ${pref}: ${nutrient.fiber.pref}${nutrient.fiber.unit}`;
		sugars.current.innerHTML = `Sugar per ${pref}: ${nutrient.sugars.pref}${nutrient.sugars.unit}`;
		carbs.current.innerHTML = `Carbs per ${pref}: ${nutrient.carbs.pref}${nutrient.carbs.unit}`;
		fat.current.innerHTML = `Fat per ${pref}: ${nutrient.fat.pref}${nutrient.fat.unit}`;
		protein.current.innerHTML = `Protein per ${pref}: ${nutrient.protein.pref}${nutrient.protein.unit}`;
	};
	const exit = e => {
		setFormData(data);
		setShowModal({...showModal, IngredientM: {bool: false}});
	}

	const onChange = e => setFormData({...formData, [e.target.name]: e.target.name === 'noNut' ? e.target.checked : e.target.value});
	return (
		<>
		{showModal.IngredientM.bool && (
            <AnimatePresence exitBeforeEnter onExitComplete={e => exit()}>
                <motion.div className='background'
                    variants={background}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    key='background'>
					<motion.div className='new-ingredient'
						variants={modal}
						initial='initial'
						animate='enter'
						exit='initial'
						>
						<button className='close-icon' onClick={e => exit(e)}>
							<i className='fa-solid fa-x'></i>
						</button>
						<div className='new-ingredient-h'><h1>New Ingredient <i className='fa-solid fa-carrot'></i></h1></div>
						<div className='new-ingredient-form'>
							<h2 style={{"paddingLeft": "40px"}}>Form</h2>
							<form onSubmit={e => onSubmit(e)}>
								<div className='new-ingredient-form-name'>
									<input className='new-ingredient-form-input' type='text' value={name} name='name' onChange={e => onChange(e)} placeholder='name'></input>
								</div>
								<div className='new-ingredient-form-categories'>
									<input className='new-ingredient-form-input' type='text' value={categories} name='categories' onChange={e => onChange(e)} placeholder='categories ex: Baking, Meat'></input>
								</div>
								<div className='new-ingredient-form-price'>
									<input className='new-ingredient-form-input' type='text' value={price} name='price' onChange={e => onChange(e)} placeholder='price'></input>
								</div>
								<div className='new-ingredient-form-volume'>
									<input className='new-ingredient-form-input' type='text' value={volume} name='volume' onChange={e => onChange(e)} placeholder='volume measurement'></input>
								</div>
								<div className='new-ingredient-form-weight'>
									<input className='new-ingredient-form-input' type='text' value={weight} name='weight' onChange={e => onChange(e)} placeholder='weight measurement'></input>
								</div>
								<div>
									<input className='new-ingredient-form-input' type='text' value={prefered} name='prefered' onChange={e => onChange(e)} placeholder='prefered measurement'></input>
								</div>
								<div className='new-ingredient-form-nonut'>
									<input className='new-ingredient-checkbox' type='checkbox' value={noNut} name='noNut' onChange={e => onChange(e)}></input>
									<span className='new-ingredient-p'>No Nutritional Data</span>
								</div>
								<button type='submit' className='new-ingredient-btn'>
									Submit <i className="fa-solid fa-arrow-up"></i>
								</button>
							</form>
						</div>
						<div className='new-ingredient-nutdata'>
							<h2 style={{"paddingLeft": "40px"}}>Nutritional Data</h2>
							<div ref={calories}>No Nutritional Data</div>
							<div ref={iron}>Create An Ingredient</div>
							<div ref={sodium}>In Order To Retrieve</div>
							<div ref={calcium}>Nutritional Data</div>
							<div ref={fiber}></div>
							<div ref={sugars}></div>
							<div ref={carbs}></div>
							<div ref={fat}></div>
							<div ref={protein}></div>
						</div>
						<button className='new-ingredient-btn reset-ingredient-btn' onClick={e => {
							exit();
							setShowModal({...showModal, IngredientM: {bool: true}});
						}}>
							Reset Form <i className="fa-solid fa-arrow-rotate-left"></i>
						</button>
					</motion.div>
                </motion.div>
			</AnimatePresence>
		)}
		</>
	)
}

IngredientM.propTypes = {
	postIngredient: PropTypes.func.isRequired,
	getIngredients: PropTypes.func.isRequired,
	loading: PropTypes.func.isRequired,
	stopLoading: PropTypes.func.isRequired
}

export default connect(null, {postIngredient, getIngredients, loading, stopLoading})(IngredientM)