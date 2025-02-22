import React from 'react'
import { Recipe } from '../../types/Recipe'
import {Table} from 'react-bootstrap';

interface Props {
    recipe: Recipe
};

const Nutrients: React.FC<Props> = ({recipe}) => {
    return (
        <div className='Flex vertical center border-white-sm padding-xsm white'>
            <h1>Nutrient Data</h1>
            <Table striped bordered hover variant='dark'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Calories</td>
                        <td>{recipe.calories.total}</td>
                        <td>kCal</td>
                    </tr>
                    <tr>
                        <td>Protein</td>
                        <td>{recipe.nutrients.total.protein.amount}</td>
                        <td>{recipe.nutrients.total.protein.unit}</td>
                    </tr>
                    <tr>
                        <td>Fat</td>
                        <td>{recipe.nutrients.total.fat.amount}</td>
                        <td>{recipe.nutrients.total.fat.unit}</td>
                    </tr>
                    <tr>
                        <td>Carbs</td>
                        <td>{recipe.nutrients.total.carbs.amount}</td>
                        <td>{recipe.nutrients.total.carbs.unit}</td>
                    </tr>
                    <tr>
                        <td>Sugars</td>
                        <td>{recipe.nutrients.total.sugars.amount}</td>
                        <td>{recipe.nutrients.total.sugars.unit}</td>
                    </tr>
                    <tr>
                        <td>Fiber</td>
                        <td>{recipe.nutrients.total.fiber.amount}</td>
                        <td>{recipe.nutrients.total.fiber.unit}</td>
                    </tr>
                    <tr>
                        <td>Calcium</td>
                        <td>{recipe.nutrients.total.calcium.amount}</td>
                        <td>{recipe.nutrients.total.calcium.unit}</td>
                    </tr>
                    <tr>
                        <td>Iron</td>
                        <td>{recipe.nutrients.total.iron.amount}</td>
                        <td>{recipe.nutrients.total.iron.unit}</td>
                    </tr>
                    <tr>
                        <td>Sodium</td>
                        <td>{recipe.nutrients.total.sodium.amount}</td>
                        <td>{recipe.nutrients.total.sodium.unit}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Nutrients