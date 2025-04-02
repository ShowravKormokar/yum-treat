import React from "react";
import aboutImg from "../../assets/image/about-img.png";
import serv1Img from "../../assets/image/serv-1.png";
import serv2Img from "../../assets/image/serv-2.png";
import serv3Img from "../../assets/image/serv-3.png";
import serv4Img from "../../assets/image/serv-4.png";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <section className="about bg-[#f7f7f7] py-12 p-5 md:p-20" id="about">
            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="flex-1">
                    <img src={aboutImg} alt="About Us" className="w-full" />
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center md:text-left">
                    <span className="text-3xl font-cursive text-[#c34c2e] font-[cursive]">Why Choose Us?</span>
                    <h3 className="text-3xl pt-2 font-bold text-[#130f40]">What's Make Our Food Delicious!</h3>
                    <p className="text-lg text-gray-600 leading-relaxed py-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ut explicabo, numquam iusto est a ipsum assumenda tempore esse corporis?
                    </p>
                    <Link to="#" className="bg-[#c34c2e] text-white px-6 py-3 rounded-lg inline-block mt-4">
                        Read More
                    </Link>

                    {/* Icons Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
                        <div className="flex items-center md:gap-2 lg:gap-4 bg-white p-6 rounded-lg shadow-md">
                            <img src={serv1Img} alt="Fast Delivery" className="md:h-10 lg:h-12" />
                            <h3 className="md:text-lg lg:text-xl text-[#130f40]">Fast Delivery</h3>
                        </div>
                        <div className="flex items-center md:gap-2 lg:gap-4 bg-white p-6 rounded-lg shadow-md">
                            <img src={serv2Img} alt="Fresh Food" className="md:h-10 lg:h-12" />
                            <h3 className="md:text-lg lg:text-xl text-[#130f40]">Fresh Food</h3>
                        </div>
                        <div className="flex items-center md:gap-2 lg:gap-4 bg-white p-6 rounded-lg shadow-md">
                            <img src={serv3Img} alt="Best Quality" className="md:h-10 lg:h-12" />
                            <h3 className="md:text-lg lg:text-xl text-[#130f40]">Best Quality</h3>
                        </div>
                        <div className="flex items-center md:gap-2 lg:gap-4 bg-white p-6 rounded-lg shadow-md">
                            <img src={serv4Img} alt="24/7 Support" className="md:h-10 lg:h-12" />
                            <h3 className="md:text-lg lg:text-xl text-[#130f40]">24/7 Support</h3>
                        </div>
                    </div>



                </div>
            </div>
        </section>
    );
};

export default About;
