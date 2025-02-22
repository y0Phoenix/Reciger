/**
 * @desc sets the specified value to the specified property dynamically 
 * @param properties the keys to use in order to set the specified value 
 * @param obj the object which needs to be changed
 * @param value the value needed to be set
 */
export const setDynamicValue = (properties: string[], obj: any, value: any) => {
    // the current object property
    const prop = properties[0];
    // if the amount of properties inside the array is only 1 then we can set the value of that property and end the recursion
    if (properties.length == 1) return obj[prop] = value;
    // if the amount of properties inside the array is more than 1 we need to continue recursion, passing in the new array with the first element removed,
    // and the new object accessed from the prop variable
    setDynamicValue(properties.splice(1), obj[prop], value);
};

/**
 * @desc gets the specified value to the specified property dynamically 
 * @param properties the keys to use in order to get the specified prop 
 * @param obj the object which contains the needed property
 */
export const getDynamicValue = (properties: string[], obj: any) => {
    let returnValue: any;
    const recursion = (props: string[], OBJ: any) => {
        // the current object property
        const prop = props[0];
        // if the amount of props inside the array is only 1 then we can set the value of that property and end the recursion
        if (props.length == 1) return returnValue = OBJ[prop];
        // if the amount of props inside the array is more than 1 we need to continue recursion, passing in the new array with the first element removed,
        // and the new object accessed from the prop variable
        recursion(props.splice(1), OBJ[prop]);
    }
    recursion(properties, obj);
    return returnValue;
}