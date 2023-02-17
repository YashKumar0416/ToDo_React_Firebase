import React, { createContext, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Messages from './components/Messages';
import Navbar from "./components/Navbar"
import SignUp from './components/SignUp';
import { initialState, reducer } from './UserContext';

export const Present = createContext();

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <Present.Provider value={{state, dispatch}}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/messages' element={<Messages />}></Route>
      </Routes>
    </Present.Provider>
    </>
  )
}

export default App