/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { loading, stopLoading } from '../actions/loading';
import { getRecipes, postRecipe } from '../actions/recipe';
import PropTypes from 'prop-types';
import { getIngredients } from '../actions/ingredient';

const NewRecipe = ({ingredients, loading, stopLoading, postRecipe, getRecipes, showModal, setShowModal, getIngredients, isAuthenticated, _loading}) => {
  const location = useLocation();
  // useEffect(() => {
  //   const load = async () => {
  //     loading();
      
  //     stopLoading();
  //   }
  //   load();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  
  const initIng = {
    name: '', 
    quantity: {
      amount: '', 
      unit: '',
    },
    show: false
  }
  const [formData, setFormData] = useState({
    name: '',
    instructions: '',
    Yield: {
      number: 0,
      string: ''
    },
    categories: ''
  });
  const [ingData, setIngData] = useState([]);
  const [suggs, setSuggs] = useState([[]]);
  useEffect(() => {
    const id = location.pathname.replace(/\/recipe\//g, '');
    const load = async () => {
      if (id !== '/recipe') {
        loading();
        const recipe = await getRecipes(true, id, false, setShowModal, showModal);
        setFormData({...formData, name: recipe.name, instructions: recipe.instructions, Yield: recipe.yield, categories: recipe.categories});
        const ings = recipe.ingredients.map(ing => {
          return {name: ing.name, quantity: ing.quantity, show: false}
        });
        setIngData(ings);
        stopLoading();
      }
      await getIngredients(true, null, setShowModal, showModal, true);
    }
    load();
  }, []);
  const {
    name,
    Yield,
    instructions,
    categories
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
      if (e.target.name.includes('amount') || e.target.name.includes('unit')) tempdata[i].quantity[e.target.name.replace('ing-', '')] = e.target.value;
      else tempdata[i][e.target.name.replace('ing-', '')] = e.target.value;
      if (e.target.name.includes('name')) {
        tempdata[i].show = true;
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

  const onsubmit = e => {
    e.preventDefault();
    loading();
    let update = false;
    if (location.pathname.replace(/\/recipe\//g, '') !== '') update = true
    postRecipe({formData, ingData, ingredients}, update, setShowModal, showModal);
    stopLoading();
  }

  const onblur = (i) => {
    setTimeout(() => {
      const tempdataing = [...ingData];
      const tempdatasuggs = [...suggs];
      tempdataing[i].show = false;
      tempdatasuggs[i] = [];
      setIngData(tempdataing);
      setSuggs(tempdatasuggs);
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

  return (
    <>
    {isAuthenticated ?
    
      <div className='new-recipe-container'>
        <div className='new-recipe-form'>
          <form onSubmit={e => onsubmit(e)} autoComplete="off">
            <div className='new-recipe-name'>
              <input type='text' value={name} name='name' onChange={e => onchange(e)} placeholder='name'></input>
            </div>
            <div className='new-recipe-yield'>
              <input type='text' value={Yield.string} name='string' onChange={e => onchange(e)} placeholder='unit'></input>
              <input type='text' value={Yield.number} name='number' onChange={e => onchange(e)} placeholder='amount'></input>
            </div>
            <div className='new-reipce-ingredient'>
              {ingData.length > 0 && !_loading.bool && ingData.map((ing, i, arr) => {
                if (!suggs[i]) setSuggs([...suggs, []]);
                return (
                  <div key={i} className='new-recipe-ingredient-item'>
                    <input type='text' name='ing-name' value={ingData[i].name} onChange={e => onchange(e, i)} onBlur={e => onblur(i, ing.name)} placeholder='name'></input>
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
                <button className='btn' type='button'onClick={e => addIng(e)}>Add Ingredient</button>
            </div>
            <div className='new-recipe-categories'>
              <input type='text' value={categories} name='categories' onChange={e => setFormData({...formData, categories: e.target.value})} placeholder='categories'></input>
            </div>
            <div className='new-recipe-instructions'>
              <textarea type='text' value={instructions} name='instructions' onChange={e => onchange(e)} rows="7" cols="60"></textarea>
            </div>
            <div className='new-recipe-submit'>
              <input type='submit' value='Submit Recipe'></input>
            </div>
          </form>
        </div>
      </div> : <Navigate to='/login' />
    }
    </>
  )
}

NewRecipe.propTypes = {
  ingredients: PropTypes.array.isRequired,
  loading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  postRecipe: PropTypes.func.isRequired,
  getIngredients: PropTypes.func.isRequired,
  _loading: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  ingredients: state.ingredient.ingredients,
  isAuthenticated: state.user.isAuthenticated,
  _loading: state.loading
})

export default connect(mapStateToProps, {loading, stopLoading, postRecipe, getIngredients, getRecipes})(NewRecipe);