export const background = {
    initial: {
        opacity: 0
    }, 
    enter: {
        opacity: 1
    }, 
    exit: {
        opacity: 0
    }, 
};
export const modal = {
    initial: {
        y: "-100vh",
        opacity: 0
    },
    enter: {
        y: "200px",
        opacity: 1,
        transition: {
            delay: 0.5
        }
    }
}