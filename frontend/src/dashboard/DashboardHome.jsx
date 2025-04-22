import InfoCards from './Dash-components/InfoCards';
import OrderCards from './Dash-components/OrderCards';

const DashboardHome = ({orders, handleAcceptOrder, handleReadyForDelivery }) => {
    return (
        <>
            <InfoCards/>
            <OrderCards
                orders={orders}
                handleAcceptOrder={handleAcceptOrder}
                handleReadyForDelivery={handleReadyForDelivery}
            />
        </>
    );
};

export default DashboardHome;