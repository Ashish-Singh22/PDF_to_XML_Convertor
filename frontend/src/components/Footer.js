import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} PDF-to-XML Converter. All rights reserved.</p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/about" className="hover:text-green-400 flex items-center gap-2">
                    About <FaArrowRight />
                </Link>
                <Link to="/faq" className="hover:text-green-400 flex items-center gap-2">
                    FAQ <FaArrowRight />
                </Link>
                <a href="https://github.com/Ashish-Singh22" target="_blank" rel="noopener noreferrer" 
                    className="hover:text-green-400 flex items-center gap-2">
                    GitHub <FaArrowRight />
                </a>
            </div>
        </div>
    </footer>
);
};

export default Footer;
