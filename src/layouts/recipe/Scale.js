import React, { useRef, useState } from 'react'

const Scale = ({params, setScale}) => {
    const [tempScale, setTempScale] = useState(1);
    const scale = useRef();
    return (
        <>
            {params.id !== 'new' && 
                <div className='recipe-scale-container'>
                    <small>Scale Recipe</small>
                    <br></br>
                    <div className='recipe-scale-amount'>
                        <input type='number' name='amount' value={tempScale} onChange={e => setTempScale(e.target.value)} ref={scale}></input>    
                    </div>
                    <div className='recipe-scale-submit'>
                        <input type='button' value='Scale' onClick={() => setScale(scale.current.value)}></input>
                    </div>
                </div>
            }
        </>
    )
}

export default Scale