import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { getIngredients, deleteIngredient } from '../actions/ingredient';
import { setAlert } from '../actions/alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Ingredients = ({showModal, setShowModal, getIngredients, deleteIngredient, _loading, user, Ingredients, setNavigate, setAlert}) => {
  const params = useParams();
  const [search, setSearch] = useState('');
  const [suggs, setSuggs] = useState({
    suggs: [],
    show: false
  });
  const [results, setResults] = useState([]);
  const [pageResults, setPageResults] = useState([]);
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
          setPageResults(Ingredients && Ingredients.filter(filterByPage));
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Ingredients, params]);

  const filterByPage = (rec, i) => {
    const lessthan = (24 * parseInt(params.page));
    const greterthan = (lessthan - 24)
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
  };

  const deleteIng = (ing) => {
    setShowModal({...showModal, YesorNo: {direct: deleteIngredient, bool: true, params: {id: ing, setShowModal, showModal}}})
  }
  const changePage = way => {
    if ((parseInt(params.page) * 24) <= Ingredients.length) return;
  } 
  return (
    <>
        {(!_loading.bool && pageResults) && 
          <>
            {pageResults !== [] &&
              <div className='ingredient-main'>
                <div className='ingredient-search'>
                  <div className='ingredient-search-box'>
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
                      <button type='submit' className='ingredient-search-i' onClick={(e) => initSearch(e)}>
                        <i className='fa-solid fa-magnifying-glass'></i>  
                      </button>
                      <button type='button' className='ingredient-search-x' onClick={() => setSearch('')}>
                        <i className='fa-solid fa-x'></i>  
                      </button>
                      <button type='button' className='ingredient-search-filter' onClick={() => {
                        setAlert('Filter Functionality Is Not Avalible Yet', 'error', setShowModal, showModal);
                        // setShowModal({...showModal, Filter: {typeOf: 'ingredient', bool: true, filter: null, type: null}})
                      }}>
                        <i className='fa-solid fa-filter'></i>
                      </button>
                    </form>
                  </div>
                  <div className='results'>
                    {pageResults.length > 0 && pageResults.map((res, i) => { 
                      console.log(res);
                      if (!res.calories) return <></>;
                      return (
                        <div key={i} className='ingredient-search-result'>
                          <div className='ingredient-result-name'>{res.name}</div>
                          <div className='ingredient-result-calories'>{res.calories.pref}</div>
                          <div className='ingredient-result-price'>{res.price}</div>
                          <div className='ingredient-result-edit'>
                            <button type="button" onClick={() => setShowModal({...showModal, IngredientM: {bool: true, id: res._id}})}>
                                <i className='fa-solid fa-edit'></i>
                            </button>  
                          </div>
                          <div className='ingredient-result-delete'>
                            <button type='button' onClick={() => deleteIng(res._id)}>
                              <i className='fa-solid fa-x'></i>  
                            </button>  
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {(parseInt(params.page) * 24) <= Ingredients.length &&
                    <div className='ingredient-next'>
                      <button type='button' onClick={() => setNavigate(`/ingredients/${(parseInt(params.page) + 1)}`)}>
                          <i className='fa-solid fa-arrow-right'></i>
                      </button>
                    </div>  
                  }   
                  {parseInt(params.page) > 1 &&
                    <div className='ingredient-previous'>
                      <button type='button' onClick={() => setNavigate(`/ingredients/${(parseInt(params.page) - 1)}`)}>
                          <i className='fa-solid fa-arrow-left'></i>
                      </button>
                    </div>  
                  }
                </div>  
                <div className='ingredient-recents'>
                  {/* <RecentRecs user={user} setShowModal={setShowModal} showModal={showModal}/> */}
                </div>  
              </div> 
            }
          </>
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
});

export default connect(mapStateToProps, {setAlert, getIngredients, deleteIngredient})(Ingredients);