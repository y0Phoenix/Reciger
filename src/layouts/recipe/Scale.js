import React, { useState } from 'react'

const Scale = ({params, setScale}) => {
    const [tempScale, setTempScale] = useState(1);
    return (
        <>
            {params.id !== 'new' && 
                <div className='recipe-scale-container'>
                    <form onSubmit={e => {
                        e.preventDefault();
                        setScale(tempScale);
                    }}>
                        <div className='recipe-scale-amount'>
                            <input type='number' name='amount' value={tempScale} onChange={e => setTempScale(e.target.value)}></input>    
                        </div>
                        <div className='recipe-scale-submit'>
                            <input type='submit' value='Scale'></input>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default Scale