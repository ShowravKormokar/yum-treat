import React from "react";
import homeImg from "../../assets/image/home-img.png";
import homeParallaxImg from "../../assets/image/home-parallax-img.png";
import Category from "../../components/Category/Category";
import About from "../../components/About/About";
import Popular from "../../components/Popular/Popular";
import Banner from "../../components/Banner/Banner";
import Order from "../../components/Contact/Order";

const Home = () => {
    return (
        <>
            <section className="flex flex-col-reverse md:flex-row items-center md:mt-16 gap-8 lg:h-[50vw] relative overflow-hidden px-4 md:px-12 lg:px-24 py-12" id="home">
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                    <span className="text-2xl text-[#c34c2e] font-[cursive]">Welcome Foodies</span>
                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900 pt-2">
                        Different spices for different tastes 😋
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed py-6">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis unde
                        dolores temporibus hic quam debitis tenetur harum nemo.
                    </p>
                    <a href="/menus#order_now" className="bg-[#c34c2e] text-white px-6 py-3 rounded-lg inline-block mt-4">
                        Order Now
                    </a>
                </div>

                {/* Images */}
                <div className="flex-1 flex justify-center items-center">
                    <img
                        src={homeImg}
                        alt="Delicious Food"
                        className="w-full max-w-lg mt-8 md:mt-0 object-contain"
                    />
                </div>

                {/* Parallax Image */}
                <img
                    src={homeParallaxImg}
                    alt="Parallax Effect"
                    className="absolute right-[-6rem] bottom-[8rem] w-[100vw] md:w-[80vw] hover:transfrom hover:translate-y-[-2px] hidden md:block"
                />
            </section>
            <Category />
            <About />
            <Popular />
            <Banner />
            <Order />
        </>
    );
};

export default Home;
