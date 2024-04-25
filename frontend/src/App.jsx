import Layout from "./components/layout";
import StartPage from "./pages/hotelPage";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./components/store";
import Order from "./components/order";
import Cart from "./components/cart";
import Login from "./components/login";
import Register from "./components/register";
import Page404 from "./pages/page404";
import Profile from "./components/profile";
import Admin from "./components/admin";

function App() {
    return (
        <Provider store={store}>
            <Layout>
                <Routes>
                    <Route path="/">
                        <Route index element={<StartPage/>}/>
                    </Route>
                    <Route path="hotel/:id" element={<Order/>}/>
                    <Route path="cart" element={<Cart/>}/>
                    <Route path="admin" element={<Admin />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </Layout>
        </Provider>
    );
}

export default App;
