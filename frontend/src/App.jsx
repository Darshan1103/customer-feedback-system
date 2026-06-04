import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CustomerFeedback from "./pages/CustomerFeedback";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/feedback" element={<CustomerFeedback />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route
          path="*"
          element={<Navigate to="/feedback" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;