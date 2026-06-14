import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const PublicReportPage = lazy(() => import("./pages/PublicReportPage"));
const PemeriksaanPage = lazy(() => import("./pages/PemeriksaanPage"));
const ReportPage = lazy(() => import("./pages/ReportPage"));
const PatientPage = lazy(() => import("./pages/PatientPage"));
const TambahPemeriksaanPage = lazy(() => import("./pages/TambahPemeriksaanPage"));
const TambahPasienPage = lazy(() => import("./pages/TambahPasienPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-white" />}>
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
