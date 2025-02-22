import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap'
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State';
import { removeModal, setConfirmModal } from '../actions/modal';
import { Ingredient } from '../types/Ingredient';
import { getIngredientByID, postIngredient, resetIngredientFilter, updateIngredient } from '../actions/ingredient';
import {setDynamicValue} from '../functions/DynamicValue';
import LoadingButton from './LoadingButton';
import { useBeforeunload } from 'react-beforeunload';
import { useNavigate } from 'react-router-dom';
import getSubRecipe from '../functions/getSubRecipe';

const mapStateToProps = (state: State) => ({
    id: state.modal.ingredient.id,
    ingredientState: state.ingredient.filter
});

const connector = connect(mapStateToProps, {removeModal, setConfirmModal, getIngredientByID, postIngredient, updateIngredient, resetIngredientFilter});

type Props = ConnectedProps<typeof connector>;

const IngredientModal: React.FC<Props> = ({id, removeModal, setConfirmModal, getIngredientByID, postIngredient, updateIngredient, resetIngredientFilter, ingredientState}) => {
    const navigate = useNavigate();
    // local ingredient state to manipulate
    const [ingredient, setIngredient] = useState(new Ingredient());
    // state for the nutritional data boolean
    const [noNut, setNoNut] = useState(true);
    // state to determine if unsaved changed have been made
    const [changes, setChanges] = useState(false);

    // this package prompts the user when they are trying to reload with unsaved changes
    useBeforeunload((e) => {
        if (changes) {
            e.preventDefault()
        }
    })

    // useEffect for the initial render. to simulate the initial render we use the id prop which is when the component should show and when it shouldn't show
    useEffect(() => {
        if (id !== '' && id !== 'new') getIngredientByID(id);
        return () => {
            resetIngredientFilter();
        }
    }, []);

    // useEffect for when the ingredientState changes
    useEffect(() => {
        if (ingredientState.length <= 0) return;
        if (id !== '' && id !== 'new' && ingredientState[0]._id === id) {
            if (ingredientState[0].type === 'recipe') {
                getSubRecipe(ingredientState[0].name, navigate);
                return removeModal('ingredient');
            }
            setIngredient(ingredientState[0]);
        }
    }, [ingredientState]);

    // callback for handling the input changes
    const handleChange = (props: string[], value: any) => {
        if (!changes) setChanges(true);
        const temp = {...ingredient};
        setDynamicValue(props, temp, value);
        setIngredient(temp);
    };

    // callback for handling the ingredient save
    const handleSave = () => {
        if (id === '' || id === 'new') postIngredient(ingredient, noNut);
        else updateIngredient(ingredient, id, false, noNut);
        setChanges(false);
    }

    // callback for handling the modal close
    const handleClose = () => {
        if (!changes) removeModal('ingredient')
        else setConfirmModal({
            title: 'Unsaved Changes Detected',
            body: 'Are You Sure You Want To Exit',
            callbacks: [removeModal], 
            props: [['ingredient']],
            show: true})
    }

    return (
        <Modal show={id !== ''} onHide={() => handleClose()} onEscapeKeyDown={() => handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{id !== '' && id !== 'new' ? ingredient.name : 'New Ingredient'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='Flex vertical gap-md'>
                    <InputGroup>
                        <InputGroup.Text id='basic-addon1'>Name</InputGroup.Text>
                        <Form.Control 
                            value={ingredient.name}
                            placeholder='name...'
                            onChange={(e) => handleChange(['name'], e.target.value)}
                        />
                    </InputGroup>
                    {/* <InputGroup>
                        <InputGroup.Text id='basic-addon1'>Categories</InputGroup.Text>
                        <Form.Control 
                        value={ingredient.categories}
                        placeholder='categories'
                        onChange={(e) => handleChange(['categories'], e.target.value)}
                        />
                    </InputGroup> */}
                    <InputGroup>
                        <InputGroup.Text id='basic-addon1'>Price</InputGroup.Text>
                        <Form.Control 
                            value={ingredient.price}
                            placeholder='price...'
                            onChange={(e) => handleChange(['price'], e.target.value)}
                        />
                    </InputGroup>
                    <Form.Check 
                        label={'Opt Into Nutritional Data'}
                        checked={!noNut}
                        type={'checkbox'}
                        onChange={() => {
                            setChanges(true);
                            setNoNut(!noNut)
                        }}
                    />
                    <div className='Flex center'>
                        <LoadingButton 
                            changes={changes} 
                            callback={handleSave} 
                            iconClass={'fa-solid fa-cloud-arrow-up'} 
                            text={'Save'} 
                            type='button'
                        />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default connector(IngredientModal);