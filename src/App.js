// import NavBar from "./Components/NavBar";
// import Footer from "./Components/Footer";

import AdminSideMaster from "./AdminSideComponents/AdminSideMaster";
import ScrollToTop from "./Components/ScrollToTop";
import UserSideMaster from "./Components/UserSideMaster";
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import EmptyPage from "./MasterComponents/EmptyPage";
import { useEffect } from "react";



function App() {


  return (
    <>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path="/*" element={<UserSideMaster/>}></Route>
        <Route exact path="/admin/*" element={<AdminSideMaster/>}></Route>
      </Routes>
    </Router>
      
    </>
  );
}

export default App;
