import React from 'react'

const Suggestions = ({suggs, ingData, i, setIngData, setSuggs, setShowModal, showModal}) => {
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
                                setIngData(tempdataing);
                                setSuggs(tempdatasuggs);
                              }}>{sugg.name}</li>)}
                          </ul>
                        </div>
                      </> :
                      <>
                        {ingData[i].show === true &&
                          <div className='suggs'>
                            <button type='button' onClick={e => {
                              setShowModal({...showModal, IngredientM: {bool: true, id: showModal.IngredientM.id}});
                              const tempdata = [...ingData];
                              tempdata[i].show = false;
                              setIngData(tempdata);
                            }}>
                              Ingredient Doesn't Exist Want To Create It
                            </button>
                            <button onClick={e => {
                              const tempdata = [...ingData];
                              tempdata[i].show = false;
                              setIngData(tempdata);
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