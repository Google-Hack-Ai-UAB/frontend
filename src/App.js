import ProtectedRoute from "./components/Common/ProtectedRoute";
import { Router, Routes, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/Common/Homepage";

const App = () => (
  <Routes>
    <ProtectedRoute path="/" component={Homepage} />
  </Routes>
);

export default App;
