import {React, useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getCategories, deleteCategory, postCategory} from '../../actions/category';
import { loading, stopLoading } from '../../actions/loading';
import { setAlert } from '../../actions/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { background, modal } from './types';

const Category = ({loading, stopLoading, showModal, setShowModal, getCategories, postCategory, deleteCategory, categories, setAlert}) => {
  const nameRef = useRef(null);
  useEffect(() => {
    const load = async () => {
      loading();
      await getCategories(setShowModal, showModal);
      stopLoading();
    } 
    if (showModal.Category.bool) {
      load();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (showModal.Category.name && showModal.Category.type) {
      setFormData({...formData, name: showModal.Category.name, type: showModal.Category.type});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal.Category]);
  const [suggs, setSuggs] = useState({
    name: {
      show: false,
      suggs: []
    },
    type: {
      show: false,
      suggs: ['recipe', 'ingredient']
    }  
  });
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    delete: false
  });
  const [timer, setTimer] = useState(null);

  const {
    name,
    type
  } = formData;

  const checkType = (type) => {
    if (type.toLowerCase() !== 'recipe') {
      if (type.toLowerCase() !== 'ingredient') {
        return false;
      }
    }
    return true;
  }

  const onchange = e => {
    if (e.target.name === 'type') {
      setFormData({...formData, type: e.target.value});
      const bool = checkType(e.target.value);
      if (!bool) {
        if (timer) {
          clearTimeout(timer);
          setTimer(null);
        }
        setTimer(setTimeout(setAlert, 7500, 'Please Enter A Valid Category Type (Recipe or Ingredient)', 'error', setShowModal, showModal));
        return nameRef.current.disabled = true;
      }
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
      nameRef.current.disabled = false;
    }
    if (suggs[e.target.name].show) {

      setSuggs({...suggs, [e.target.name]: {...suggs[e.target.name], suggs: [...suggs[e.target.name].suggs, ]}})
    }
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onsubmit = async (e) => {
    e.preventDefault();
    if (formData.delete) {
      loading();
      await deleteCategory(formData, setShowModal, showModal);
      return stopLoading();
    }
    loading();
    await postCategory(formData, setShowModal, showModal);
    stopLoading();
  }

  const exit = () => {
		setFormData({name: '', type: '', delete: false});
		setShowModal({...showModal, Category: {bool: false, name: null, type: null}});
	}

  return (
    <>
      {
        showModal.Category.bool && 
        <>
        <AnimatePresence exitBeforeEnter onExitComplete={() => exit()}>
          <motion.div className='background'
            variants={background}
            initial="initial"
            animate="enter"
            exit="exit"
            key='background'
          >
            <motion.div className='category-modal'
              variants={modal}
              initial='initial'
              animate='enter'
              exit='initial'
            >
              <form onSubmit={e => onsubmit(e)} autoComplete='off'>
                <div className='category-modal'>
                  <h3 className='category-h3'>Category</h3>
                  <button onClick={() => exit()} type='button' className='category-x'>
                    <i className='fa-solid fa-x'></i>
                  </button>
                  <div className='category-name'>
                    <input type='text' name='name' value={name} onChange={e => onchange(e)} placeholder='name' ref={nameRef} disabled></input>
                  </div>
                  <div className='category-type'>
                    <input type='text' name='type' value={type} onChange={e => onchange(e)} placeholder='types'></input>
                  </div>
                  <div className='category-submit'>
                    <input type='submit' value='Add Category'></input>
                  </div>
                  <div className='category-delete'>
                    <button type='submit' onClick={() => setFormData({...formData, delete: true})}>Delete Category</button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        </>
      }
    </>
  )
}

Category.propTypes = {
  loading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  showModal: PropTypes.object.isRequired,
  setShowModal: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  postCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  categories: state.Category,
});

export default connect(mapStateToProps, {loading, stopLoading, postCategory, deleteCategory, getCategories, setAlert})(Category); 