import {React, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getCategories, deleteCategory, postCategory} from '../../actions/category';
import { loading, stopLoading } from '../../actions/loading';

const Category = ({loading, stopLoading, showModal, setShowModal, getCategories, postCategory, deleteCategory, categories}) => {
  useEffect(() => {

  }, []);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
  });

  const {
    name,
    type
  } = formData;

  const onchange = e => setFormData({[e.target.name]: e.target.value});

  const onsubmit = () => {
    console.log('ppo');
  }

  return (
    <>
      {
        showModal.Category.bool && 
        <>
          <div>
            
          </div>
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
  categories: state.Category
});

export default connect(mapStateToProps, {loading, stopLoading, postCategory, deleteCategory, getCategories})(Category); 