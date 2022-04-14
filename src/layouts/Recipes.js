import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getRecipes, deleteRecipe } from '../actions/recipe';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import RecentRecs from './Dashboard/RecentRecs';
import { motion } from 'framer-motion';
import cycleSuggs from '../functions/cycleSuggs';

const hover = {
  scale: 1.07
};

const Recipes = ({showModal, setShowModal, getRecipes, deleteRecipe, _loading, user, recipes, navigate, setNavigate, setAlert, isAuthenticated}) => {
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
  const [showXtra, setShowXtra] = useState({
    result: window.innerWidth <= 700 ? false : true,
    recents: window.innerWidth <= 535 ? false : true
  });
  const [userClicked, setUserClicked] = useState(false);
  window.onkeyup = (e) => cycleSuggs(e, suggsIndex, suggs.suggs, setUserClicked, setSuggsIndex, false);
  useEffect(() => {
    const load = async () => {
      const Recipes = await getRecipes(false, null, true, setShowModal, showModal);
      if (!Recipes) return;
      setResults(Recipes);
      setPageResults(Recipes.filter(filterByPage));
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  window.addEventListener('resize', () => {
    window.innerWidth <= 700 ? setShowXtra({...showXtra, result: false}) : !showXtra.result && setShowXtra({...showXtra, result: true});
    window.innerWidth <= 535 ? setShowXtra({...showXtra, recents: false}) : !showXtra.recents && setShowXtra({...showXtra, recents: true});
  });
  // useEffect(() => {
  //   if (showModal.Filter.filter) {
  //     filterResults();
  //   }

  const filterByPage = (rec, i) => {
    const lessthan = (25 * parseInt(params.page));
    const greterthan = (lessthan - 25);
    return i < lessthan && i >= greterthan ? rec : null;
  }

  // eslint-disable-next-line no-unused-vars
  const filterResults = () => {
    const type = showModal.Filter.type;
    const filter = showModal.Filter.filter; 
    const arr = recipes.filter(res => {
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

  const initSearch = () => {
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

  const deleteRec = (recipe) => {
    setShowModal({...showModal, YesorNo: {direct: deleteRecipe, bool: true, params: {id: recipe, setShowModal, showModal}}})
  }

  const onsubmit = (e) => {
    e.preventDefault();
    if (suggs.show) return;
    initSearch();
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
                    <h1>{`${user.name}s Recipes`}</h1>
                  </div>
                  <div className='search-create'>
                    <motion.button whileHover={hover} className='btn' type='button' onClick={() => setNavigate('/recipe/new')}>
                     <i className='fa-solid fa-book'></i> Create Recipe 
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
                                  <div className='suggs-item' id={`suggs${i}`} key={i} onClick={() => {
                                    if (userClicked) {
                                      setSearch(sug.name);
                                      setSuggs({suggs: [], show: false});
                                      setSuggsIndex({index: 0, show: false, start: true, where: 0});
                                    }
                                    else {
                                      setSearch(sug.name)
                                      setUserClicked(true);
                                    }
                                  }}>
                                    <i className='fa-solid fa-magnifying-glass'></i>
                                    {sug.name}
                                  </div>
                                )}
                            </div>
                          }
                          <motion.button whileHover={hover} type='button' className='btn no-radius' onClick={(e) => onsubmit(e)}>
                            <i className='fa-solid fa-magnifying-glass'></i>  
                          </motion.button>
                          <motion.button whileHover={hover} type='button' className='btn-red no-radius' onClick={() => setSearch('')}>
                            <i className='fa-solid fa-x'></i>  
                          </motion.button>
                          <motion.button whileHover={hover} type='button' className='btn no-radius' onClick={() => {
                            setAlert('Filter Functionality Is Not Avalible Yet', 'error', setShowModal, showModal);
                            // setShowModal({...showModal, Filter: {typeOf: 'recipe', bool: true, filter: null, type: null}})
                          }}>
                            <i className='fa-solid fa-filter'></i>
                          </motion.button>
                        </form>
                      </div>
                      <div className='results'>
                        {pageResults.length > 0 && pageResults.map((res, i) => 
                          <div key={i} className='search-result'>
                            <div className='result' onClick={() => setNavigate(`/recipe/${res._id}`)}>{res.name}</div>
                            <div className='result-rest'>
                              {showXtra.result && 
                                <>
                                  <div className='result-calories'>kCal: {res.calories.total}</div>
                                  <div className='result-price'>{res.price}</div>
                                </>
                              }
                              <div className='result-buttons'>
                                <div className='result-edit'>
                                  <motion.button whileHover={hover} className='btn no-radius' type="button" onClick={() => setNavigate(`/recipe/${res._id}`)}>
                                      <i className='fa-solid fa-edit'></i>
                                  </motion.button>  
                                </div>
                                <div className='result-delete'>
                                  <motion.button whileHover={hover} className='btn-red no-radius' type='button' onClick={() => deleteRec(res._id)}>
                                    <i className='fa-solid fa-x'></i>  
                                  </motion.button>  
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div> 
                      <div className='search-pagination'>
                        {parseInt(params.page) > 1 &&
                          <div className='recipes-previous'>
                            <button type='button' onClick={() => setNavigate(`/recipes/${(parseInt(params.page) - 1)}`)}>
                                <i className='fa-solid fa-arrow-left'></i>
                            </button>
                          </div>  
                        } 
                        {(parseInt(params.page) * 25) < recipes.length &&
                          <div className='recipes-next'>
                            <button type='button' onClick={() => setNavigate(`/recipes/${(parseInt(params.page) + 1)}`)}>
                                <i className='fa-solid fa-arrow-right'></i>
                            </button>
                          </div>  
                        }   
                      </div>
                    </div>
                    {showXtra.recents &&
                      <div className='search-recents'>
                        <RecentRecs search={true} user={user} setShowModal={setShowModal} showModal={showModal}/>
                      </div>  
                    }
                  </div>
                </div> 
              }
            </>
          }
        </> : setNavigate('/login')
        }
      </>
  )
};

Recipes.protoTypes = {
  recipes: PropTypes.array.isRequired,
  loading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  getRecipes: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  _loading: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipe.recipes,
  _loading: state.loading,
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, {setAlert, getRecipes, deleteRecipe})(Recipes) ;