import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboardPageLogic } from "./useDashboardPageLogic";

export function usePemeriksaanPageLogic() {
  const navigate = useNavigate();
  const dashboardLogic = useDashboardPageLogic();

  const [selectedExam, setSelectedExam] = useState(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleViewReport = (id) => {
    navigate(`/report/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/pemeriksaan/${id}/edit`);
  };

  const handleOpenQR = (exam) => {
    setSelectedExam(exam);
    setIsQRModalOpen(true);
  };

  const qrUrl = selectedExam
    ? `${window.location.origin}/report/${selectedExam.token || selectedExam.id}`
    : "";

  return {
    navigate,
    ...dashboardLogic,
    selectedExam,
    isQRModalOpen,
    setIsQRModalOpen,
    handleViewReport,
    handleEdit,
    handleOpenQR,
    qrUrl,
  };
}
