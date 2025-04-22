import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaHome, FaChartLine, FaPlus, FaList, FaEnvelope, FaChair, FaGlobe, FaSignOutAlt } from 'react-icons/fa';
import { RiMenu2Fill, RiCloseLine } from 'react-icons/ri';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [orders, setOrders] = useState([
        { id: 1, customer: 'John Doe', items: ['Chicken Burger x2', 'French Fries'], total: 24.98, status: 'pending' },
        { id: 2, customer: 'Jane Smith', items: ['Veg Pizza', 'Garlic Bread'], total: 18.50, status: 'pending' },
        { id: 3, customer: 'Mike Johnson', items: ['Steak Dinner', 'Red Wine'], total: 42.75, status: 'preparing' }
    ]);

    // Sample data for cards
    const stats = [
        { title: 'Total Orders', value: 128, color: 'bg-blue-100 text-blue-800' },
        { title: 'Total Sales', value: '$3,845.60', color: 'bg-green-100 text-green-800' },
        { title: 'Messages', value: 24, color: 'bg-purple-100 text-purple-800' },
        { title: 'Total Foods', value: 56, color: 'bg-amber-100 text-amber-800' },
        { title: 'Categories', value: 8, color: 'bg-red-100 text-red-800' }
    ];

    const handleAcceptOrder = (orderId) => {
        setOrders(orders.map(order =>
            order.id === orderId ? { ...order, status: 'preparing' } : order
        ));
    };

    const handleReadyForDelivery = (orderId) => {
        setOrders(orders.filter(order => order.id !== orderId));
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:static z-30 w-64 h-full bg-white shadow-md transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out`}
            >
                <div className="p-4 border-b">
                    <Link to="/home" className="text-3xl font-bold text-gray-800 flex items-center">
                        <FaUtensils className="text-[#c34c2e] mr-2" /> YumTreat
                    </Link>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link to="/admin-dashboard" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaHome className="mr-3" /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/analytics" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaChartLine className="mr-3" /> Analytics
                            </Link>
                        </li>
                        <li>
                            <Link to="/add-foods" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaPlus className="mr-3" /> Add Food
                            </Link>
                        </li>
                        <li>
                            <Link to="/add-category" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaPlus className="mr-3" /> Add Category
                            </Link>
                        </li>
                        <li>
                            <Link to="/orders" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaList className="mr-3" /> Order Info
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact-logs" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaEnvelope className="mr-3" /> Contact Logs
                            </Link>
                        </li>
                        <li>
                            <Link to="/table-bookings" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaChair className="mr-3" /> Table Booking
                            </Link>
                        </li>
                        <li>
                            <Link to="/messages" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaEnvelope className="mr-3" /> Messages
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaGlobe className="mr-3" /> My Site
                            </Link>
                        </li>
                        <li>
                            <Link to="/logout" className="flex items-center p-2 text-gray-700 hover:bg-amber-50 rounded-lg">
                                <FaSignOutAlt className="mr-3" /> Log Out
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top navbar */}
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between p-4">
                        <button
                            className="md:hidden text-gray-600 focus:outline-none"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? <RiCloseLine size={24} /> : <RiMenu2Fill size={24} />}
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                        <div className="w-8"></div> {/* Spacer for alignment */}
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-y-auto p-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                        {stats.map((stat, index) => (
                            <div key={index} className={`p-6 rounded-lg shadow ${stat.color}`}>
                                <h3 className="text-lg font-medium">{stat.title}</h3>
                                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Current Orders */}
                    <div className="bg-white rounded-lg shadow p-4">
                        <h2 className="text-xl font-semibold mb-4">Current Orders</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {orders.map(order => (
                                <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium">{order.customer}</h3>
                                        <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <ul className="list-disc list-inside mb-3 text-sm text-gray-600">
                                        {order.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold">${order.total.toFixed(2)}</p>
                                        <div className="space-x-2">
                                            {order.status === 'pending' && (
                                                <button
                                                    onClick={() => handleAcceptOrder(order.id)}
                                                    className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm"
                                                >
                                                    Accept
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleReadyForDelivery(order.id)}
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Ready
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;