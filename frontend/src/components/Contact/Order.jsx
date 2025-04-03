import React from 'react';
import { Link } from 'react-router-dom';
import ContactInfoCard from './ContactInfoCard';

const Order = () => {
    return (
        <section id="order" className="order py-12 p-5 md:p-20 text-center">
            <div className="heading text-center mb-8">
                <span className="text-lg text-[#c34c2e] uppercase font-[cursive]">order now</span>
                <h3 className="text-3xl font-bold text-gray-800">Fastest Home Delivery</h3>
            </div>

            <ContactInfoCard/>

            <Link to="/contact_us" className="bg-[#c34c2e] text-white px-6 py-3 rounded-lg inline-block mt-4 hover:bg-black">
                Contact Us
            </Link>
        </section>
    );
};

export default Order;