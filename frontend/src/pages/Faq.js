import React from "react";
import { motion } from "framer-motion";


const FAQ = () => {
    const faqs = [
        { 
            question: "How do I upload a PDF?", 
            answer: "Simply navigate to the upload section, choose a file, and submit it for conversion."
        },
        { 
            question: "Is my data secure?", 
            answer: "Yes! We use end-to-end encryption to ensure the security of your documents."
        },
        { 
            question: "What formats are supported?", 
            answer: "Currently, we support PDF to XML conversion. More formats will be added soon."
        },
        { 
            question: "Can I preview the XML output?", 
            answer: "Yes! Our platform allows you to view the converted XML before downloading."
        },
        {
            question: "Can I convert multiple files at once?",
            answer: "Batch processing will be available in future updates, stay tuned!"
        },
        {
            question: "What happens to my uploaded files?",
            answer: "Your files are securely processed and deleted from our servers after conversion."
        },
        {
            question: "Is there a file size limit?",
            answer: "Yes, currently we allow files up to 10MB. Larger file support is coming soon."
        }
    ];

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-6">
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="max-w-4xl bg-gray-800 p-8 rounded-2xl shadow-xl"
            >
                <h1 className="text-4xl font-extrabold text-green-400 mb-6">Frequently Asked Questions</h1>
                {faqs.map((faq, index) => (
                    <motion.div 
                        key={index} 
                        className="mb-6 p-4 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-lg font-semibold text-green-300">{faq.question}</h3>
                        <p className="text-gray-300 mt-2">{faq.answer}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default FAQ;
