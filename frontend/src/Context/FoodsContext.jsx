import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const FoodsContext = createContext();

const FoodsProvider = ({ children }) => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/foods");
                const data = await res.json();
                setFoods(data);
            } catch (error) {
                console.error('Error fetching foods:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    return (
        <FoodsContext.Provider value={{ foods, setFoods, loading }}>
            {children}
        </FoodsContext.Provider>
    );
};

export default FoodsProvider;
