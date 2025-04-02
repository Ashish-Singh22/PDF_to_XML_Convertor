import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import SideBar from "./sideBar";
import Context from "../context";

const Header = () => {
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { fetchUserHistory } = useContext(Context);

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include'
        });
        const data = await fetchData.json();
        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
            navigate("/");
        } else {
            toast.error(data.message);
        }
        fetchUserHistory()
    };

    return (
        <header className="w-full fixed top-0 left-0 bg-gray-900 text-white shadow-md px-4 py-6 flex items-center justify-between z-50 pr-10">
            {/* Left Sidebar Toggle */}
            <div className="flex items-center gap-2">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xl mr-2">
                    <FaBars />
                </button>
                <Link to="/" className="text-2xl font-bold text-green-400">XMLifyPDF</Link>
            </div>

            {/* Sidebar Component */}
            {sidebarOpen && <SideBar historyOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}

            {/* Desktop Navigation (Visible until 950px) */}
            <nav className="hidden md:flex gap-20">
                <Link to="/" className="hover:text-green-400">Home</Link>
                <Link to="/about" className="hover:text-green-400">About</Link>
                <Link to="/faq" className="hover:text-green-400">FAQ</Link>
            </nav>

            {/* Authentication Buttons (Visible until 950px) */}
            <div className="hidden md:block">
                {user ? (
                    <button onClick={handleLogout} className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-full">Logout</button>
                ) : (
                    <Link to="/login" className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-full">Get Started</Link>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-xl" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile Side Navigation */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-lg transform ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 md:hidden flex flex-col items-center pt-16 space-y-6`}>
                <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-xl">
                    <FaTimes />
                </button>
                <Link to="/" className="text-lg hover:text-green-400" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/about" className="text-lg hover:text-green-400" onClick={() => setMenuOpen(false)}>About</Link>
                <Link to="/faq" className="text-lg hover:text-green-400" onClick={() => setMenuOpen(false)}>FAQ</Link>
                {user ? (
                    <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-full">Logout</button>
                ) : (
                    <Link to="/login" className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-full" onClick={() => setMenuOpen(false)}>Get Started</Link>
                )}
            </div>
        </header>
    );
};

export default Header;
