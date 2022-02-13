import React from 'react'
import { Outlet } from 'react-router-dom';
import Alert from '../layouts/models/Alert';

const Container = () => {
    return (
        <section className='container'>
            <Alert />
            <Outlet/>
        </section>
    )
}

export default Container;
