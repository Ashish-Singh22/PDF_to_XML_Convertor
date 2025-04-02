import React, { useState, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Context from "../context";

const Search = ({ closeSearch }) => {
    const { userHistory } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredHistory = userHistory?.filter(history =>
        history.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            {/* Square-shaped Search Modal */}
            <div className="bg-gray-900 w-96 h-96 p-5 rounded-lg shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-green-400">Search History</h3>
                    <FaTimes 
                        className="text-xl text-red-400 cursor-pointer hover:text-red-300"
                        onClick={closeSearch} 
                    />
                </div>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by filename..."
                    className="p-2 w-full rounded bg-gray-700 text-white focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Scrollable Search Results */}
                <div className="mt-4 flex-grow overflow-y-auto bg-gray-800 p-2 rounded-lg">
                    {filteredHistory?.length > 0 ? (
                        filteredHistory.map(history => (
                            <Link 
                                to={`history/${history?._id}`} 
                                key={history._id} 
                                onClick={closeSearch} // Closes the search on click
                                className="block p-2 bg-gray-700 mb-2 rounded hover:bg-gray-600 transition duration-200"
                            >
                                <p className="text-gray-300 truncate">{history.fileName}</p>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center">No matching history found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
