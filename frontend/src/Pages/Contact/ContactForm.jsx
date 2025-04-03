import React from 'react';

const ContactForm = () => {
    return (
        <div>
            <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <div className="flex flex-wrap gap-4 mb-4">
                    <input type="text" placeholder="Name" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500" />
                    <input type="email" placeholder="Email" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500" />
                </div>
                <div className="flex flex-wrap gap-4 mb-4">
                    <input type="number" placeholder="Number" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500" />
                    <input type="text" placeholder="Food Name" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500" />
                </div>
                <textarea
                    placeholder="Address"
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-red-500 resize-none h-40 mb-4"
                ></textarea>
                <button type="submit" className="w-full bg-red-500 text-white p-3 rounded-md font-semibold hover:bg-red-700 transition">
                    Order Now
                </button>
            </form>
        </div>
    );
};

export default ContactForm;