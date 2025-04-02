import React, { useContext, useState } from "react";
import { FaTrash, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import Context from "../context";
import SummaryApi from "../common";
import Search from "./Search"; // Import the Search component

const SideBar = ({ historyOpen }) => {
    const { fetchUserHistory, userHistory } = useContext(Context);
    const [searchOpen, setSearchOpen] = useState(false);

    const handleDeleteHistory = async (historyId) => {
        try {
            const response = await fetch(SummaryApi.deleteHistory.url, {
                method: SummaryApi.deleteHistory.method, 
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ historyId }),
            });

            const result = await response.json();
            if (result.success) {
                fetchUserHistory();
            } else {
                console.error("Failed to delete history:", result.message);
            }
        } catch (error) {
            console.error("Error deleting history:", error);
        }
    };

    return (
        <>
            <div
                className={`fixed top-20 left-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-500 ease-in-out flex flex-col pt-5 space-y-4
                    ${historyOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-around gap-20 items-center">
                    <h3 className="text-2xl font-bold text-green-400">History</h3>
                    <FaSearch className="text-2xl font-bold text-green-400 cursor-pointer" onClick={() => setSearchOpen(true)} />
                </div>

                <div className="flex-grow overflow-y-auto px-4">
                    {userHistory ? (
                        userHistory.map((history) => {
                            const formattedDate = new Date(history.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            });

                            return (
                                <div key={history._id} className="flex flex-col bg-gray-800 p-2 rounded-lg mb-2">
                                    <Link to={`history/${history?._id}`} className="flex flex-col bg-gray-800 gap-1 rounded-lg ">
                                        <p className="text-sm text-gray-300 truncate">{history.fileName}</p>
                                        <p className="text-sm text-gray-300 truncate">{history.type}</p>
                                        <p className="text-xs text-gray-400">{formattedDate}</p>
                                    </Link>

                                    <button 
                                        onClick={() => handleDeleteHistory(history?._id)} 
                                        className="text-red-500 hover:text-red-400 self-end mt-1"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-400">No history available.</p>
                    )}
                </div>
            </div>

            {searchOpen && <Search closeSearch={() => setSearchOpen(false)} />}
        </>
    );
};

export default SideBar;
