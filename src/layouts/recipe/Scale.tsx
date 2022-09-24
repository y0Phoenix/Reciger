import React, { SetStateAction, useState } from 'react'
import { motion } from 'framer-motion';
import { Params } from 'react-router-dom';

interface Props {
    params: Readonly<Params<string>>,
    setScale: React.Dispatch<SetStateAction<number>>
}

const Scale: React.FC<Props> = ({params, setScale}) => {
    const [tempScale, setTempScale] = useState(1);
    return (
        <>
            {params.id !== 'new' && 
                <div className='recipe-scale-container'>
                    <small>Scale Recipe</small>
                    <br></br>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setScale(tempScale);
                    }}>
                        <div className='recipe-scale-amount'>
                            <input type='text' style={{width: '75px'}} name='amount' value={tempScale} onChange={e => setTempScale(Number(e.target.value))}></input>    
                            <motion.button className='btn' whileHover={{scale: 1.06}} type='submit'>
                                Scale: <i className="fa-solid fa-scale-balanced"></i>
                            </motion.button>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default Scale