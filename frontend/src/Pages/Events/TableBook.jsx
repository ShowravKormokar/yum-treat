import React from 'react';

const TableBook = () => {
    return (
        <section className=" mx-auto py-10 p-5 md:p-20">
            <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mt-4">Book a Table</h3>
            </div>
            <div className="flex flex-wrap gap-8 justify-center items-center">
                <div className="w-full md:w-1/2">
                    <img src={new URL(`../../assets/image/book-table.jpg`, import.meta.url).href} alt="Table Booking" className="w-full rounded-lg shadow-lg" />
                </div>
                <form className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg border">
                    <h3 className="text-2xl font-semibold text-center mb-4">Reserve Your Spot</h3>
                    <input type="text" name="name" required placeholder="Enter your name" className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                    <input type="number" name="number" required placeholder="Enter your number" maxLength="10" className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                    <input type="number" name="guests" required placeholder="How many guests?" maxLength="2" className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
                    <button type="submit" className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition">Book Now</button>
                </form>
            </div>
        </section>
    );
};

export default TableBook;