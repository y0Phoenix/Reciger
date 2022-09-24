import React, { SetStateAction } from 'react';
import cycleSuggs from '../../functions/cycleSuggs';
import { Ingredient, RecipeIngredient } from '../../types/Ingredient';
import ShowModal from '../../types/ShowModal';

interface Props {
  suggs: Ingredient[][],
  ingData: RecipeIngredient[],
  i: number,
  showModal: ShowModal,
  setState: Function,
  suggsIndex: SuggsIndex,
  setSuggsIndex: React.Dispatch<SetStateAction<SuggsIndex>>,
  userClicked: boolean,
  setUserClicked: React.Dispatch<SetStateAction<boolean>>
}

interface SuggsIndex {
  index: number,
  where: number,
  start: boolean,
  show: boolean
}

const Suggestions: React.FC<Props> = ({suggs, ingData, i, setState, showModal, suggsIndex, setSuggsIndex, userClicked, setUserClicked}) => {
  window.onkeyup = (e) => cycleSuggs(e, suggsIndex, suggs, setUserClicked, setSuggsIndex);
  return (
      <>
          {suggs[i]?.length > 0 ?
                    <>
                      <br></br>
                      <div className='suggs'>
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
                                  setUserClicked(true);
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
                        <div className='suggs'>
                          <button id={`suggs${0}`} type='button' className='btn no-radius' style={{width: '100%'}} onClick={e => {
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