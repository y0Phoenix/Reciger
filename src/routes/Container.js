import React from 'react'
import { Outlet } from 'react-router-dom';

const Container = () => {
    return (
        <section className='container'>
            <Outlet/>
        </section>
    )
}

export default Container;
