import React, { useState } from 'react'
import { motion } from 'framer-motion';

const Scale = ({params, setScale}) => {
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
                            <input type='text' style={{width: '75px'}} name='amount' value={tempScale} onChange={e => setTempScale(e.target.value)} autoFocus="autoFocus"></input>    
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