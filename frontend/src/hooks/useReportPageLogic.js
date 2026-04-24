import { useNavigate } from "react-router-dom";
import { useDashboardPageLogic } from "./useDashboardPageLogic";

export function useReportPageLogic() {
    const navigate = useNavigate();
    const dashboardLogic = useDashboardPageLogic();

    return {
        navigate,
        stats: dashboardLogic.stats,
        visitorsLast7Days: dashboardLogic.visitorsLast7Days,
        statusData: dashboardLogic.statusData,
        institutionData: dashboardLogic.institutionData,
        handleDownloadReport: dashboardLogic.handleDownloadReport,
        handleLogout: dashboardLogic.handleLogout,
    };
}
