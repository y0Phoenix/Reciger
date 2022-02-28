import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { loading, stopLoading } from '../actions/loading';
import { postRecipe } from '../actions/recipe';
import PropTypes from 'prop-types';
import { getIngredients } from '../actions/ingredient';
import { Link } from 'react-router-dom';

const NewRecipe = ({ingredients, loading, stopLoading, postRecipe, showModal, setShowModal, getIngredients}) => {
  useEffect(() => {
    const load = async () => {
      loading();
      await getIngredients(true, null, setShowModal, showModal, true);
      stopLoading();
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const initIng = {
    ingName: '', 
    amount: '', 
    unit: '',
    show: false
  }
  const [formData, setFormData] = useState({
    name: '',
    instructions: '',
    Yield: {
      number: 0,
      string: ''
    }
  });
  const [ingData, setIngData] = useState([]);
  const [suggs, setSuggs] = useState([[]]);
  const {
    name,
    Yield,
    instructions
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
      tempdata[i][e.target.name.replace('ing-', '')] = e.target.value;
      if (e.target.name.includes('Name')) {
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
    postRecipe({formData, ingData, ingredients}, false, setShowModal, showModal);
    stopLoading();
  }

  const onblur = i => {
    setTimeout(() => {
      const tempdataing = [...ingData];
      const tempdatasuggs = [...suggs];
      tempdataing[i].show = false;
      tempdatasuggs[i] = [];
      setIngData(tempdataing);
      setSuggs(tempdatasuggs);
    }, 100)
  }

  const addIng = () => {
    setIngData([...ingData, initIng]);
    setSuggs([...suggs, []]);
  }
  const removeIng = (e, i) => {
    let temp = [...ingData];
    temp.splice(i, 1);
    setIngData(temp);
  };

  return (
    <>
      <div className='new-recipe-container'>
        <div className='new-recipe-form'>
          <form onSubmit={e => onsubmit(e)} autoComplete="off">
            <div className='new-recipe-name'>
              <input type='text' value={name} name='name' onChange={e => onchange(e)} placeholder='name'></input>
            </div>
            <div className='new-recipe-yield'>
              <input type='text' value={Yield.string} name='string' onChange={e => onchange(e)} placeholder='unit'></input>
              <input type='number' value={Yield.number} name='number' onChange={e => onchange(e)} placeholder='amount'></input>
            </div>
            <div className='new-reipce-ingredient'>
              {ingData.length > 0 ? ingData.map((ing, i, arr) => 
                <div key={i} className='new-recipe-ingredient-item'>
                  <input type='text' name='ing-ingName' value={ingData[i].ingName} onChange={e => onchange(e, i)} onBlur={e => onblur(i)} placeholder='name'></input>
                  {suggs[i].length > 0 ?
                    <>
                      <br></br>
                      <div className='suggs'>
                        <ul>
                          {suggs[i].map(sugg => 
                            <li key={sugg.name} onClick={e => {
                              const tempdataing = [...ingData];
                              const tempdatasuggs = [...suggs];
                              tempdataing[i].ingName = sugg.name;
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
                            setShowModal({...showModal, IngredientM: {bool: true}});
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
                  <input type='number' name='ing-amount' onChange={e => onchange(e, i)} placeholder='amount'></input>
                  <input type='text' name='ing-unit' onChange={e => onchange(e, i)} placeholder='unit'></input>
                  <button className='remove-btn' type='button' onClick={e => removeIng(e, i)}>
                    <i className='fa-solid fa-x'></i>
                  </button>
                </div>
                ) : addIng() }
                <button className='btn' type='button'onClick={e => addIng(e)}>Add Ingredient</button>
            </div>
            <div className='new-recipe-instructions'>
              <textarea type='text' value={instructions} name='instructions' onChange={e => onchange(e)} rows="7" cols="60"></textarea>
            </div>
            <div className='new-recipe-submit'>
              <input type='submit' value='Create New Recipe'></input>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

NewRecipe.propTypes = {
  ingredients: PropTypes.array.isRequired,
  loading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  postRecipe: PropTypes.func.isRequired,
  getIngredients: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  ingredients: state.ingredient.ingredients
})

export default connect(mapStateToProps, {loading, stopLoading, postRecipe, getIngredients})(NewRecipe);