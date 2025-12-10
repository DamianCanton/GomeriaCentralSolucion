import { Routes, Route } from "react-router-dom";
import { ReceptionDashboard } from "./views/ReceptionDashboard";
import { WorkshopDisplay } from "./views/WorkshopDisplay";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ReceptionDashboard />} />
      <Route path="/tv" element={<WorkshopDisplay />} />
    </Routes>
  );
}

export default App;
