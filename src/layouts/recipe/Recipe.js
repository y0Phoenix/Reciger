/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState} from 'react';
import { connect } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router';
import { loading, stopLoading } from '../../actions/loading';
import { getRecipes, postRecipe } from '../../actions/recipe';
import PropTypes from 'prop-types';
import { getIngredients } from '../../actions/ingredient';
import Scale from './Scale';
import Nutrients from './Nutrients';
import Suggestions from './Suggestions';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

const hover = {
  scale: 1.07
};

const Recipe = ({ingredients, navigate, setNavigate, postRecipe, getRecipes, showModal, setShowModal, getIngredients, isAuthenticated, _loading, recipe}) => {
  const params = useParams();
  const location = useLocation();
  const initIng = {
    name: '', 
    quantity: {
      amount: '', 
      unit: '',
    },
    instructions: '',
    show: false
  }
  const [formData, setFormData] = useState({
    name: '',
    instructions: '',
    Yield: {
      number: 0,
      string: ''
    },
    categories: '',
    Correlative: false,
    Price: ''
  });
  const [ingData, setIngData] = useState([]);
  const [initAmounts, setInitAmounts] = useState({
    Recipe: 0,
    Ingredients: [],
    Price: ''
  });
  const [suggs, setSuggs] = useState([[]]);
  const [suggsIndex, setSuggsIndex] = useState({
    index: 0,
    where: 0,
    start: true,
    show: false
  });
  const [userClicked, setUserClicked] = useState(false);
  const [scale, setScale] = useState(1);
  const correlative = useRef(null);
  useEffect(() => {
    if (!ingData[0]) return;
    const arr = ingData.map(ing =>  {
      const i = initAmounts.Ingredients.map(amount => amount.name).indexOf(ing.name);
      ing.quantity.amount = initAmounts.Ingredients[i].amount * scale;
      return ing;
    });
    setIngData(arr);
    const setValue = {...Yield, number: initAmounts.Recipe * scale};
    let price = `$${(parseFloat(initAmounts.Price.split('$').join('')) * scale).toFixed(2)}`;
    setFormData({...formData, Yield: setValue, Price: price})
  }, [scale])
  useEffect(() => {
      if (params.id !== 'new') {
        getRecipes(true, params.id, true, setShowModal, showModal);
      }
      getIngredients(true, null, setShowModal, showModal, true);
  }, [location]);
  useEffect(() => {
    if (params.id !== 'new') {
      if (!recipe) return;
      if (recipe.constructor === Array) return;
      setFormData({...formData, name: recipe.name, instructions: recipe.instructions, 
        Yield: recipe.yield, categories: recipe.categories, 
        Correlative: recipe.type === 'ingredient', Price: recipe.price});
      const temp = {...initAmounts};
      temp.Recipe = recipe.yield.number;
      temp.Price = recipe.price;
      temp.Ingredients = recipe.ingredients.map(ing => ({amount: ing.quantity.amount, name: ing.name, 
        instructions: ing.instructions ? ing.instructions : ''}));
      const ings = recipe.ingredients.map(ing => ({name: ing.name, quantity: ing.quantity, show: false}));
      if (recipe.type === 'ingredient') correlative.current.checked = true;
      setInitAmounts(temp);
      setIngData(ings);
    }
  }, [recipe]);
  const {
    name,
    Yield,
    instructions,
    categories,
    Correlative,
    Price
  } = formData;
  const getSuggs = value => {
    value = value.split('');
    const arr = ingredients.filter(ing => {
      const name = ing.name.toLowerCase();
      let ret;
      value.forEach((char, i) => {
        char = char.toLowerCase();
        if (name[i] === char) {
          if (i > 0 && ret) {
            ret = ing;
          }
          else if (i === 0) {
            ret = ing;
          }
        }
        else {
          ret = null;
        }
      });
      return ret;
    });
    return arr;
  }

  const onchange = async (e, i) => {
    if (e.target.name === 'number' || e.target.name === 'string') {
      const setValue = {...Yield, number: e.target.name === 'number' ? e.target.value: Yield.number, string: e.target.name === 'string' ? e.target.value : Yield.string};
      return setFormData({...formData, Yield: setValue});
    }
    else if (e.target.name.includes('ing')) {
      let tempdata = [...ingData];
      if (e.target.name === 'ing-instructions') {
        tempdata[i].instructions = e.target.value;
      }
      if (e.target.name.includes('amount') || e.target.name.includes('unit')) tempdata[i].quantity[e.target.name.replace('ing-', '')] = e.target.value;
      else tempdata[i][e.target.name.replace('ing-', '')] = e.target.value;
      if (e.target.name.includes('name')) {
        tempdata[i].show = true;
        setSuggsIndex({...suggsIndex, show: true, index: i, where: 0, start: true});
        let currentsuggs = [...suggs];
        currentsuggs[i] = await getSuggs(e.target.value);
        setSuggs(currentsuggs);
      }
      return setIngData(tempdata);
    }
    else if (e.target.name === 'instructions') {
      return setFormData({...formData, instructions: e.target.value});
    }
    return setFormData({...formData, name: e.target.value});
  }

  const onsubmit = async e => {
    e.preventDefault();
    let update = false;
    if (location.pathname.replace(/\/recipe\//g, '') !== '') update = true
    const recipes = await postRecipe({formData, ingData, ingredients}, update, setShowModal, showModal);
    const id = recipes._id;
    setNavigate(`/recipe/${id}`);
  }

  const onblur = (i) => {
    setTimeout(() => {
      const tempdataing = [...ingData];
      const tempdatasuggs = [...suggs];
      tempdataing[i].show = false;
      tempdatasuggs[i] = [];
      setIngData(tempdataing);
      setSuggs(tempdatasuggs);
      setSuggsIndex({index: 0, show: false});
    }, 300)
  }

  const addIng = () => {
    setIngData([...ingData, initIng]);
  }
  const removeIng = (e, i) => {
    let temp = [...ingData];
    temp.splice(i, 1);
    setIngData(temp);
  };

  // incase updating state inside a child component breaks the app wrapping any rendered state change inside a useEffect is SUPPOSED to work 😭
  const setState = (newState, type) => {
      switch (type) {
        case 'setShowModal':
          return setShowModal(newState);
        case 'setSuggs':
          return setSuggs(newState);
        case 'setIngData':
          return setIngData(newState);
        default:
          console.log('incorrect type sent to setState function in Recipe');
      }
  }

  const printPage = () => {
    const pdf = new jsPDF();
    let ingredients = ``;
    let quantity = ``;
    let special = ``;
    ingData.forEach((ing, i) => {
      ingredients += `${ing.name}\n`;
      quantity += `${ing.quantity.amount} ${ing.quantity.unit}\n`;
      if (ing?.instructions) special += `${ing.instructions}\n`;
      else special += `\n`;
      if (i === ingData.length - 1) {
        ingredients += `\nInstructions\n\n\t${formData.instructions}`;
      }
    });
    const textOptions = {
      align: 'center'
    }
    pdf.text(`${formData.name}`, 105, 15, textOptions, 10);
    pdf.line(5, 25, 210, 25);
    pdf.line(5, 40, 210, 40);
    pdf.line(5, 25, 5, 265);
    pdf.line(210, 25, 210, 265);
    pdf.line(5, 265, 210, 265);
    pdf.text(`Yield: ${formData.Yield.number} ${formData.Yield.string}`, 25, 35, textOptions);
    pdf.text(`Yield: ${formData.Price} Serving: ${servingPrice()}`, 170, 35, textOptions);
    pdf.text(`Ingredient`, 30, 50, textOptions);
    pdf.text(`Amount`, 75, 50, textOptions);
    pdf.text(`Special Instructions`, 125, 50, textOptions);
    pdf.text(ingredients, 30, 60, textOptions);
    pdf.text(quantity, 75, 60, textOptions);
    pdf.text(special, 105, 60, textOptions);
    pdf.setFontSize(16);
    pdf.autoPrint();
    pdf.output('dataurlnewwindow', {
      filename: `${formData.name}`
    });
  }

  const servingPrice = () => {
    if (formData.Yield.number !== 1) {
      return `$${(parseFloat(Price.split('$').join('')) / formData.Yield.number).toFixed(2)}`;
    }
    return Price;
  }

  return (
    <>
    {isAuthenticated ?
    
      <div className='new-recipe-container'>
        <div className='new-recipe-form-container'>
          <div className='new-recipe-form'>
              <div className='new-recipe-name'>
                <small>Name</small>
                <br></br>
                <input type='text' value={name} name='name' onChange={e => onchange(e)} placeholder='name'></input>
                {params.id !== 'new' &&
                  <>
                    <small>Price</small>
                    <div>Yield: {Price}</div>
                    <div>Serving: {servingPrice()}</div>
                  </>
                }
              </div>
              <div className='new-recipe-yield'>
                <small>Yield</small>
                <br></br>
                <input type='number' value={Yield.number} id='number' name='number' onChange={e => onchange(e)} placeholder='amount'></input>
                <input id='yield-string' type='text' value={Yield.string} name='string' onChange={e => onchange(e)} placeholder='unit'></input>
                <motion.button whileHover={hover} className='btn' onClick={() => printPage()}>
                  Print <i className='fa-solid fa-print'></i>
                </motion.button>
                <Scale {...{params, setScale}}/>
              </div>
              <div className='new-recipe-nutrients'>
                <small>Nutrients</small>
                <br></br>
                <Nutrients {...{recipe, scale, setScale}}/>
              </div>
              {/* code doesn't work with having Ingredients as a child component. Keeps saying 
              (Cannot update a component (`Recipe`) while rendering a different component (`Ingredients`). To locate the bad setState() call inside `Ingredients`, 
              follow the stack trace as described in https://reactjs.org/link/setstate-in-render)*/}
              {/* <Ingredients {...{ingData, onchange, suggs, _loading, onblur, showModal, ingredients, setStateChange, addIng, removeIng}}/> */}
              <div className='new-recipe-ingredients'>
                <small>Ingredients</small>
                <br></br>
                  {ingData.length > 0 && !_loading.bool && ingData.map((ing, i, arr) => {
                      if (!suggs[i]) setSuggs([...suggs, []]);
                      return (
                          <div key={i} className='new-recipe-ingredient-item'>
                            <div className='new-recipe-ingredient-name-instruction'>
                              <input autoComplete='off' type='text' id='ing-name' name='ing-name' value={ingData[i].name} onChange={e => onchange(e, i)} onBlur={e => onblur(i, ing.name)} placeholder='name'></input>
                              <input autoComplete='off' type='text' id='ing-instructions' name='ing-instructions' value={ingData[i].instructions} onChange={e => onchange(e, i)} placeholder='instructions'></input>
                            </div>
                            <div className='new-recipe-ingredient-unit-amount'>
                              <input autoComplete='off' type='text' id='ing-amount' name='ing-amount' value={ingData[i].quantity.amount} onChange={e => onchange(e, i)} placeholder='amount'></input>
                              <input autoComplete='off' type='text' id='ing-unit' name='ing-unit' value={ingData[i].quantity.unit} onChange={e => onchange(e, i)} placeholder='unit'></input>
                            </div>
                            <div className='new-recipe-ingredient-buttons'>
                              <motion.button whileHover={hover} type='button' className='btn no-radius' onClick={e => {
                                  const index = ingredients.map(ing => ing.name).indexOf(ingData[i].name);
                                  if (index === -1) return;
                                setShowModal({...showModal, IngredientM: {bool: true, id: ingredients[index]._id}});
                              }}>Edit</motion.button>
                              <motion.button whileHover={hover} className='btn-red no-radius' type='button' onClick={e => removeIng(e, i)}>
                                  <i className='fa-solid fa-x'></i>
                              </motion.button>

                            </div>
                              <Suggestions {...{suggs, ingData, i, showModal, setState, suggsIndex, setSuggsIndex, userClicked, setUserClicked}}/>
                          </div>
                      )
                  })}
                  <div>
                    <motion.button style={{marginTop: '15px'}} whileHover={hover} className='btn' type='button'onClick={e => addIng(e)}>
                      Add Ingredient <i className='fa-solid fa-arrow-down'></i>
                    </motion.button>
                  </div>
              </div>
              <div className='new-recipe-categories'>
                <small>Categories</small>
                <br></br>
                <div className='new-recipe-categories-inputs'>
                  <input type='text' value={categories} name='categories' onChange={e => setFormData({...formData, categories: e.target.value})} placeholder='categories'></input>
                  <input type='checkbox' ref={correlative} value={Correlative} name='Correlative' onChange={e => setFormData({...formData, Correlative: e.target.checked})}></input>
                  Check If This Will Be Used In Other Recipes
                </div>
              </div>
              <div className='new-recipe-instructions'>
                <small>Instructions</small>
                <br></br>
                <textarea className='new-recipe-instructions' type='text' value={instructions} name='instructions' onChange={e => onchange(e)} rows="7" cols="60"></textarea>
              </div>
            </div>
          <div className='new-recipe-submit'>
            <motion.button whileHover={hover} type='submit'  className='btn' onClick={e => onsubmit(e)}>
              Submit Recipe <i className='fa-solid fa-arrow-up'></i>
            </motion.button>
          </div>
          <div>
            
          </div>
        </div>
      </div> : <Navigate to='/login' />
    }
    </>
  )
}

Recipe.propTypes = {
  ingredients: PropTypes.array.isRequired,
  loading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  postRecipe: PropTypes.func.isRequired,
  getIngredients: PropTypes.func.isRequired,
  _loading: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  ingredients: state.ingredient.ingredients,
  isAuthenticated: state.user.isAuthenticated,
  _loading: state.loading,
  recipe: state.recipe.recipes
})

export default connect(mapStateToProps, {loading, stopLoading, postRecipe, getIngredients, getRecipes})(Recipe);