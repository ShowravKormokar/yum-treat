import React from 'react';
import icon1 from '../../assets/image/icon-1.png'; // Correct path to image
import icon2 from '../../assets/image/icon-2.png';
import icon3 from '../../assets/image/icon-3.png';
import { Link } from 'react-router-dom';

const Order = () => {
    return (
        <section id="order" className="order py-12 p-5 md:p-20 text-center">
            <div className="heading text-center mb-8">
                <span className="text-lg text-[#c34c2e] uppercase font-[cursive]">order now</span>
                <h3 className="text-3xl font-bold text-gray-800">Fastest Home Delivery</h3>
            </div>

            <div className="icons-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
                <div className="icons p-4 text-center bg-gray-100 rounded-lg">
                    <img src={icon1} alt="Delivery Time" className="h-30 mx-auto" />
                    <h3 className="text-xl text-[#130f40] mt-3">7:00am to 10:30pm</h3>
                </div>

                <div className="icons p-4 text-center bg-gray-100 rounded-lg">
                    <img src={icon2} alt="Phone" className="h-30 mx-auto" />
                    <h3 className="text-xl text-[#130f40] mt-3">+880 1234567890</h3>
                </div>

                <div className="icons p-4 text-center bg-gray-100 rounded-lg">
                    <img src={icon3} alt="Location" className="h-30 mx-auto" />
                    <h3 className="text-xl text-[#130f40] mt-3">Rajshahi, Bangladesh</h3>
                </div>
            </div>

            <Link to="/contact_us" className="bg-[#c34c2e] text-white px-6 py-3 rounded-lg inline-block mt-4 hover:bg-black">
                Contact Us
            </Link>
        </section>
    );
};

export default Order;