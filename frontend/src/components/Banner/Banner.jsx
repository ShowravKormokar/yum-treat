import React from 'react';
import bannerImage from '../../assets/image/row-banner.png'; // Correctly reference your image
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <section className="banner p-5 md:p-20 ">
            <div
                className="row-banner relative bg-cover bg-center h-[30rem] rounded-xl"
                style={{ backgroundImage: `url(${bannerImage})` }}
            >
                <div className="content absolute top-1/2 left-7 transform -translate-y-1/2">
                    <span className="font-satisfy text-2xl text-[#130f40] font-[cursive]">Double Cheese</span>
                    <h3 className="text-6xl text-red-600 uppercase font-bold md:mt-2 md:mb-2">burger</h3>
                    <p className="text-2xl pb-4">with cococola and fries</p>
                    <Link to="#" className="btn bg-[#c34c2e] text-white px-6 py-3 rounded-md hover:bg-black">
                        order now
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Banner;
