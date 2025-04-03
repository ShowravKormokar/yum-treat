import React from 'react';
import FAQ from '../../components/Faqs/Faq';
import OurTeam from './OurTeam';

const About = () => {
    return (
        <div className='mt-10' id='ourStory'>
            <OurTeam/>
            <FAQ/>
        </div>
    );
};

export default About;