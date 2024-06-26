import { Routes, Route } from 'react-router-dom';
import Login from './Screen/Login/Login';
import Register from './Screen/Register/Register';
import ForgotPass from './Screen/ForgotPass/Forgotpass';
import Home from './Screen/Home/Home';
import GetPass from './Screen/ForgotPass/GetPass';
import Contact from './Screen/Contact/Contact';
function App() {
    return (
        <div>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotPass" element={<ForgotPass />} />
                <Route path="/home" element={<Home />} />
                <Route path="/getPass" element={<GetPass />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
}

export default App;
