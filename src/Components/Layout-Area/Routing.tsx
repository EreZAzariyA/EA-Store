import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserModel from "../../Models/user-model";
import { authStore } from "../../Redux/Store";
import Login from "../Auth-Area/Login";
import Register from "../Auth-Area/Register";
import { CartPage } from "../Pages/Cart-Page";
import HomePage from "../Pages/Home-Page";
import { SearchPage } from "../Pages/Search-Page";
import { UserProfile } from "../Pages/User-Profile";
import OneProduct from "../Products-Area/OneProduct";

const Routing = () => {
      const [user, setUser] = useState<UserModel>();

      useEffect(() => {
            setUser(authStore.getState().user);

            const unsubscribe = authStore.subscribe(() => {
                  setUser(authStore.getState().user);
            });

            return () => unsubscribe();
      }, []);

      return (
            <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:productId" element={<OneProduct />} />
                  <Route path="/your-cart" element={<CartPage />} />
                  <Route path="/your-profile" element={<UserProfile />} />
                  <Route path="/search" element={<SearchPage />} />

                  {!user &&
                        <>
                              <Route path="/auth/login" element={<Login />} />
                              <Route path="/auth/register" element={<Register />} />
                        </>
                  }
            </Routes>
      )
}

export default Routing;