import Layout from "./components/layout";
import StartPage from "./components/startPage"
import {Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import "./App.scss";
import {store} from "./components/store";
import Order from "./components/order";
import Cart from "./components/cart";
import Login from "./components/login";
import Register from "./components/register";
import Page404 from "./components/page404";
import Profile from "./components/profile";

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
