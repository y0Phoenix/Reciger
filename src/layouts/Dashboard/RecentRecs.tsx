import React, { Fragment, ReactNode, SetStateAction, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from 'react-router';
import { deleteRecipe } from '../../actions/recipe';
import { motion } from 'framer-motion';
import { User } from '../../types/User';
import ShowModal from '../../types/ShowModal';

const hover = {
    scale: 1.03
};

const connector = connect(null, {deleteRecipe});

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    user: User | null,
    setShowModal: React.Dispatch<SetStateAction<ShowModal>>,
    showModal: ShowModal,
};

const RecentRecs: React.FC<Props> = ({user, setShowModal, showModal, deleteRecipe}) => {
    const [navigate, setNavigate] = useState({
        bool: false,
        id: ''
    });
    const [width, setWidth] = useState(window.innerWidth <= 1700 ? 250 : 450);
    window.addEventListener('resize', () => window.innerWidth <= 1700 ? setWidth(250) : width === 250 && setWidth(450));
    return (
        user && 
        <>
            {user.recents.recipes.length > 0 && !navigate.bool ?
                user.recents.recipes.map((rec, i, arr) => {
                    i = i + 1;
                    let cats = ``;
                    rec.categories.forEach((cat, i, arr) => {
                        if (i === arr.length -1) {
                            cats += `${cat}`;
                        }
                        else {
                            cats += `${cat}, `;
                        }
                    });
                    return (
                        <div className='recent-item-main recent-recs' style={{width: `${width}px`}} key={i}>
                            <div className={`recent-name recent-item`}>{rec.name}</div>
                            <div className={`recent-categories recent-item`}>Categories: {cats}</div>
                            <div className={`recent-calories recent-item`}>Calories: {JSON.stringify(rec.calories)}</div>
                            <div className={`recent-yield recent-item`}>Yield: {JSON.stringify(rec.yield)}</div>
                            <div className={`recent-price recent-item`}>{rec.price}</div>
                            <div className={`recent-edit`}>
                                <motion.button whileHover={hover} type="button" className='btn no-radius' onClick={() => setNavigate({...navigate, bool: true, id: rec.rec ? rec.rec : ''})}>
                                    <i className='fa-solid fa-edit'></i>  
                                </motion.button>
                            </div>
                            <div className={`recent-delete`}>
                                <motion.button whileHover={hover} className='btn-red no-radius' onClick={() => setShowModal({...showModal, YesorNo: {direct: deleteRecipe, bool: true, params: {id: rec.rec, setShowModal, showModal}}})}>
                                    <i className='fa-solid fa-x'></i>    
                                </motion.button>
                            </div>
                        </div>
                    )
                }) :
                <>
                    {navigate.bool ? <Navigate to={`/recipe/${navigate.id}`}/> : <h5 key='norec'>No Recent Recipes</h5>}
                </> 
            }
        </> 
    )
}

export default connector(RecentRecs);