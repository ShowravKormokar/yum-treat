import React, { useContext } from 'react';
import { FoodsContext } from '../../Context/FoodsContext';

const OrderedItem = ({ productID, orderTime }) => {
  const { foods, loading } = useContext(FoodsContext);

  if (loading) return <div className="p-4 text-gray-500">Loading...</div>;

  const food = foods.find(f => f._id === productID);

  if (!food) return <div className="p-4 text-gray-500">Item not available</div>;

  return (
    <div className="flex items-center p-3 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
        <img
          src={`../src/assets/foods/${food.imageUrl}.png`}
          alt={food.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow ml-4 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{food.name}</h4>
        <p className="text-sm text-gray-500 truncate">{food.description}</p>
      </div>

      <div className="ml-4 text-right">
        <p className="font-medium text-gray-900">${food.currentPrice.toFixed(2)}</p>
        <p className="font-medium text-gray-900">
          {new Date(orderTime).toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
};

export default OrderedItem;