import React from 'react'

const OrderBillTime = ({ orderTime, payed }) => {
    return (
        <div>
            <p className="font-medium text-gray-900">
                Payed: <strong>${parseFloat(payed).toFixed(2)}</strong>
            </p>
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
    )
}

export default OrderBillTime;