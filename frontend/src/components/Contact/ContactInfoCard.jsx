import React from 'react';
import icon1 from '../../assets/image/icon-1.png'; // Correct path to image
import icon2 from '../../assets/image/icon-2.png';
import icon3 from '../../assets/image/icon-3.png';

const ContactInfoCard = () => {
    return (
        <div>
            <div className="icons-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
                <div className="icons p-4 text-center bg-gray-100 rounded-lg">
                    <img src={icon1} alt="Delivery Time" className="h-30 mx-auto" />
                    <h3 className="text-xl text-[#130f40] mt-3">7:00am to 10:30pm</h3>
                </div>

                <div className="icons p-4 text-center bg-gray-100 rounded-lg">
                    <img src={icon2} alt="Phone" className="h-30 mx-auto" />
                    <h3 className="text-xl text-[#130f40] mt-3">+880 1234567890</h3>
                </div>

                <div className="icons p-4 text-center bg-gray-100 rounded-lg">
                    <img src={icon2} alt="Phone" className="h-30 mx-auto" />
                    <h3 className="text-xl text-[#130f40] mt-3">info.yumtreat@health.co</h3>
                </div>

                <div className="icons p-4 text-center bg-gray-100 rounded-lg">
                    <img src={icon3} alt="Location" className="h-30 mx-auto" />
                    <h3 className="text-xl text-[#130f40] mt-3">Rajshahi, Bangladesh</h3>
                </div>
            </div>
        </div>
    );
};

export default ContactInfoCard;