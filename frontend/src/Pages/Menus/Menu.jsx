import React, { useEffect } from 'react';
import Category from '../../components/Category/Category';
import OrderForm from './OrderForm';
import OurMenu from './OurMenu';
import FoodLists from './FoodLists';

const Menu = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Category />
            <FoodLists />
            <OrderForm />
            <OurMenu />
        </div>
    );
};

export default Menu;
