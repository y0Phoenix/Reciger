export default function isActivePage(activePage: number, currIndex: number) {
    return (activePage * 20) - 1 >= currIndex && (activePage * 20) - 20 <= currIndex;
};