import React from "react";
import TableBook from "./TableBook";


const eventPackages = [
    {
        title: "Birthday Party",
        description: "Celebrate your special day with our customized birthday packages including cake, decorations, and catering.",
        price: "$299.99"
    },
    {
        title: "Corporate Dinner",
        description: "Host your corporate gatherings with our premium dining experience and personalized menu options.",
        price: "$499.99"
    },
    {
        title: "Wedding Reception",
        description: "Make your wedding reception memorable with our exquisite cuisine and elegant setup.",
        price: "$999.99"
    },
    {
        title: "Anniversary Celebration",
        description: "Celebrate your anniversary with a romantic dinner and specially curated dishes.",
        price: "$399.99"
    }
];

const Event = () => {
    return (
        <>
            <TableBook />
            <section className="bg-white py-10">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">Event Packages</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {eventPackages.map((event, index) => (
                            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <h3 className="text-3xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                                <p className="text-gray-700 mb-4">{event.description}</p>
                                <span className="text-xl font-bold text-orange-500">{event.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Event;
