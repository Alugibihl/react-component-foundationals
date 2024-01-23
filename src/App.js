import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Carousel from './components/carousel';
import './App.css';
import Nasa from './components/nasa';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/images" element={<Carousel />} />
      <Route path='/nasa' element={<Nasa />} />
    </Routes>
  );
}

export default App;


// tasks for today
// create a todo app to render all todos from https://jsonplaceholder.typicode.com/todos
// add buttons to toggle completion status on the todo
// add filtering functionality to view all, complete, and incomplete todos all 3 categories
// todo index
// todo index item
// new todo form (bonus)
