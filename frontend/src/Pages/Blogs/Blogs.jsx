import React from "react";
import { Link } from "react-router-dom";
import { FaCalendar, FaTag } from "react-icons/fa";
import blog1 from "../../assets/image/blog-1.jpg";
import blog2 from "../../assets/image/blog-2.jpg";
import blog3 from "../../assets/image/blog-3.jpg";

// Blog Data Array
const blogsData = [
    {
        id: 1,
        date: "21st May, 2021",
        image: blog1,
        tags: ["food", "burger", "pizza"],
        title: "Delicious Treats Await You!",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, earum.",
    },
    {
        id: 2,
        date: "21st May, 2021",
        image: blog2,
        tags: ["food", "burger", "pizza"],
        title: "New Tasty Recipes!",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, earum.",
    },
    {
        id: 3,
        date: "21st May, 2021",
        image: blog3,
        tags: ["food", "burger", "pizza"],
        title: "Satisfy Your Cravings",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, earum.",
    },
];

const Blogs = () => {
    return (
        <section className="blogs py-12 bg-gray-100 mt-10" id="blogs">
            <div className="text-center mb-10">
                <span className="text-[#c34c2e] uppercase text-lg font-semibold">Our Blogs</span>
                <h3 className="text-3xl font-bold text-gray-800">Our Daily Stories</h3>
            </div>

            <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {blogsData.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                        {/* Image Section */}
                        <div className="relative group">
                            <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform" />
                            <h3 className="absolute top-3 left-4 bg-white px-3 py-1 rounded-md text-gray-800 flex items-center text-sm">
                                <FaCalendar className="text-[#c34c2e] mr-2" /> {blog.date}
                            </h3>
                        </div>

                        {/* Content Section */}
                        <div className="p-5">
                            <div className="flex space-x-3 text-gray-500 text-sm mb-3">
                                {blog.tags.map((tag, index) => (
                                    <Link key={index} to={`/tags/${tag}`} className="flex items-center hover:text-[#c34c2e] transition">
                                        <FaTag className="mr-1 text-[#c34c2e]" /> {tag}
                                    </Link>
                                ))}
                            </div>

                            <h3 className="text-2xl font-semibold text-gray-800">{blog.title}</h3>
                            <p className="text-gray-600 text-base mt-2 py-2">{blog.description}</p>

                            <Link to={`/blog/${blog.id}`} className="inline-block mt-4 px-4 py-2 bg-[#c34c2e] text-white rounded-md hover:bg-black transition">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Blogs;
