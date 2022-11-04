import React, { Fragment, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'

interface Props {
    targetInput: string,
    targetArr: any[],
    targetProperty?: string
    targetPosition: string,
    changeCallback: (props: string[], value: string) => void,
    index: number,
    addCallback: () => void,
    /**
     * @description if the suggestion tab is closed with an invalid target input 
     */
    handleInvalidInput: (input: string) => void,
}

const Suggestions: React.FC<Props> = ({targetInput, targetArr, targetProperty, targetPosition, changeCallback, index, addCallback, handleInvalidInput}) => {
    var Input = document.getElementById(targetInput);
    // state for the suggestions array
    const [filteredArr, setFilteredArr] = useState<JSX.Element[]>([]);
    // state to determine whether or not the drop should show or not
    const [focused, setFocused] = useState(false);
    // state for the current index for the user using the arrowdown and arrowup keys
    const [tabIndex, setTabIndex] = useState(0);
    // if the tabbing in the suggestion dropdown is the very first
    const [initialTab, setInitialTab] = useState(true);
    // state for if we already checked for valid input
    const [inputChecked, setInputChecked] = useState(false);
    // common reset function for when the dropdown menu shouldn't be shown
    const handleClose = (isValidInput: boolean) => {
        setFilteredArr([]);
        setFocused(false);
        setInitialTab(true);
        setTabIndex(0);
        if (!isValidInput && !inputChecked) {
            const input = targetInput.split('name-input-').join('').toLocaleLowerCase();
            if (input === '') return;
            const index = targetArr.map(item => item[targetProperty ? targetProperty : 'name'].toLowerCase()).indexOf(input);
            if (index < 0) {
                handleInvalidInput(input);
                return setInputChecked(true);
            }
        }
    };
    // eventlistener for when the target input is being changed
    if (Input) {
        Input.onkeyup = (e) => {
            if (e.target instanceof HTMLInputElement) {
                // we are focused on the element. So we want to check if the focused variable is true if not then we set it to true
                if (!focused) setFocused(true);
                const regex = RegExp(`${e.target.value}`, 'gi');
                // create a new array with just the filtered results 
                let arr: JSX.Element[] = targetArr.filter((item) => {
                    const prop = item[targetProperty ? targetProperty : 'name'];
                    if (regex.test(prop)) return item 
                    return null
                })
                // create a new array from the filtered one that contains the dropdown items
                .map((item, i, arr) => (
                    <Fragment key={i}>
                        <Dropdown.Item 
                            id={`suggestion${item._id}`} 
                            onClick={() => {
                                changeCallback(["ingredients",`${index}`,"name"], item[targetProperty ? targetProperty : 'name'])
                                handleClose(true);
                            }}
                        >
                            {item[targetProperty ? targetProperty : 'name']}
                        </Dropdown.Item>
                    </Fragment>
                ));
                // if the new array is larger than 5 remove all the items after the fifth otherwise just return the arr
                if (arr.length > 5) arr.length = 5;
                setFilteredArr(arr);
                if (inputChecked) setInputChecked(false);
            }
        }
    }
    // event listener for when the user click. used to determine whether or not to stop showing the suggestions dropdown
    document.onmousedown = ((e) => {
        // check if the event target is an Element
        if (!(e.target instanceof Element)) return;
        const target = e.target;
        const _target = document.getElementById(targetInput);
        let isValidInput = _target?.id === target.id;
        if (target.innerHTML === 'No Suggested Items Click To Add') {
            isValidInput = true;
            setInputChecked(true);
            addCallback();
        }
        // check if the target has an id if it doesn't we always want to stop showing the suggestions dropdown
        if (target && target.id) {
            // create a new array of booleans that are true if the id's match. 
            // once the new array is made check if there is a true inside if there is the element being clicked on is a valid dropdown element
            const index = filteredArr.map(item => item.props.children.props.id == target.id).indexOf(true);
            // the index will be -1 if no true exists in the array
            if (index == -1) return handleClose(isValidInput);
        }
        else handleClose(isValidInput);
    });
    // event listener for when the user inputs a key. used to determine which element it shoud set active
    document.onkeyup = (e) => {
        // if no items in the array return
        if (filteredArr.length <= 0) return;
        // if the user inputed escape close the dropdown
        if (e.key == 'Escape') return handleClose(false);
        // if the user inputed enter change the input and close the dropdown
        if (e.key == 'Enter') {
            changeCallback(["ingredients",`${index}`,"name"], filteredArr[tabIndex].props.children.props.children);
            return handleClose(true);
        }
        // if the user didn't input ArrowUp and the user didn't inpur ArrowDown return
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        // if initialTab only set the first tabIndex class to active otherwise we would be setting the second tabIndex to active 
        if (initialTab) {
            setInitialTab(false);
            return document.getElementById(filteredArr[tabIndex].props.children.props.id)?.classList.add('active');
        }
        // user inputs arrow up
        if (e.key == 'ArrowUp') {
            // check if the element exists
            if (!filteredArr[tabIndex - 1]) return;
            const oldElement = document.getElementById(filteredArr[tabIndex].props.children.props.id);
            const newElement = document.getElementById(filteredArr[tabIndex - 1].props.children.props.id);
            newElement?.classList.add('active')
            oldElement?.classList.remove('active')
            return setTabIndex(tabIndex - 1);
        }
        // user inputs arrow down
        // check if the element exists
        if (!filteredArr[tabIndex + 1]) return;
        const newElement = document.getElementById(filteredArr[tabIndex + 1].props.children.props.id);
        const oldElement = document.getElementById(filteredArr[tabIndex].props.children.props.id);
        newElement?.classList.add('active')
        oldElement?.classList.remove('active')
        setTabIndex(tabIndex + 1);
    }
    return (
        <>
            <Dropdown.Menu style={{position: 'absolute', top: targetPosition}} show={focused}>
                {filteredArr.length > 0 ? 
                    filteredArr
                    :
                    (
                        <Dropdown.Item>
                            <Button variant='warning'>
                                No Suggested Items Click To Add
                            </Button>
                        </Dropdown.Item>
                    )
                }
            </Dropdown.Menu>
        </>
    )
}

export default Suggestions