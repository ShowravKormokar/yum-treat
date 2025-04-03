import React from 'react';
import t1 from "../../assets/image/our-team-1.jpg"
import t2 from "../../assets/image/our-team-2.jpg"
import t3 from "../../assets/image/our-team-3.jpg"
import t4 from "../../assets/image/our-team-4.jpg"
import t5 from "../../assets/image/our-team-5.jpg"
import t6 from "../../assets/image/our-team-6.jpg"

const teamMembers = [
    { name: "John Deo", image: t1 },
    { name: "John Deo", image: t2 },
    { name: "John Deo", image: t3 },
    { name: "John Deo", image: t4 },
    { name: "John Deo", image: t5 },
    { name: "John Deo", image: t6 },
];

const OurTeam = () => {
    return (
        <div>
            <section className="py-10 text-center p-5 md:p-20">
                <div className="text-center pb-10">
                    <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">Our Story</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non veniam culpa officiis, quos repudiandae amet quam beatae deleniti laborum sit vero fugit quas dolorem ea accusamus sed ipsa obcaecati provident voluptates architecto voluptate unde assumenda. Iusto officia facilis quasi suscipit libero, voluptas ab a facere dolorum non fugit commodi est quos ea voluptatibus laudantium iure, necessitatibus dolor, distinctio porro! Facere voluptatem vel, excepturi, laudantium laborum quibusdam quia dolor sunt officiis temporibus, sit neque possimus porro odio optio vitae ullam beatae esse voluptatibus ex rem sed soluta ut nihil! Aut, ex delectus. Doloribus, molestias neque? Adipisci architecto, ipsa nemo illo consectetur molestias vero deserunt laudantium, harum recusandae quasi nisi expedita asperiores illum quos omnis voluptates reiciendis debitis sequi unde ducimus non. Voluptatibus aut voluptates placeat, saepe nisi eum nam incidunt molestiae aperiam mollitia labore expedita dignissimos? Dolore omnis saepe rem, recusandae repudiandae asperiores necessitatibus accusamus, quod ratione est magni laudantium eveniet!</p>
                </div>
                <div className="mb-8">
                    <h3 className="text-3xl font-bold">Our Team</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="shadow-lg rounded-lg overflow-hidden">
                            <img src={member.image} alt={member.name} className="w-full object-cover" />
                            <h3 className="text-xl font-semibold mt-2">{member.name}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default OurTeam;