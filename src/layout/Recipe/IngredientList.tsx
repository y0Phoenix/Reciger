import React, { useRef } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Recipe } from '../../types/Recipe'
import { setIngredientModal } from '../../actions/modal';
import { InputGroup, Form, Button } from 'react-bootstrap';
import Suggestions from '../../utils/Suggestions';
import State from '../../types/State';
import { setToast } from '../../actions/toast';
import { Toast } from '../../types/Toast';
import { Ingredient, RecipeIngredient } from '../../types/Ingredient';

const mapStateToProps = (state: State) => ({
    ingredients: state.ingredient.ingredients
});

const connector = connect(mapStateToProps, {setIngredientModal, setToast});

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps{
    recipe: Recipe,
    removeIngredient: (index: number) => void,
    handleChange: (props: string[], value: any) => void
}

const IngredientList: React.FC<Props> = ({recipe, ingredients, handleChange, removeIngredient, setIngredientModal, setToast}) => {
    const addIngredient = () => {
        setIngredientModal({id: 'new'});
    }

    const changeCallback = (props: string[], name: string) => {
        let ingredient: Ingredient | RecipeIngredient = ingredients.filter(ing => ing.name == name ? ing : null)[0];
        if (!ingredient) return;
        ingredient = new RecipeIngredient(ingredient._id, ingredient);
        handleChange(props, ingredient)
    }
    
    const handleInvalidInput = (input: string) => setToast(new Toast({
        body: `Invalid Ingredient "${input}"`, 
        autoHide: false, 
        bg: 'warning',
        buttonCallback: () => setIngredientModal({id: 'new'}),
        buttonText: `Click To Add Ingredient`
    }))

    return (
        <>
            {recipe.ingredients.length > 0 && 
                recipe.ingredients.map((ing, i) => {
                    return (
                        <div key={i} className='ingredient-list-container bg-dark padding-sm white'>
                            <InputGroup className='padding-right-xsm relative'>
                                <Form.Control 
                                    placeholder='name...'
                                    id={`name-input-${ing.name}`}
                                    onChange={(e) => handleChange(["ingredients",`${i}`,"name"], e.target.value)}
                                    value={ing.name}
                                />
                                <Suggestions 
                                    targetInput={`name-input-${ing.name}`} 
                                    targetArr={ingredients} 
                                    targetProperty='name' 
                                    targetPosition='35px' 
                                    changeCallback={changeCallback} 
                                    index={i}
                                    addCallback={addIngredient}
                                    handleInvalidInput={handleInvalidInput}
                                />
                            </InputGroup>
                            <InputGroup className='padding-right-xsm'>
                                <Form.Control
                                    placeholder='amount...'
                                    onChange={(e) => {
                                        // let value: string | number = Number(e.target.value);
                                        // if (e.target.value != "") value = Number(e.target.value);
                                        // else value = e.target.value
                                        // if (Number.isNaN(value)) return;
                                        handleChange(["ingredients", `${i}`, "quantity", "amount"], e.target.value)
                                    }}
                                    value={ing.quantity.amount}
                                />
                            </InputGroup>
                            <InputGroup className='padding-right-xsm'>
                                <Form.Control 
                                    placeholder='unit...'
                                    onChange={(e) => handleChange(["ingredients", `${i}`, "quantity", "unit"], e.target.value)}
                                    value={ing.quantity.unit}
                                />
                            </InputGroup>
                            <InputGroup className='padding-right-xsm'>
                                <Form.Control 
                                    placeholder='instruictions...'
                                    onChange={(e) => handleChange(["ingredients", `${i}`, "instructions"], e.target.value)}
                                    value={ing.instructions}
                                />
                            </InputGroup>
                            <div className='Flex gap-sm'>
                                <Button variant='primary' className='no-border' onClick={() => setIngredientModal({id: ing._id})}>
                                    <i className='fa-solid fa-pen-to-square'></i>
                                </Button>
                                <Button variant='danger' className='no-border' onClick={() => removeIngredient(i)}>
                                    <i className='fa-solid fa-trash-can'></i>
                                </Button>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default connector(IngredientList);