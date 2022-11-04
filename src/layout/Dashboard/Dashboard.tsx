import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { filterIngredients, resetIngredientFilter } from '../../actions/ingredient';
import { filterRecipes, resetRecipeFilter } from '../../actions/recipe';
import { setIngredientModal } from '../../actions/modal';
import { Card, Form, InputGroup, ListGroup, Nav, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { bgSecondInnerDark, bgTheme, linkDark } from '../../types/Style';
import IngredientsList from './IngredientsList';
import RecipesList from './RecipesList';
import ShoppingList from './ShoppingList';
import State from '../../types/State';

type Nav = '/recipes' | '/ingredients' | '/shoppinglist';

const mapStateToProps = (state: State) => ({
    recipe: state.recipe,
    ingredient: state.ingredient
});

const connector = connect(mapStateToProps, {filterRecipes, filterIngredients, resetIngredientFilter, resetRecipeFilter, setIngredientModal});

type Props = ConnectedProps<typeof connector>;

const Dashboard: React.FC<Props> = ({recipe, ingredient, filterIngredients, filterRecipes, resetIngredientFilter, resetRecipeFilter, setIngredientModal}) => {
    const {filtered: recipeFiltered, recipes} = recipe;
    const {filtered: ingredientFiltered, ingredients} = ingredient;
    // state for when the navigation changes 
    const [nav, setNav] = useState<Nav>('/recipes');

    const [activePage, setActivePage] = useState(1);

    // useEffect for when the user clicks on a pagination the user is brought to the top of the page
    useEffect(() => {
        window.scrollTo(0,0);
    }, [activePage]);

    // handle function for filtering the arrays based on the search criteria
    const handleSearch = (name: string) => {
        if (name.length == 0) {
            if (nav == '/recipes') resetRecipeFilter();
            if (nav == '/ingredients') resetIngredientFilter();
            
        }
        else {
            if (nav == '/recipes') filterRecipes(recipes, name);
            if (nav == '/ingredients') filterIngredients(ingredients, name);
        }
    };

    // handle function for nav selection. mainly added to reset the filter of the page the user is exiting
    const handleNavSelect = (key: Nav) => {
        if (key == '/ingredients') {
            resetIngredientFilter();
            setActivePage(1);
        }
        if (key == '/recipes') {
            resetRecipeFilter();
            setActivePage(1);
        } 
        setNav(key);
    };

    // creats an array of <Pagination.Item>'s based on how many entries exist in the array
    const paginatedArr = () => {
        // the number for recursion
        let amount = 19;
        // the key for the <Pagination.Item> element which will show up on the users screen as a number
        let key = 1;
        let arr = [<Pagination.Item key={1} active={1 == activePage} onClick={() => setActivePage(1)}>{1}</Pagination.Item>];

        // determine the type of object to check
        const type = nav == '/recipes' ? 'recipe' : 'ingredient';

        // get the property names
        const recipeType = recipeFiltered ? 'filter' : 'recipes';
        const ingredientType = ingredientFiltered ? 'filter' : 'ingredients';

        // combine both objects together and use the determined property names instead of hard coding the property names. all this to reduce code size
        const obj = {...recipe, ...ingredient};

        const arrLength = obj[type == 'recipe' ? recipeType : ingredientType].length;
        const checkAmount = () => {
            // if the current page is 5 return because we don't want any pagination past 5 
            if (amount == 99) return;
            // if the array size is greater than the specified amount add 20 to the amount, push a <Pagingation.Item> into the arr and restart recursion
            if (arrLength > amount) {
                amount = amount + 20;
                key = key + 1;
                arr.push(
                    <Pagination.Item key={key} active={key == activePage} id={`${key}`} onClick={(e) => setActivePage(parseInt(e.currentTarget.id))}>{key}</Pagination.Item>
                )   
                checkAmount();
            }
            else return;
        }
        // callback function for the <Pagination.Next> in order to check if the next page has any content on it
        const nextPage = () => {
            // if the next page isn't a final page
            if ((activePage + 1) * (20) -1 <= arrLength) return setActivePage(activePage + 1);
            // if the next page is a final page make sure there is content on it
            if (((activePage + 1) * (20) - 1) >= arrLength && ((activePage + 1) * (20) - 20) <= arrLength) setActivePage(activePage + 1)
        }

        checkAmount();
        // place a previous button at the front of the array
        arr.unshift(<Pagination.Prev key={-1} onClick={() => activePage - 1 > 0 && setActivePage(activePage - 1)} />)
        // place a next button at the end of the array
        arr.push(<Pagination.Next key={-2} onClick={() => nextPage()} />)
        return arr;
    }
    var paginationArr: JSX.Element[] | undefined;
    if (nav !== '/shoppinglist') paginationArr = paginatedArr();
    return (
        <>
            <div className='Flex center margin-xlg'>
                <Card className='bg-inner'>
                    <Card.Body className='bg-second-inner'>
                        {/* double ampersands are just for making sure the key is the correct type */}
                        <Nav justify variant='tabs' defaultActiveKey={'/recipes'} onSelect={(key, e) => key && (key == '/recipes' || key == '/ingredients' || key == '/shoppinglist') && handleNavSelect(key)}>
                            <Nav.Item>
                                <Nav.Link eventKey='/recipes'>Recipes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='/ingredients'>Ingredients</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='/shoppinglist'>Shopping List</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Card className='bg-dark'>
                            <Card.Body>
                                <InputGroup className='mb-3'>
                                    <InputGroup.Text className='basic-addon1'>
                                        <i className='fa-solid fa-magnifying-glass'></i>
                                    </InputGroup.Text>
                                    <Form.Control 
                                        name='search'
                                        placeholder='search...'
                                        autoComplete='off'
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                    <InputGroup.Text className='basic-addon2' style={bgTheme}>
                                        {nav == '/recipes' ? 
                                            (
                                                <Link to={'/recipe/new'} style={linkDark}>
                                                    <i className='fa-solid fa-plus'></i> Add Recipe
                                                </Link>
                                            )
                                            :
                                            (
                                                <button className='no-border no-bg' onClick={() => setIngredientModal({id: 'new'})}>
                                                    <i className='fa-solid fa-plus'></i> Add Ingredient
                                                </button>
                                            )
                                        }
                                    </InputGroup.Text>
                                </InputGroup>
                                <Card style={bgSecondInnerDark}>
                                    <Card.Body className='dashboard-content'>
                                            {
                                                // for the different types of data between the recipes, ingredients, and shopping list
                                                // the data will go somewhere else on the grid
                                                nav == '/recipes' ? 
                                                    // recipe list data
                                                    (
                                                        <div className='dashboard-list-container bg-inner-dark white padding-sm'>
                                                            <div>Name</div>
                                                            <div>Yield</div>
                                                            <div>Price</div>
                                                            <div>Calories</div>
                                                            <div>Last Edit</div>
                                                            <div>Actions</div>
                                                        </div>
                                                    )
                                                    : nav == '/ingredients' ? 
                                                    // ingredient list data
                                                    (
                                                        <div className='dashboard-list-container-ing bg-inner-dark white padding-sm'>
                                                            <div>Name</div>
                                                            <div>Price</div>
                                                            <div>Last Edit</div>
                                                            <div>Actions</div>
                                                        </div>
                                                    )
                                                    : 
                                                        // shopping list data
                                                        (
                                                            <>
                                                            </>
                                                        )
                                            }
                                        <ListGroup>
                                            {
                                                // the different lists depending on which nav is selected
                                                nav == '/recipes' ? <RecipesList activePage={activePage}/> :  nav == '/ingredients' ? <IngredientsList activePage={activePage}/> : <ShoppingList />
                                            }
                                        </ListGroup>
                                        {nav !== '/shoppinglist' && 
                                            <Pagination className='center margin-top-md'>{paginationArr}</Pagination>
                                        }
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default connector(Dashboard);