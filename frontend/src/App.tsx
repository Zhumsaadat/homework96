import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Alert} from '@mui/material';
import Register from './features/Users/Register.tsx';
import Login from './features/Users/Login.tsx';
import AppToolbar from './components/AppToolbar';
import Cocktails from './features/Cocktails/Cocktails.tsx';

function App() {

    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <Routes>
                <Route path="/" element={<Cocktails />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Alert severity="error">Not found!</Alert>} />
            </Routes>
        </>
    );
}

export default App;