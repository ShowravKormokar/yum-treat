import React from 'react';

const menuCategories = [
    {
        title: "Breakfast",
        items: [
            { name: "Morning Breakfast", description: "A healthy start to your day.", price: "$49.99" },
            { name: "Pancakes", description: "Fluffy pancakes with syrup.", price: "$39.99" },
        ],
    },
    {
        title: "Lunch",
        items: [
            { name: "Grilled Chicken", description: "Juicy grilled chicken with veggies.", price: "$59.99" },
            { name: "Pasta", description: "Creamy Alfredo pasta.", price: "$44.99" },
        ],
    },
    {
        title: "Dinner",
        items: [
            { name: "Steak", description: "Perfectly grilled steak.", price: "$79.99" },
            { name: "Salmon", description: "Grilled salmon with lemon butter.", price: "$69.99" },
        ],
    },
    {
        title: "Dessert",
        items: [
            { name: "Chocolate Cake", description: "Rich chocolate cake.", price: "$29.99" },
            { name: "Ice Cream", description: "Vanilla ice cream with toppings.", price: "$19.99" },
        ],
    },
    {
        title: "Drinks",
        items: [
            { name: "Cold Coffee", description: "Iced coffee with milk.", price: "$9.99" },
            { name: "Fresh Juice", description: "Natural fruit juice.", price: "$7.99" },
        ],
    },
];

const OurMenu = () => {
    return (
        <div>
            <section className="bg-gray-100 py-10 mt-10">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">Our Menu</h2>
                    {menuCategories.map((category, index) => (
                        <div key={index} className="mb-10">
                            <h3 className="text-3xl font-semibold text-white bg-orange-600 py-2 px-4 inline-block rounded-md mb-5">
                                {category.title}
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {category.items.map((item, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                                        <div>
                                            <h4 className="text-2xl font-medium text-gray-900">{item.name}</h4>
                                            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                        </div>
                                        <span className="text-xl font-semibold text-orange-500">{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default OurMenu;