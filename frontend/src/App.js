import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useEffect, useState } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [userHistory,setUserHistory] = useState([])

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserHistory = async()=>{
    const dataResponse = await fetch(SummaryApi.userHistory.url,{
      method : SummaryApi.userHistory.method,
      credentials : "include"
    })

    const dataApi = await dataResponse.json()
    // console.log(dataApi?.data)
    setUserHistory(dataApi?.data)
  }

  useEffect(() => {
    fetchUserDetails();
    fetchUserHistory();
  }, []);

  return (
    <Context.Provider value={{ 
      fetchUserDetails,
      fetchUserHistory,
      userHistory
    }}>
    
      <ToastContainer position='top-center' />
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-black to-gray-900 text-white w-full px-6">
        <Header />
        <main className="flex-grow flex justify-center items-center w-full px-4 md:px-8 lg:px-16 mt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Context.Provider>
  );
}

export default App;  