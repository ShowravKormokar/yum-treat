import React from 'react';

const OrderForm = () => {
    return (
        <div>
            <section className="bg-gray-100 py-10 text-white" id='order_now'>
                <div className="text-center mb-6">
                    <span className="text-lg text-black uppercase">Order Now</span>
                    <h3 className="text-3xl text-black  font-bold">Fast Home Delivery</h3>
                </div>
                <form className="bg-white p-6 max-w-4xl mx-auto rounded-lg shadow-lg text-black">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="w-full">
                            <div className="mb-4">
                                <label className="block text-lg font-medium">Full Name</label>
                                <input type="text" placeholder="Enter your name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium">Food Name</label>
                                <input type="text" placeholder="Food you want" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium">Order Details</label>
                                <input type="text" placeholder="Specifics with food" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium">Your Address</label>
                                <textarea placeholder="Enter your address" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500" rows="4"></textarea>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="mb-4">
                                <label className="block text-lg font-medium">Number</label>
                                <input type="number" placeholder="Enter your number" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium">How Much</label>
                                <input type="number" placeholder="How many you want" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium">When You Want</label>
                                <input type="datetime-local" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium">Our Address</label>
                                <iframe
                                    className="w-full h-48 border rounded-lg"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60307.59083109428!2d72.840725!3d19.141651!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aceef0c69%3A0x2aa80cf2287dfa3b!2sJogeshwari%20West%2C%20Mumbai%2C%20Maharashtra%20400047!5e0!3m2!1sen!2sin!4v1642222128240!5m2!1sen!2sin"
                                    loading="lazy"
                                    allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition">Order Now</button>
                </form>
            </section>
        </div>
    );
};

export default OrderForm;