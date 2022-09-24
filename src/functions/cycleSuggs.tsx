import React from "react";
import { Ingredient } from "../types/Ingredient";
import { Recipe } from "../types/Recipe";

export interface Suggs {
    suggs: any,
    show: boolean
}

export interface SuggsIndex { 
    index: number,
    where: number,
    start: boolean,
    show: boolean
};

/**
 * @param  {} e the event from the browser
 * @param  {} index the index state
 * @param  {} suggs the array of suggestions
 * @param  {} setUserClicked the callback to set the bool for userClicked
 * @param  {} setSuggsIndex the callback to set the index state
 */
export default function cycleSuggs(e: KeyboardEvent, index: SuggsIndex, suggs: Suggs['suggs'], setUserClicked: React.Dispatch<React.SetStateAction<boolean>>, setSuggsIndex: React.Dispatch<React.SetStateAction<SuggsIndex>>) {
    var {index: i, show, start, where} = {...index};
    var li: HTMLElement;
    if ((e.code === 'ArrowDown' || e.code === 'ArrowUp' || e.code === 'Enter') && show) {
        if (e.code === 'Enter' && start) return;
        const liExists = document.getElementById(`suggs${where}`);
        li = liExists ? liExists : document.createElement('li');
        let Index = -1;
        let newLi: any = where === 0 && li;
        if (!start) {
            if (e.code === 'ArrowDown')  {
                newLi = li.nextSibling;
                Index = where + 1;
            }
            else if (e.code === 'ArrowUp')  {
                newLi = li.previousSibling;
                Index = where - 1;
            }
            else if (e.code === 'Enter') {
                setSuggsIndex({index: 0, show: false, start: true, where: 0});
                setUserClicked(true);
                return li.click();
            }
        }
        if (Index === -1 && !start) return;
        if (!newLi) return;
        li.classList.remove('suggs-selected');
        newLi.classList.add('suggs-selected');
        setUserClicked(false);
        setSuggsIndex({...index, start: false, where: Index <= 0 ? 0 : Index});
        newLi.click();
    }
}