export default function toggleShow(refs: any, name: string) {
    const type = refs[name].current.type === 'text' ? 'password' : 'text';
    const className = type === 'text' ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    refs[name].current.type = type;
    refs[`${name}I`].current.className = className;
};