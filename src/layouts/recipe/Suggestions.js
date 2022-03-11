import React from 'react'

const Suggestions = ({suggs, ingData, i, showModal, setStateChange}) => {
    return (
        <>
            {suggs[i]?.length > 0 ?
                      <>
                        <br></br>
                        <div className='suggs'>
                          <ul>
                            {suggs[i].map(sugg => 
                              <li key={sugg.name} onClick={e => {
                                const tempdataing = [...ingData];
                                const tempdatasuggs = [...suggs];
                                tempdataing[i].name = sugg.name;
                                tempdataing[i].show = false;
                                tempdatasuggs[i] = [];
                                setStateChange({newState: tempdataing, type: 'setIngData'});
                                setStateChange({newState: tempdatasuggs, type: 'setSuggs'});
                              }}>{sugg.name}</li>)}
                          </ul>
                        </div>
                      </> :
                      <>
                        {ingData[i].show === true &&
                          <div className='suggs'>
                            <button type='button' onClick={e => {
                              setStateChange({newState: {...showModal, IngredientM: {bool: true, id: showModal.IngredientM.id}}, type: 'setShowModal'});
                              const tempdata = [...ingData];
                              tempdata[i].show = false;
                              setStateChange({newState: tempdata, type: 'setIngData'});
                            }}>
                              Ingredient Doesn't Exist Want To Create It
                            </button>
                            <button onClick={e => {
                              const tempdata = [...ingData];
                              tempdata[i].show = false;
                              setStateChange({newState: tempdata, type: 'setIngData'});
                            }}>
                              <i className='fa-solid fa-x'></i>
                            </button>
                          </div>
                        } 
                      </>
                    }
        </>
    )
}

export default Suggestions