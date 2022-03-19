export default function cycleSuggs(e, index, suggs, setUserClicked, setSuggsIndex) {
    var {index: i, show, start, where} = {...index};
    const length = suggs[i]?.length;
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