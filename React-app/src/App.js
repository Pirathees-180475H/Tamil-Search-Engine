import './App.css';
import SearchPage from './components/searchPage';
import HomePage from './components/HomePage';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<HomePage/>}></Route>
       <Route path="search"  element={<SearchPage/>} />
   </Routes>
 </BrowserRouter>

  );
}

export default App;
