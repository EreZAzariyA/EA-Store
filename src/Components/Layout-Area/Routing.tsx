import { Route, Routes } from "react-router-dom";
import { CartPage } from "../Pages/Cart-Page";
import HomePage from "../Pages/Home-Page";
import { SearchPage } from "../Pages/Search-Page";
import { UserProfile } from "../Pages/User-Profile";

const Routing = () => {
      return (
            <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/your-cart" element={<CartPage />} />
                  <Route path="/your-profile" element={<UserProfile />} />
                  <Route path="/search" element={<SearchPage />} />
            </Routes>
      )
}

export default Routing;