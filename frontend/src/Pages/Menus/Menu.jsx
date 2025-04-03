import React from 'react';
import Category from '../../components/Category/Category';
import OrderForm from './OrderForm';
import OurMenu from './OurMenu';

const Menu = () => {
    return (
        <div>
            <Category/>
            <OrderForm/>
            <OurMenu/>
        </div>
    );
};

export default Menu;