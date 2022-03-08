import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getRecipes, deleteRecipe } from '../actions/recipe';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { setAlert } from '../actions/alert';

const Recipes = ({showModal, setShowModal, getRecipes, deleteRecipe, _loading, user, recipes, navigate, setNavigate, setAlert}) => {
  const params = useParams();
  const [search, setSearch] = useState('');
  const [suggs, setSuggs] = useState({
    suggs: [],
    show: false
  });
  const [results, setResults] = useState([]);
  const [pageResults, setPageResults] = useState([]);
  useEffect(() => {
      getRecipes(false, null, true, setShowModal, showModal);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   if (showModal.Filter.filter) {
  //     filterResults();
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [showModal.Filter]);
  useEffect(() => {
    if (recipes) {
      if (recipes.constructor === Array) {
        if (recipes[0]) {
          setResults(recipes);
          setPageResults(recipes && recipes.filter(filterByPage));
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

  const filterByPage = (rec, i) => {
    const lessthan = (25 * parseInt(params.page));
    const greterthan = (lessthan - 25)
    return i <= lessthan && i >= greterthan ? rec : null;
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
  };

  const deleteRec = (recipe) => {
    setShowModal({...showModal, YesorNo: {direct: deleteRecipe, bool: true, params: {id: recipe, setShowModal, showModal}}})
  }
  return (
        <>
        {(!_loading.bool && pageResults) && 
          <>
            {pageResults !== [] &&
              <div className='recipe-main'>
                <div className='recipe-search'>
                  <div className='recipe-search-box'>
                    <form>
                      <input type='text' value={search} name='search' onChange={e => onchange(e)} onBlur={() => setTimeout(setSuggs, 250, {suggs: [], show: false})} autoComplete="off"></input>
                      {suggs.suggs.length > 0 && suggs.show &&
                        <div className='suggs'>
                          <ul>
                            {suggs.suggs.map((sug, i) =>
                              <li key={i} onClick={() => {
                                setSearch(sug.name);
                                setSuggs({suggs: [], show: false})
                              }}>{sug.name}</li>
                            )}  
                          </ul>  
                        </div>
                      }
                      <button type='submit' className='recipe-search-i' onClick={(e) => initSearch(e)}>
                        <i className='fa-solid fa-magnifying-glass'></i>  
                      </button>
                      <button type='button' className='recipe-search-x' onClick={() => setSearch('')}>
                        <i className='fa-solid fa-x'></i>  
                      </button>
                      <button type='button' className='recipe-search-filter' onClick={() => {
                        setAlert('Filter Functionality Is Not Avalible Yet', 'error', setShowModal, showModal);
                        // setShowModal({...showModal, Filter: {typeOf: 'recipe', bool: true, filter: null, type: null}})
                      }}>
                        <i className='fa-solid fa-filter'></i>
                      </button>
                    </form>
                  </div>
                  <div className='results'>
                    {pageResults.length > 0 && pageResults.map((res, i) => 
                      <div key={i} className='recipe-search-result'>
                        <div className='recipe-result-number'>{i + 1}</div>
                        <div className='recipe-result-name'>{res.name}</div>
                        <div className='recipe-result-calories'>{res.calories}</div>
                        <div className='recipe-result-price'>{res.price}</div>
                        <div className='recipe-result-edit'>
                          <button type="button" onClick={() => setNavigate(`/recipe/${res._id}`)}>
                              <i className='fa-solid fa-edit'></i>
                          </button>  
                        </div>
                        <div className='recipe-result-delete'>
                          <button type='button' onClick={() => deleteRec(res._id)}>
                            <i className='fa-solid fa-x'></i>  
                          </button>  
                        </div>
                      </div>
                    )}
                  </div>  
                </div>  
                <div className='recipe-recents'>
                  {/* <RecentRecs user={user} setShowModal={setShowModal} showModal={showModal}/> */}
                </div>  
              </div> 
            }
          </>
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
};

const mapStateToProps = state => ({
  recipes: state.recipe.recipes,
  _loading: state.loading,
  user: state.user.user,
});

export default connect(mapStateToProps, {setAlert, getRecipes, deleteRecipe})(Recipes) ;