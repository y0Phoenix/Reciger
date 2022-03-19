import React, {Fragment} from 'react';
import cycleSuggs from '../../functions/cycleSuggs';

const Suggestions = ({suggs, ingData, i, showModal, setState, suggsIndex, setSuggsIndex, userClicked, setUserClicked}) => {
  window.onkeyup = (e) => cycleSuggs(e, suggsIndex, suggs, setUserClicked, setSuggsIndex);
  window.onmousemove = () => !userClicked && setUserClicked(true); 
  return (
      <>
          {suggs[i]?.length > 0 ?
                    <>
                      <br></br>
                      <div className='suggs' style={{width: '915px'}}>
                          {suggs[i].map((sugg, index) =>
                              <div className='suggs-item' id={`suggs${index}`} key={sugg.name} onClick={e => {
                                if (userClicked) {
                                  const tempdataing = [...ingData];
                                  const tempdatasuggs = [...suggs];
                                  tempdataing[i].name = sugg.name;
                                  tempdataing[i].show = false;
                                  tempdatasuggs[i] = [];
                                  setState(tempdataing,'setIngData');
                                  setState(tempdatasuggs, 'setSuggs');
                                  setSuggsIndex({index: 0, show: false, start: true, where: 0});
                                }
                                else {
                                  const tempdataing = [...ingData];
                                  tempdataing[i].name = sugg.name;
                                  setState(tempdataing, 'setIngData');
                                  
                                }
                              }}>
                                <i className='fa-solid fa-magnifying-glass' key={index}></i>
                                {sugg.name}
                              </div>
                          )}
                      </div>
                    </> :
                    <>
                      {ingData[i].show === true &&
                        <div className='suggs' style={{width: '915px'}}>
                          <button id={`suggs${0}`} type='button' className='btn no-radius' style={{width: '915px'}} onClick={e => {
                            setState({...showModal, IngredientM: {bool: true, id: showModal.IngredientM.id}}, 'setShowModal');
                            const tempdata = [...ingData];
                            tempdata[i].show = false;
                            setState(tempdata, 'setIngData');
                            setSuggsIndex({index: 0, show: false, start: true, where: 0});
                          }}>
                            Ingredient Doesn't Exist Want To Create It
                          </button>
                        </div>
                      } 
                    </>
                  }
      </>
  )
}

export default Suggestions