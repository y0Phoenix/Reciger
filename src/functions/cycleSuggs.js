/**
 * @param  {} e the event from the browser
 * @param  {} index the index state
 * @param  {} suggs the array of suggestions
 * @param  {} setUserClicked the callback to set the bool for userClicked
 * @param  {} setSuggsIndex the callback to set the index state
 * @param  {} bool if this is recipe page suggs true else false
 */
export default function cycleSuggs(e, index, suggs, setUserClicked, setSuggsIndex, bool) {
    var {index: i, show, start, where} = {...index};
    const length = bool ? suggs[i]?.length : suggs.length;
    if (!length) return;
    var li;
    if ((e.code === 'ArrowDown' || e.code === 'ArrowUp' || e.code === 'Enter') && show) {
        li = document.getElementById(`suggs${where}`);
        let Index = -1;
        let newLi = where === 0 && li;
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