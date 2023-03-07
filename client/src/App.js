import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import React  from 'react';

import CreateBook from './components/CreateBook';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import UpdateBookInfo from './components/UpdateBookInfo';
import Kvitok from './components/Kvitok';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowBookList />} />
          <Route exact path='/kvitok' element={<Kvitok />} />
          <Route path='/create-book' element={<CreateBook />} />
          <Route path='/edit-book/:id' element={<UpdateBookInfo />} />
          <Route path='/show-book/:id' element={<ShowBookDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;