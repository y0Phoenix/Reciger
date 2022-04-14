import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { postIngredient, getIngredients, updateIngredient } from '../../../actions/ingredient';
import { loading, stopLoading } from '../../../actions/loading';
import PropTypes from 'prop-types';
import { background, modal } from '../types';
import { setAlert } from '../../../actions/alert';
import axios from 'axios';
import { wrap } from 'popmotion';
import Form from './Form';

const pageVariants = {
	enter: (direction) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1
	},
	exit: (direction) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0
		}
	}
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};


const IngredientM = ({showModal, setShowModal, postIngredient, getIngredients, loading, stopLoading, updateIngredient, ingredients, setNavigate, setAlert}) => {
	const container = useRef(null);
	const data = {
		name: '',
		categories: '',
		price: '',
		volume: '',
		weight: '',
		prefered: '',
		noNut: false
	};
	const [nutData, setNutData] = useState({
		calories: '',
		iron: '',
		sodium: '',
		calcium: '',
		fiber: '',
		sugars: '',
		carbs: '',
		fat: '',
		protein: ''
	});
	const [formData, setFormData] = useState(data);
	const [[page, direction], setPage] = useState([0, 0]);
	const {
		name,
		categories,
		price,
		volume,
		weight,
		prefered,
		noNut
	} = formData;
	const pageIndex = wrap(0, 2, page);
	const paginate = (newDirection) => {
		setPage([page + newDirection, newDirection]);
	};
	useEffect(() => {
		if (showModal.IngredientM.id) {
			const load = async () => {
				const ing = await getIngredients(true, showModal.IngredientM.id, setShowModal, showModal, true);
				if (!ing) return;
				if (ing.type === 'recipe') {
					getRecipe(ing.name);
				}
				setFormData({
					name: ing.name,
					categories: ing.categories.join(' '),
					price: ing.price,
					volume: ing.units.volume.join(' '),
					weight: ing.units.weight.join(' '),
					prefered: ing.units.prefered,
					noNut: false
				});
				setNutrients(ing);
			}
			load();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showModal.IngredientM]);
	const getRecipe = async name => {
		try {
			const res = await axios.get(`/api/ingredient?all=true&recipe=true&name=${name}`);
			setNavigate(`/recipe/${res.data.data._id}`);
			setShowModal({...showModal, IngredientM: {bool: false, id: null}});
		} catch (error) {
			if (!error.response.data.msgs) {
				return setAlert('Error While Getting Ingredient', 'error', setShowModal, showModal);
			}
			error.response.data.msgs.forEach(msg => setAlert(msg, 'error', setShowModal, showModal));
		}
	}
	const onSubmit = async e => {
		e.preventDefault();
		let cats = categories.replace(/s/g, '').split(',');
		loading();

		let ingredients;
		if (showModal.IngredientM.id) {
			ingredients = await updateIngredient({name, categories: cats, price, units: {volume, weight, prefered}, }, showModal.IngredientM.id, true, !noNut, setShowModal, showModal)
		}
		else {
			ingredients = await postIngredient({name, categories: cats, price, units: {volume, weight, prefered}}, !noNut, setShowModal, showModal, true, true);
		}
		if (!ingredients) {
			return stopLoading();
		}
		let ingredient;
		ingredients.forEach((ing) => ingredient = ing.name === name ? ing : ingredient);
		if (!ingredient) {
			return stopLoading();
		}
		stopLoading();
		setNutrients(ingredient);
	};
	const exit = e => {
		setFormData(data);
		setShowModal({...showModal, IngredientM: {bool: false, id: null}});
	}
	const setNutrients = ing => {
		const nutrient = ing.nutrients;
		const pref = ing.units.prefered;
		// legacy code kept incase bugs arise
		// if (!calories.current) return;
		setNutData({
			calories: `Calories per ${pref}: ${ing.calories.pref}`,
			iron: `Iron per ${pref}: ${nutrient.iron.pref}${nutrient.iron.unit}`,
			sodium: `Sodium per ${pref}: ${nutrient.sodium.pref}${nutrient.sodium.unit}`,
			calcium: `Calcium per ${pref}: ${nutrient.calcium.pref}${nutrient.calcium.unit}`,
			fiber: `Fiber per ${pref}: ${nutrient.fiber.pref}${nutrient.fiber.unit}`,
			sugars: `Sugar per ${pref}: ${nutrient.sugars.pref}${nutrient.sugars.unit}`,
			carbs: `Carbs per ${pref}: ${nutrient.carbs.pref}${nutrient.carbs.unit}`,
			fat: `Fat per ${pref}: ${nutrient.fat.pref}${nutrient.fat.unit}`,
			protein: `Protein per ${pref}: ${nutrient.protein.pref}${nutrient.protein.unit}`
		});
	}

	const onChange = e => setFormData({...formData, [e.target.name]: e.target.name === 'noNut' ? e.target.checked : e.target.value});
	return (
		<>
		{showModal.IngredientM.bool && (
            <AnimatePresence custom={direction} exitBeforeEnter onExitComplete={e => exit()}>
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
						ref={container}
						>
						<motion.div className='new-ingredient'
							variants={pageVariants}
							custom={direction}
							initial='enter'
							animate='center'
							exit='exit'
							transition={{
								x: {type: 'spring', stiffness: 300, damping: 30},
								opacity: {duration: 0.2}
							}}
							drag='x'
							dragConstraints={container}
							dragElastic={1}
							onDragEnd={(e, { offset, velocity }) => {
								const swipe = swipePower(offset.x, velocity.x);
								if (swipe < -swipeConfidenceThreshold) {
								paginate(1);
								} else if (swipe > swipeConfidenceThreshold) {
								paginate(-1);
								}
							}}
							>
							<div className='new-ingredient-h'><h1>New Ingredient <i className='fa-solid fa-carrot'></i></h1></div>
							{pageIndex > 0 ? 
								<div className='new-ingredient-form nutdata'>
									<h2>Nutritional Data</h2>
									<div>{nutData.calories !== '' ? nutData.calories : 'No Nutritional Data'}</div>
									<div>{nutData.calories !== '' ? nutData.iron : 'Create An Ingredient'}</div>
									<div>{nutData.calories !== '' ? nutData.sodium : 'In Order To Retrieve'}</div>
									<div>{nutData.calories !== '' ? nutData.calcium : 'Nutritional Data'}</div>
									<div>{nutData.calories !== '' && nutData.fiber}</div>
									<div>{nutData.calories !== '' && nutData.sugars}</div>
									<div>{nutData.calories !== '' && nutData.carbs}</div>
									<div>{nutData.calories !== '' && nutData.fat}</div>
									<div>{nutData.calories !== '' && nutData.protein}</div>
								</div>
								:
								<Form {...{onSubmit, onChange, name, categories, price, noNut}} />
							}
						<div>
							<button className='close-icon' onClick={e => exit(e)}>
									<i className='fa-solid fa-x'></i>
							</button>
							<button className='new-ingredient-next-page'onClick={() => paginate(1)} >
								<i className='fa-solid fa-arrow-right fa-2xl'></i>
							</button>
							<button className='new-ingredient-prev-page' onClick={() => paginate(-1)}>
								<i className='fa-solid fa-arrow-left fa-2xl'></i>
							</button>
						</div>
						</motion.div>
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
	stopLoading: PropTypes.func.isRequired,
	ingredients: PropTypes.array.isRequired
}

const mapStateToProps = stats => ({
	ingredients: stats.ingredient.ingredients
})

export default connect(mapStateToProps, {postIngredient, getIngredients, loading, stopLoading, updateIngredient, setAlert})(IngredientM)