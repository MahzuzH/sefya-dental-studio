import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import PublicReportPage from "./pages/PublicReportPage";
import PemeriksaanPage from "./pages/PemeriksaanPage";
import ReportPage from "./pages/ReportPage";
import PatientPage from "./pages/PatientPage";
import TambahPemeriksaanPage from "./pages/TambahPemeriksaanPage";
import TambahPasienPage from "./pages/TambahPasienPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pemeriksaan" element={<PemeriksaanPage />} />
        <Route path="/pemeriksaan/baru" element={<TambahPemeriksaanPage />} />
        <Route
          path="/pemeriksaan/:id/edit"
          element={<TambahPemeriksaanPage />}
        />
        <Route path="/pasien" element={<PatientPage />} />
        <Route path="/pasien/baru" element={<TambahPasienPage />} />
        <Route path="/pasien/:id/edit" element={<TambahPasienPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/report/:id" element={<PublicReportPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
