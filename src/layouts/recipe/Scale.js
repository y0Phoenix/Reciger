import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion';

const Scale = ({params, setScale}) => {
    const [tempScale, setTempScale] = useState(1);
    const scale = useRef();
    return (
        <>
            {params.id !== 'new' && 
                <div className='recipe-scale-container'>
                    <small>Scale Recipe</small>
                    <br></br>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setScale(scale.current.value);
                    }}>
                        <div className='recipe-scale-amount'>
                            <input type='number' name='amount' value={tempScale} onChange={e => setTempScale(e.target.value)} ref={scale}></input>    
                            <motion.input className='btn' whileHover={{scale: 1.06}} type='button' value='Scale'></motion.input>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default Scale