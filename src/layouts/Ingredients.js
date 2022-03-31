import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getIngredients, deleteIngredient } from '../actions/ingredient';
import { setAlert } from '../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecentIngs from './Dashboard/RecentIngs';
import { motion } from 'framer-motion';
import cycleSuggs from '../functions/cycleSuggs';

const hover = {
  scale: 1.07
}

const Ingredients = ({showModal, setShowModal, getIngredients, deleteIngredient, _loading, user, Ingredients, setNavigate, setAlert, isAuthenticated}) => {
  const params = useParams();
  const [search, setSearch] = useState('');
  const [suggs, setSuggs] = useState({
    suggs: [],
    show: false
  });
  const [results, setResults] = useState([]);
  const [pageResults, setPageResults] = useState([]);
  const [suggsIndex, setSuggsIndex] = useState({
    index: 0,
    where: 0,
    start: true,
    show: false
  });
  const [userClicked, setUserClicked] = useState(false);
  window.onkeyup = (e) => cycleSuggs(e, suggsIndex, suggs.suggs, setUserClicked, setSuggsIndex, false);
  useEffect(() => {
      getIngredients(false, null, true, setShowModal, showModal);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   if (showModal.Filter.filter) {
  //     filterResults();
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [showModal.Filter]);
  useEffect(() => {
    if (Ingredients) {
      if (Ingredients.constructor === Array) {
        if (Ingredients[0]) {
          if (!params.page) return;
          setResults(Ingredients);
          const arr = Ingredients && Ingredients.filter(filterByPage);
          setPageResults(Ingredients && arr);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Ingredients, params]);

  const filterByPage = (rec, i) => {
    const lessthan = (24 * parseInt(params.page));
    const greterthan = (lessthan - 24);
    if (greterthan === i) return null;
    return i <= lessthan && i >= greterthan ? rec : null;
  }

  // eslint-disable-next-line no-unused-vars
  const filterResults = () => {
    const type = showModal.Filter.type;
    const filter = showModal.Filter.filter; 
    const arr = Ingredients.filter(res => {
      let returnValue;
      const price = parseInt(res.price.replace(/\$/g, ''));
      const calories = res.calories;
      if (type === 'category') {
        const i = res.categories.map(cat => cat).indexOf(filter);
        returnValue = i < -1 ? res : null;
      }
      else if (type === 'priceBelow') {
        const bool = price < parseInt(showModal.Filter.filter);
        returnValue = bool ? res : null
      }
      else if (type === 'priceAbove') {
        const bool = price > parseInt(showModal.Filter.filter);
        returnValue = bool ? res : null
      }
      else if (type === 'caloriesBelow') {
        const bool = calories < showModal.Filter.filter;
        returnValue = bool ? res : null;
      }
      else if (type === 'caloriesAbove') {
        const bool = calories > showModal.Filter.filter;
        returnValue = bool ? res : null;
      }
      return returnValue;
    });
    setResults(arr);
    setPageResults(arr.filter(filterByPage))
  };

  const initSearch = (e) => {
    e.preventDefault();
    const regex = new RegExp(search, 'gi');
    const arr = results.filter(res => {
      const returnValue = regex.test(res.name.toLowerCase()) ? res : null
      return returnValue;
    });
    setPageResults(arr.filter(filterByPage));
  };

  const getSuggs = name => {
    name = name.split('');
    return results.filter(res => {
      const resName = res.name.toLowerCase();
      let ret;
      name.forEach((char, i) => {
        char = char.toLowerCase();
        if (resName[i] === char) {
          if (i > 0 && ret) {
            ret = res.name;
          }
          else if (i === 0) {
            ret = res.name;
          }
        }
        else {
          ret = null;
        }
      });
      return ret;
    });
  };

  const onchange = async e => {
    setSearch(e.target.value);
    const suggs = await getSuggs(e.target.value);
    setSuggs({suggs: suggs, show: true});
    setSuggsIndex({...suggsIndex, show: true});
  };

  const deleteIng = (ing) => {
    setShowModal({...showModal, YesorNo: {direct: deleteIngredient, bool: true, params: {id: ing, setShowModal, showModal}}})
  }

  const onsubmit = (e) => {
    e.preventDefault();
    if (suggs.show) return;
    initSearch(e);
  }

  return (
    <>
      {isAuthenticated ? 
    <>
        {(!_loading.bool && pageResults) && 
          <>
            {pageResults !== [] &&
              <div className='search-main'>
                <div className='search-head'>
                  <h1>{`${user.name}s Ingredients`}</h1>
                </div>
                <div className='search-create'>
                  <motion.button whileHover={hover} className='btn' type='button' onClick={() => setShowModal({...showModal, IngredientM: {bool: true, id: null}})}>
                   <i className='fa-solid fa-carrot'></i> Create Ingredient 
                  </motion.button>
                </div>
                <div className='search-rest'>
                  <div className='search-search'>
                    <div className='search-box'>
                      <form onSubmit={(e) => onsubmit(e)}>
                        <input type='text' value={search} id='search' name='search' onChange={e => onchange(e)} onBlur={() => setTimeout(() => {
                            setSuggs({suggs: [], show: false});
                            setSuggsIndex({show: false, start: true, where: 0, index: 0});
                          }, 250)} autoComplete="off" placeholder='search'></input>
                        {suggs.suggs.length > 0 && suggs.show &&
                          <div className='suggs'>
                              {suggs.suggs.map((sug, i) =>
                                <div id={`suggs${i}`} key={i} onClick={() => {
                                  if (userClicked) {
                                    setSearch(sug.name);
                                    setSuggs({suggs: [], show: false});
                                    setSuggsIndex({show: false, start: true, index: 0, where: 0});
                                  }
                                  else {
                                    setSearch(sug.name);
                                    setUserClicked(true);
                                  }
                                }}>
                                  <i className='fa-solid fa-magnifying-glass'></i>
                                  {sug.name}
                                  </div>
                              )}  
                          </div>
                        }
                        <motion.button whileHover={hover} type='submit' className='btn no-radius' onClick={(e) => onsubmit(e)}>
                          <i className='fa-solid fa-magnifying-glass'></i>  
                        </motion.button>
                        <motion.button whileHover={hover} type='button' className='btn-red no-radius' onClick={() => setSearch('')}>
                          <i className='fa-solid fa-x'></i>  
                        </motion.button>
                        <motion.button whileHover={hover} type='button' className='btn no-radius' onClick={() => {
                          setAlert('Filter Functionality Is Not Avalible Yet', 'error', setShowModal, showModal);
                          // setShowModal({...showModal, Filter: {typeOf: 'ingredient', bool: true, filter: null, type: null}})
                        }}>
                          <i className='fa-solid fa-filter'></i>
                        </motion.button>
                      </form>
                    </div>
                    <div className='results'>
                      {pageResults.length > 0 && pageResults.map((res, i) => {
                        if (!res.calories) return <></>;
                        return (
                          <div key={i} className='search-result'>
                            <div className='result' onClick={() => setShowModal({...showModal, IngredientM: {id: res._id, bool: true}})}>{res.name}</div>
                            <div className='result-rest'>
                              <div className='result-calories'>kCal: {res.calories.pref}</div>
                              <div className='result-price'>{res.price}</div>
                              <div className='result-buttons'>
                                <div className='result-edit'>
                                  <motion.button whileHover={hover} className='btn no-radius' type="button" onClick={() => setShowModal({...showModal, IngredientM: {bool: true, id: res._id}})}>
                                      <i className='fa-solid fa-edit'></i>
                                  </motion.button>  
                                </div>
                                <div className='result-delete'>
                                  <motion.button whileHover={hover} className='btn-red no-radius' type='button' onClick={() => deleteIng(res._id)}>
                                    <i className='fa-solid fa-x'></i>  
                                  </motion.button>  
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className='search-pagination'>
                      {parseInt(params.page) > 1 &&
                        <div className='ingredient-previous'>
                          <motion.button whileHover={hover} className='btn no-radius' type='button' onClick={() => setNavigate(`/ingredients/${(parseInt(params.page) - 1)}`)}>
                              Previous Page <i className='fa-solid fa-arrow-left'></i>
                          </motion.button>
                        </div>  
                      }
                      {(parseInt(params.page) * 24) <= Ingredients.length &&
                        <div className='ingredient-next'>
                          <motion.button whileHover={hover} className='btn no-radius' type='button' onClick={() => setNavigate(`/ingredients/${(parseInt(params.page) + 1)}`)}>
                              Next page <i className='fa-solid fa-arrow-right'></i>
                          </motion.button>
                        </div>  
                      }   
                    </div>
                  </div>  
                  <div className='search-recents'>
                    <RecentIngs user={user} setShowModal={setShowModal} showModal={showModal}/>
                  </div>  
                </div>
              </div> 
            }
          </>
        }
      </> : setNavigate('/login')
      }
    </>
  )
}

Ingredients.protoTypes = {
  Ingredients: PropTypes.array.isRequired,
  loading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  getRecipes: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  _loading: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  Ingredients: state.ingredient.ingredients,
  _loading: state.loading,
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, getIngredients, deleteIngredient})(Ingredients);