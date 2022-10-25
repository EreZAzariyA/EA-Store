import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/Home-Page";

const Routing = () => {
      return (
            <Routes>
                  <Route path="/" element={<HomePage />} />
            </Routes>
      )
}

export default Routing;