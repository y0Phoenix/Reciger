import React, { Fragment, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import State from '../../types/State';
import { getIngredients, deleteIngredient } from '../../actions/ingredient';
import { setIngredientModal, setConfirmModal } from '../../actions/modal';
import { Link } from 'react-router-dom';
import moment from 'moment';
import isActivePage from '../../functions/isActivePage';
import { Button } from 'react-bootstrap';

const mapStateToProps = (state: State) => ({
    ingredient: state.ingredient
});

const connector = connect(mapStateToProps, {getIngredients, deleteIngredient, setIngredientModal, setConfirmModal});

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    activePage: number
};

const IngredientsList: React.FC<Props> = ({activePage, ingredient, getIngredients, deleteIngredient, setIngredientModal, setConfirmModal}) => {
    const {filtered} = ingredient;
    // useEffect for the initial render to retrieve ingredients from the DB
    useEffect(() => {
        if (ingredient.ingredients.length == 0) getIngredients(false);
    }, []);
    return (
        <>
            {ingredient[filtered ? 'filter' : 'ingredients'] ?
                (
                    // decides which prop to use ingredients or filter
                    // instead of having two seperate map functions just have one with a string difference
                    ingredient[filtered ? 'filter' : 'ingredients'].map((ing, i) => {
                        if (!isActivePage(activePage, i)) return null;
                        return (
                            <Fragment key={i}>
                                <div className='dashboard-list-container-ing white bg-dark padding-sm'>
                                    <div className='pointer' onClick={() => setIngredientModal({id: ing._id})}>{ing.name}</div>
                                    <div>{ing.price}</div>
                                    <div>{moment(ing.lastEdit).format('MMM, D, YYYY')}</div>
                                    <div className='Flex gap-sm'>
                                        <Button variant='primary' className='no-border bg-inner' onClick={() => setIngredientModal({id: ing._id})}>
                                            <i className='fa-solid fa-pen-to-square'></i>
                                        </Button>
                                        <Button variant='danger' className='no-border bg-inner' onClick={() => setConfirmModal({
                                            title: `Are You Sure You Want To Delete ${ing.name}`, 
                                            body: 'This Cannot Be Undone',
                                            callbacks: [deleteIngredient], 
                                            props: [[ing._id]], 
                                            show: true})}>
                                            <i className='fa-solid fa-trash-can'></i>
                                        </Button>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    })
                )
                :
                (
                    <div>You Have No Ingredients Yet</div>
                )
            }
        </>
    )
}

export default connector(IngredientsList);