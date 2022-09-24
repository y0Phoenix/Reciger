import React, {SetStateAction, useState} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { deleteIngredient } from '../../actions/ingredient';
import { motion } from 'framer-motion';
import { User } from '../../types/User';
import ShowModal from '../../types/ShowModal';

const hover = {
    scale: 1.03
};

const connector = connect(null, {deleteIngredient});

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    user: User | null,
    showModal: ShowModal,
    setShowModal: React.Dispatch<SetStateAction<ShowModal>>
};

const RecentIngs: React.FC<Props> = ({user, showModal, setShowModal, deleteIngredient}) => {
    const [width, setWidth] = useState(window.innerWidth <= 1700 ? 250 : 450);
    window.addEventListener('resize', () => window.innerWidth <= 1700 ? setWidth(250) : width === 250 && setWidth(450));
    return (
        user && 
        <>
            {user?.recents.ingredients.length > 0 ?
            user.recents.ingredients.map((ing, i) => {
                i = i + 1;
                let cats = ``;
                ing.categories.forEach((cat, i, arr) => {
                    if (i === arr.length -1) {
                        cats += `${cat}`;
                    }
                    else {
                        cats += `${cat}, `;
                    }
                });
                return (
                    <div className={`recent-item-main recent-ings`} style={{width: `${width}px`}} key={i}>
                        <div className={`recent-name recent-item`}>{ing.name}</div>
                        <div className={`recent-categories recent-item`}>Categories: {cats}</div>
                        <div className={`recent-calories recent-item`}>Calories: {ing.calories.pref}</div>
                        <div className={`recent-price recent-item`}>Price: {ing.price}</div>
                        <div className={`recent-edit`}>
                            <motion.button whileHover={hover} className='btn no-radius' onClick={e => setShowModal({...showModal, IngredientM: {bool: true, id: ing.ing}})}>
                                <i className='fa-solid fa-edit'></i>    
                            </motion.button>
                        </div>
                        <div className={`recent-delete`}>
                            <motion.button whileHover={hover} className='btn-red no-radius' onClick={() => setShowModal({...showModal, YesorNo: {direct: deleteIngredient, bool: true, params: {id: ing.ing, setShowModal, showModal}}})}>
                                <i className='fa-solid fa-x'></i>
                            </motion.button>
                        </div>
                    </div>
                )
            }) :
            <h5 key='noing'>No Recent Ingredients</h5>}
        </>
    )
}

export default connector(RecentIngs);