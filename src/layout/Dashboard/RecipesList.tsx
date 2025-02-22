import React, {Fragment, useEffect, useState} from 'react'
import { connect, ConnectedProps } from 'react-redux';
import State from '../../types/State';
import { deleteRecipe, getRecipes } from '../../actions/recipe';
import { setConfirmModal } from '../../actions/modal';
import { Link, useNavigate } from 'react-router-dom';
import { link, linkDark } from '../../types/Style';
import moment from 'moment';
import isActivePage from '../../functions/isActivePage';
import { Button } from 'react-bootstrap';
import nameFromWidth from '../../functions/nameFromWidth';

const mapStateToProps = (state: State) => ({
    recipe: state.recipe
});

const connector = connect(mapStateToProps, {deleteRecipe, getRecipes, setConfirmModal});

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    activePage: number
};

const RecipesList: React.FC<Props> = ({activePage, recipe, deleteRecipe, getRecipes, setConfirmModal}) => {
    // state for the window width
    const [width, setWidth] = useState(window.innerWidth);
    const {filtered} = recipe;
    // decides which prop to use recipes or filter
    // instead of having two seperate map functions just have one with a string difference
    const type = filtered ? 'filter' : 'recipes';
    // useEffect for the initial render to retrieve recipes from the DB
    useEffect(() => {
        if (recipe.recipes.length == 0) getRecipes(false);
    }, []);
    window.addEventListener('resize', (e) => {
        if (e.type !== 'resize' || !e.target) return;
        if (e.target instanceof Window) {
            if (e.target.innerWidth !== width) setWidth(e.target.innerWidth);
        }
    });
    return (
        <>
            {recipe[type].length > 0 ?
                (
                    recipe[type].map((rec, i) => {
                        if (!isActivePage(activePage, i)) return null;
                        return (
                            <Fragment key={i}>
                                <div className='dashboard-list-container bg-dark white padding-sm'>
                                    <Link to={`/recipe/${rec._id}`} style={link}>{nameFromWidth(width, rec.name)}</Link>
                                    <div>{rec.Yield.number} {rec.Yield.string}</div>
                                    <div>{rec.price}</div>
                                    <div>{rec.calories.total}</div>
                                    <div>{moment(rec.lastEdit).format('MMM, D, YYYY')}</div>
                                    <div className='Flex gap-sm'>
                                        <Button variant='primary' className='no-border bg-inner'>
                                            <Link to={`/recipe/${rec._id}`} style={link}>
                                                <i className='fa-solid fa-pen-to-square'></i>
                                            </Link>
                                        </Button>
                                        <Button variant='danger' className='no-border bg-inner' onClick={() => setConfirmModal({
                                            title: `Are You Sure You Want To Delete ${rec.name}`,
                                            body: 'This Cannot Be Undone',
                                            callbacks: [deleteRecipe], 
                                            props: [[rec._id]], 
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
                    <div className='Flex vertical gap-lg white padding-xlg'>
                        <div className='Flex center'>
                            <h1>You Haven't Created Any Recipes Yet</h1>
                        </div>
                        <div className='Flex center'>
                            <button className='btn-theme-lg'>
                                <Link to={'/recipe/new'} style={linkDark}>
                                    Create A New Recipe
                                </Link>
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default connector(RecipesList);