import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getIngredients, deleteIngredient } from '../actions/ingredient';
import { setAlert } from '../actions/alert';
import { connect, ConnectedProps } from 'react-redux';
import PropTypes from 'prop-types';
import RecentIngs from './Dashboard/RecentIngs';
import { motion } from 'framer-motion';
import cycleSuggs, { Suggs, SuggsIndex } from '../functions/cycleSuggs';
import State from '../types/State';
import ShowModal from '../types/ShowModal';
import {Ingredient} from '../types/Ingredient';

const hover = {
  scale: 1.07
}

const mapStateToProps = (state: State) => ({
  Ingredients: state.ingredient.ingredients,
  _loading: state.loading,
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated
});

const connector = connect(mapStateToProps, {setAlert, getIngredients, deleteIngredient});

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
  showModal: ShowModal,
  setShowModal: React.Dispatch<React.SetStateAction<ShowModal>>,
  setNavigate: React.Dispatch<React.SetStateAction<string>>
}

const Ingredients: React.FC<Props> = ({showModal, setShowModal, getIngredients, deleteIngredient, _loading, user, Ingredients, setNavigate, setAlert, isAuthenticated}) => {
  const params = useParams();
  const [search, setSearch] = useState('');
  const [suggs, setSuggs] = useState<Suggs>({
    suggs: [],
    show: false
  });
  const [results, setResults] = useState<Ingredient[]>([]);
  const [pageResults, setPageResults] = useState<Ingredient[]>([]);
  const [suggsIndex, setSuggsIndex] = useState<SuggsIndex>({
    index: 0,
    where: 0,
    start: true,
    show: false
  });
  const [userClicked, setUserClicked] = useState(false);
  const [showXtra, setShowXtra] = useState({
    result: window.innerWidth <= 700 ? false : true,
    recents: window.innerWidth <= 535 ? false : true
  });
  window.onkeyup = (e) => cycleSuggs(e, suggsIndex, suggs.suggs, setUserClicked, setSuggsIndex);
  window.addEventListener('resize', () => {
    window.innerWidth <= 700 ? setShowXtra({...showXtra, result: false}) : !showXtra.result && setShowXtra({...showXtra, result: true});
    window.innerWidth <= 535 ? setShowXtra({...showXtra, recents: false}) : !showXtra.recents && setShowXtra({...showXtra, recents: true});
  });
  useEffect(() => {
      getIngredients(false, null, setShowModal, showModal, true);
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

  const filterByPage = (ing: Ingredient, i: number) => {
    const lessthan = (25 * parseInt(params.page!));
    const greterthan = (lessthan - 25);
    // if (greterthan === i) return null;
    return i < lessthan && i >= greterthan ? ing : null;
  }

  // eslint-disable-next-line no-unused-vars
  const filterResults = () => {
    const type = showModal.Filter.type;
    const filter = showModal.Filter.filter; 
    const arr = Ingredients.filter(ing => {
      let returnValue;
      const price = parseInt(ing.price.replace(/\$/g, ''));
      const calories = ing.calories.pref;
      const filter = parseInt(showModal.Filter.filter!);
      if (type === 'category') {
        const i = ing.categories.map(cat => cat).indexOf(showModal.Filter.filter!);
        returnValue = i < -1 ? ing : null;
      }
      else if (type === 'priceBelow') {
        const bool = price < filter;
        returnValue = bool ? ing : null
      }
      else if (type === 'priceAbove') {
        const bool = price > filter;
        returnValue = bool ? ing : null
      }
      else if (type === 'caloriesBelow') {
        const bool = calories < filter;
        returnValue = bool ? ing : null;
      }
      else if (type === 'caloriesAbove') {
        const bool = calories > filter;
        returnValue = bool ? ing : null;
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

  const getSuggs = (name: string) => {
    const Name = name.split('');
    return results.filter(res => {
      const resName = res.name.toLowerCase();
      let ret: string | null = null;
      Name.forEach((char, i) => {
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

  const onchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const suggs = await getSuggs(e.target.value);
    setSuggs({suggs: suggs, show: true});
    setSuggsIndex({...suggsIndex, show: true});
  };

  const deleteIng = (ing: string) => {
    setShowModal({...showModal, YesorNo: {direct: deleteIngredient, bool: true, params: {id: ing, setShowModal, showModal}}})
  }

  const onsubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
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
            {pageResults.length > 0 &&
              <div className='search-main'>
                <div className='search-head'>
                  <h1>{`${user?.name}s Ingredients`}</h1>
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
                              {suggs.suggs.map((sug: Ingredient, i: number) =>
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
                              {showXtra.result &&
                                <>
                                  <div className='result-calories'>kCal: {res.calories.pref}</div>
                                  <div className='result-price'>{res.price}</div>
                                </>
                              }
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
                      {parseInt(params.page!) > 1 &&
                        <div className='ingredient-previous'>
                          <motion.button whileHover={hover} className='btn no-radius' type='button' onClick={() => setNavigate(`/ingredients/${(parseInt(params.page!) - 1)}`)}>
                              Previous Page <i className='fa-solid fa-arrow-left'></i>
                          </motion.button>
                        </div>  
                      }
                      {(parseInt(params.page!) * 25) < Ingredients.length &&
                        <div className='ingredient-next'>
                          <motion.button whileHover={hover} className='btn no-radius' type='button' onClick={() => setNavigate(`/ingredients/${(parseInt(params.page!) + 1)}`)}>
                              Next page <i className='fa-solid fa-arrow-right'></i>
                          </motion.button>
                        </div>  
                      }   
                    </div>
                  </div>
                  {showXtra.recents && 
                    <div className='search-recents'>
                      <div className='recent-container'>
                        <h3>Recents</h3>
                        <RecentIngs user={user} setShowModal={setShowModal} showModal={showModal}/>
                      </div>
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

export default connector(Ingredients);