import { useState } from "react";

const faqs = [
    { question: "How does it work?", answer: "We provide high-quality food services..." },
    { question: "How long does it take for delivery?", answer: "Delivery typically takes 30-45 minutes..." },
    { question: "Can I order for huge parties?", answer: "Yes, we offer bulk ordering options..." },
    { question: "How much protein does it contain?", answer: "Each meal contains a balanced amount of protein..." },
    { question: "Is it cooked with oil?", answer: "We use minimal healthy oils in our cooking..." }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="max-w-3xl mx-auto py-10 mt-10">
            <h1 className="text-3xl font-bold text-center mb-6">FAQ</h1>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`border rounded-lg overflow-hidden shadow-md ${activeIndex === index ? "bg-red-500 text-white" : "bg-white"}`}
                    >
                        <button
                            className="w-full flex justify-between items-center p-4 text-lg font-semibold focus:outline-none"
                            onClick={() => toggleAccordion(index)}
                        >
                            {faq.question}
                            <span className={`transition-transform ${activeIndex === index ? "rotate-180" : "rotate-0"}`}>
                                ▼
                            </span>
                        </button>
                        <div
                            className={`transition-all duration-300 overflow-hidden ${activeIndex === index ? "p-4" : "h-0 p-0"}`}
                        >
                            <p className="text-gray-700">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
