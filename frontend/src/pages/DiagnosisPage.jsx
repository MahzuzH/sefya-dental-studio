import { useEffect, useState } from "react";
import ToothMap from "../components/ToothMap";
import DiseaseSelect from "../components/DiseaseSelect";
import DiagnosisList from "../components/DiagnosisList";
import { getDiseases } from "../services/diseaseService";

export default function DiagnosisPage() {
    const [diseases, setDiseases] = useState([]);
    const [selectedTooth, setSelectedTooth] = useState(null);
    const [selectedDisease, setSelectedDisease] = useState("");
    const [diagnosis, setDiagnosis] = useState({});

    useEffect(() => {
        getDiseases().then(setDiseases);
    }, []);

    const assignDisease = () => {
        if (!selectedTooth || !selectedDisease) return;

        const diseaseObj = diseases.find((d) => d.id == selectedDisease);

        setDiagnosis({
            ...diagnosis,
            [selectedTooth]: diseaseObj,
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>🦷 Diagnosis Page</h1>

            <ToothMap
                diagnosis={diagnosis}
                selectedTooth={selectedTooth}
                setSelectedTooth={setSelectedTooth}
            />

            <DiseaseSelect
                diseases={diseases}
                selectedDisease={selectedDisease}
                setSelectedDisease={setSelectedDisease}
                onApply={assignDisease}
            />

            <DiagnosisList diagnosis={diagnosis} />
        </div>
    );
}
