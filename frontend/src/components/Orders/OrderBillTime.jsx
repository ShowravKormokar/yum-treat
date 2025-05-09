import React from 'react'

const OrderBillTime = ({ orderTime, payed, orderID }) => {
    return (
        <div className='flex items-center justify-between'>
            <p className="font-medium text-gray-900 uppercase">Order ID: {orderID.slice(-6)}</p>
            <p className="font-medium text-gray-900">
                Bill: <strong>${parseFloat(payed).toFixed(2)}</strong>
            </p>
            <p className="font-medium text-gray-900">
                <span>Ordered at: </span>
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
    )
}

export default OrderBillTime;