import React from "react";
import { motion } from "framer-motion";


const About = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-6">
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="max-w-4xl bg-gray-800 p-8 rounded-2xl shadow-xl relative overflow-hidden"
            >
                <h1 className="text-4xl font-extrabold text-green-400 mb-6 relative z-10">About This Project</h1>
                <p className="text-lg text-gray-300 leading-relaxed relative z-10 mb-4">
                    Welcome to the PDF-to-XML Converter! This web application efficiently extracts and structures content 
                    from PDF files, providing users with a seamless document transformation experience. Our solution 
                    ensures accuracy, security, and a smooth user experience.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed relative z-10 mb-4">
                    The tool is built with modern web technologies to offer fast and accurate conversions while maintaining document integrity. 
                    Our goal is to bridge the gap between complex PDF formats and structured XML data, enabling easy extraction and manipulation of document content.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed relative z-10">
                    Whether you are a researcher, developer, or business professional, our converter simplifies the process of extracting structured data from PDFs. 
                    Try it out today and experience the future of document conversion!
                </p>
                <motion.div 
                    className="absolute -top-10 -right-10 w-32 h-32 bg-green-500 opacity-30 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ repeat: Infinity, duration: 3 }}
                />
            </motion.div>
        </div>
    );
};

export default About;
