import React, { useEffect, useRef, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import State from '../../types/State'
import { filterRecipes, postRecipe, getRecipeByID, resetRecipeFilter } from '../../actions/recipe';
import { getIngredients } from '../../actions/ingredient';
import { useLocation, useNavigate } from 'react-router-dom';
import { Recipe } from '../../types/Recipe';
import { Card, Form, InputGroup, Spinner } from 'react-bootstrap';
import { printPage } from '../../functions/printPage';
import Nutrients from './Nutrients';
import { bgTheme } from '../../types/Style';
import IngredientList from './IngredientList';
import { RecipeIngredient } from '../../types/Ingredient';
import {setDynamicValue, getDynamicValue} from '../../functions/DynamicValue';
import {useBeforeunload} from 'react-beforeunload';
import LoadingButton from '../../components/LoadingButton';
import { checkRecipe } from '../../functions/checkRecipe';
import { setToast } from '../../actions/toast';
import { Toast } from '../../types/Toast';

const mapStateToProps = (state: State) => ({
    recipeState: state.recipe,
    ingredients: state.ingredient.ingredients,
    user: state.user.user?._id,
});

const connector = connect(mapStateToProps, {filterRecipes, getIngredients, postRecipe, getRecipeByID, resetRecipeFilter, setToast});

type Props = ConnectedProps<typeof connector>;

const RecipePage: React.FC<Props> = ({recipeState, ingredients, user, getRecipeByID, postRecipe, getIngredients, resetRecipeFilter, setToast}) => {
    const navigate = useNavigate();
    // state that determines if there is unsaved changes
    const [changes, setChanges] = useState(false);

    // this package prompts the user when they are trying to reload with unsaved changes
    useBeforeunload((e) => {
        if (changes) {
            e.preventDefault()
        }
    })
    
    // grab the pathname from the URL in order to get the recipe id 
    const {pathname} = useLocation();
    // parse the pathname so only the id is left
    const id = pathname.split('/recipe/').join('');
    
    // useEffect for the initial render
    useEffect(() => {
        if (id !== 'new') getRecipeByID(id);
        getIngredients(true);
        return () => {
            console.log('component unmount');
            resetRecipeFilter();
        }
    }, []);

    // useEffect for when the url changes. usefull for when a user is switching between recipes without changing pages
    useEffect(() => {
        if (recipeState.filter.length <= 0) return;
        if (id !== recipeState.filter[0]._id) getRecipeByID(id);
    }, [id]);

    // useEffect for when the specified recipe is found
    useEffect(() => {
        if (recipeState.filter.length > 0 && recipeState.filter[0]._id === id && recipeState.filter[0].ingredients) setRecipe({...recipeState.filter[0]});
    }, [recipeState.filter]);

    // state for the recipe data
    const [recipe, setRecipe] = useState<Recipe>(new Recipe(id));

    // state for the scale amount
    const scaleRef = useRef<HTMLInputElement>(null);
    const [Scale, setScale] = useState(-1);

    /**
     * 
     * @desc common change event callback function
     * @param props should be an array of strings in JSON format. contains the properties that need accessing
     * @param value the value you wish to set to the specified property
     */
    const handleChange = (props: string[], value: any) => {
        if (!changes) setChanges(true);
        let _recipe = {...recipe};
        // the recursive function that will keep going until it accesses the possibly deeply nested property inside the recipe object 
        // initate recursion
        setDynamicValue(props, _recipe, value);
        // once recursion is finished and the _recipe object has been manipulated properly we can set the new recipe state
        setRecipe(_recipe);
    };

    // remove an ingredient from the ingredient array
    const removeIngredient = (index: number) => {
        if (!changes) setChanges(true);
        setRecipe({...recipe, ingredients: recipe.ingredients.filter((ing, i) => i !== index ? ing : null)});
    }
    // add an ingredient into the array
    const addIngredient = () => {
        if (!changes) setChanges(true);
        setRecipe({...recipe, ingredients: [...recipe.ingredients, new RecipeIngredient('new')]});
    }

    // the callback function for saving the recipe in the database
    const handleSave = () => {
        setChanges(false);
        let valid = checkRecipe(recipe);
        if (!valid.isValid) {
            return setToast(new Toast({
                body: valid.msg,
                autoHide: true,
                bg: "danger",
            }));
        }
        postRecipe(recipe, ingredients, recipe._id !== 'new', navigate, setRecipe);
    };

    // callback function for scaling the recipe
    const handleScale = (e: React.FormEvent<HTMLFormElement>, scale: number) => {
        e.preventDefault();
        if (!changes) setChanges(true);
        // we need this temp variable to send back to this function in the event of recursion
        const tempScale = scale;
        // we need to set the local scale variable to a decimal that represents the percentage of the original amounts 
        // we can than multiply this decimal to the current amounts and we should get our first amount as a sum 
        if (Scale !== -1) scale = parseFloat(`${Scale / (Scale * Scale)}`);
        setScale(parseFloat(scaleRef.current ? scaleRef.current.value : '1'));
        // we need a copy of the recipe obj to manipulate and then set the recipe state with later
        let _recipe = {...recipe};
        // we need a variable to tell us when to end recursion
        let halt = false;
        // recursive calculate function needed to fix a bug where if the user scaled more than once it would multiply with the current scale instead of with the original scale 
        const calculate = (scale: number) => {
            // calculate the new price 
            _recipe.price = `$${(parseFloat(recipe.price.split('$').join('')) * scale).toFixed(2)}`;
            // calculate new yeild
            _recipe.Yield.number = parseFloat((recipe.Yield.number * scale).toFixed(2));
            // calculate new ingredient amounts
            _recipe.ingredients.map(ing => {
                const oldAmount = ing.quantity.amount;
                const newAmount = Number((oldAmount * scale).toFixed(2));
                let Ing = {...ing};
                Ing.quantity.amount = newAmount;
                return Ing;
            });
            // calculate the nutrients
            // common array of key for the recipe obj to get and set the new nutrient amuonts
            const commonArr = (item: string) => ['nutrients', 'total', item, 'amount'];
            // create an array of all the nutrient items and set them
            ['protein', 'fat', 'carbs', 'sugars', 'fiber', 'calcium', 'iron', 'sodium']
                .forEach(item => {
                    const oldAmount: number = getDynamicValue(commonArr(item), _recipe);
                    const newAmount = Math.round(oldAmount * scale);
                    setDynamicValue(commonArr(item), _recipe, newAmount);
            })
            // calculate the new calories
            _recipe.calories.total = `${Math.round((parseFloat(recipe.calories.total) * scale))}`;
            if (halt) return;
            if (Scale !== -1) {
                halt = true
                calculate(tempScale);
            }
        }
        calculate(scale);
        setRecipe(_recipe);
    }

    return (
        <div className='Flex center padding-xxlg'>
            <Card className='bg-inner'>
                <Card.Body>
                    <div className='Flex space-btwn'>
                        <div>
                            <InputGroup>
                                <InputGroup.Text id='basid-addon1'>Recipe Name</InputGroup.Text>
                                <Form.Control 
                                    type={'text'} 
                                    value={recipe.name} 
                                    onChange={(e) => handleChange(["name"], e.target.value)} 
                                    placeholder='Recipe Name'
                                />
                            </InputGroup>
                        </div>
                        <div>
                            <Form.Check 
                                name='type' 
                                type={'checkbox'} 
                                checked={recipe.type != 'recipe'} 
                                onChange={(e) => handleChange(["type"], recipe.type == 'recipe' ? 'ingredient' : 'recipe')} 
                                label={'Check if this recipe is a sub-recipe'}
                            >
                            </Form.Check>
                        </div>
                    </div>
                    <br></br>
                    <Card className='bg-dark'>
                        <Card.Body className='Flex vertical gap-md'>
                            <div className='Flex space-btwn'>
                                <div className='Flex gap-md'>
                                    <div className='Flex'>
                                        <InputGroup>
                                            <InputGroup.Text id='basic-addon1'>Price</InputGroup.Text>
                                            <Form.Control 
                                                value={recipe.price}
                                                disabled
                                            />
                                        </InputGroup>
                                    </div>
                                    <div className='Flex gap-xxlg'>
                                        <InputGroup>
                                            <InputGroup.Text id='basic-addon1'>Yield Amount / Unit</InputGroup.Text>
                                            <Form.Control 
                                                type={'text'} 
                                                value={recipe.Yield.number} 
                                                onChange={(e) => handleChange(["Yield","number"], e.target.value)}
                                            />
                                            <Form.Control 
                                                type={'text'} 
                                                value={recipe.Yield.string} 
                                                onChange={(e) => handleChange(["Yield","string"], e.target.value)}
                                            />
                                        </InputGroup>
                                        <div>
                                            <form onSubmit={(e) => handleScale(e, parseFloat(scaleRef.current ? scaleRef.current.value : '1'))}>
                                                <div className='Flex'>
                                                    <InputGroup>
                                                        <Form.Control 
                                                            name='scale' 
                                                            type={'text'}
                                                            ref={scaleRef}
                                                            placeholder='1'
                                                        />
                                                        <InputGroup.Text id='basic-addon1' style={bgTheme}>
                                                            <button className='no-border no-bg' type={'submit'}>Scale</button>
                                                        </InputGroup.Text>
                                                    </InputGroup>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className='Flex gap-md'>
                                    <button className='btn-theme black' onClick={() => printPage(recipe)}>
                                        <i className='fa-solid fa-print'></i> Print
                                    </button>
                                    <LoadingButton 
                                        changes={changes} 
                                        callback={handleSave} 
                                        iconClass='fa-solid fa-cloud-arrow-up' 
                                        text='Save'
                                        type='button'
                                    />
                                </div>
                            </div>
                            <Card >
                                <Card.Body className='recipe-ingredients-container'>
                                    <div className='Flex'>
                                        <div className='border-white-sm scroll-y'>
                                            <div className='ingredient-list-header bg-inner padding-sm'>
                                                <div>name</div>
                                                <div>amount</div>
                                                <div>unit</div>
                                                <div>instructions</div>
                                                <div>actions</div>
                                            </div>
                                            <IngredientList handleChange={handleChange} removeIngredient={removeIngredient} recipe={recipe}/>
                                            <div className='Flex center padding-md'>
                                                <button className='btn-theme black' onClick={() => addIngredient()}>
                                                    <i className='fa-solid fa-plus'></i> Add Ingredient
                                                </button>
                                            </div>
                                            <br></br>
                                            <h4>Instructions</h4>
                                            <InputGroup>
                                                <Form.Control 
                                                    as={'textarea'}
                                                    placeholder='Your Recipe Instructions Here...'
                                                    value={recipe.instructions}
                                                    onChange={(e) => handleChange(["instructions"], e.target.value)}
                                                    style={{height: '250px'}}
                                                />
                                            </InputGroup>
                                        </div>
                                        <div className='bg-dark nutrient-container'>
                                            <Nutrients recipe={recipe}/>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </div>
    )
}

export default connector(RecipePage);