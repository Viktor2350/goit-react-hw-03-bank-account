import React from 'react';
import { toast } from 'react-toastify';
import Dashboard from '../Dashboard/Dashboard';
import './App.css';

toast.configure({
  autoClose: 3000,
  draggable: false,
  position: 'bottom-right',
});

const App = () => <Dashboard />;

export default App;
