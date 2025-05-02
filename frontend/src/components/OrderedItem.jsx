import React, { useContext } from 'react';
import { FoodsContext } from '../Context/FoodsContext';

const OrderedItem = ({ productID }) => {
  const { foods, loading } = useContext(FoodsContext);

  if (loading) return <p>Loading food...</p>;

  const food = foods.find(f => f._id === productID);

  if (!food) return <p>Food item not found</p>;

  return (
    <div className="flex items-center justify-evenly gap-5 mb-2">
      <div>
        <img src={`../src/assets/foods/${food.imageUrl}.png`} alt={food.name} className="h-20 mx-auto" />
      </div>
      <div>
        <h4 className="font-semibold">{food.name}</h4>
        <p className="text-sm text-gray-600">{food.description}</p>
      </div>
      <div>
        <p className="text-sm text-blue-500">Price: ${food.currentPrice}</p>
      </div>
    </div>
  );
};

export default OrderedItem;
