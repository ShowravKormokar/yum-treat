import React from 'react';
import ContactInfoCard from '../../components/Contact/ContactInfoCard';
import ContactForm from './ContactForm';

const Contact = () => {
    return (
        <section id="order" className="order py-12 p-5 md:p-20 text-center">
            <div className="heading text-center mb-8">
                <span className="text-lg text-[#c34c2e] uppercase font-[cursive]">Contact US</span>
                <h3 className="text-3xl font-bold text-gray-800">We are always at your service</h3>
            </div>
            <ContactInfoCard />
            <ContactForm />
        </section>
    );
};

export default Contact; <h3>This is Contact page.</h3>