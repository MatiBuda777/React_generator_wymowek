import { useEffect, useState } from "react";
import "./ExcuseList.css";

interface ExcuseListProps {
    formData: {
        name: string;
        reason: string;
        credibility: number;
        date: string;
        creativity: string;
        info: string;
        isUrgent: boolean;
    } | null;
}

const ExcuseList = ({ formData }: ExcuseListProps) => {
    const [excuse, setExcuse] = useState<string>("Brak wymówki");
    const [excuseData, setExcuseData] = useState<string[][]>([]);
    const [excuseHistory, setExcuseHistory] = useState<string[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingData, setEditingData] = useState<ExcuseListProps["formData"]>(null);

    useEffect(() => {
        if (formData) {
            generateExcuse(formData);
        }
        console.log(excuse);
        console.log(excuseData)
        console.log(excuseHistory)
    }, [formData]);

    function generateExcuse(data: ExcuseListProps["formData"], index: number | null = null) {
        if (!data) return "";

        const { name, reason, credibility, date, creativity, info, isUrgent } = data;

        if (!name || !reason || !credibility || !date || !creativity) {
            return "Brak danych do wygenerowania wymówki.";
        }

        let reasonText = "";
        switch (reason) {
            case "spóźnienie":
                reasonText = name.endsWith("a") ? "nie mogła się pojawić" : "nie mógł się pojawić";
                break;
            case "brak książek":
                reasonText = name.endsWith("a") ? "nie miała książek" : "nie miał książek";
                break;
            case "brak pracy domowej":
                reasonText = name.endsWith("a") ? "nie zrobiła pracy domowej" : "nie zrobił pracy domowej";
                break;
            case "nieznajomość tematu":
                reasonText = name.endsWith("a") ? "nie znała tematu" : "nie znał tematu";
                break;
        }

        const urgencyText = isUrgent ? "To było naprawdę pilne!" : "Nie było to pilne.";
        const credibilityComment =
            credibility >= 8 ? "Brzmi bardzo wiarygodnie." :
                credibility >= 5 ? "Może przejdzie." :
                    credibility >= 1 ? "Brzmi podejrzanie" :
                        "Chyba głupszej wymówki nie ma";

        const excuseString = `${name} ${reasonText}. Wydarzyło się to ${date}, a poziom kreatywności wymówki to: ${creativity}. ${info ? `Dodatkowe informacje: ${info}.` : ""} ${urgencyText} Ocena wiarygodności: ${credibility}/10. ${credibilityComment}`.trim();

        // Jeśli edytujemy wymówkę, zastąp poprzednią wersję
        if (index !== null) {
            setExcuseHistory(prev => {
                const updatedHistory = [...prev];
                updatedHistory[index] = excuseString;
                return updatedHistory;
            });

            setExcuseData(prev => {
                const updatedData = [...prev];
                updatedData[index] = [index.toString(), name, reason, credibility.toString(), date, creativity, info, isUrgent.toString()];
                return updatedData;
            });
        } else {
            // Nowa wymówka - dodaj do historii
            setExcuseHistory(prev => [...prev, excuseString]);
            setExcuseData(prev => [...prev, [excuseHistory.length.toString(), name, reason, credibility.toString(), date, creativity, info, isUrgent.toString()]]);
        }

        setExcuse(excuseString);
        return excuseString;
    }



    function EditExcuse() {
        if (!editingData) return null;

        console.log(editingIndex);
        console.log(editingData);

        return (
            <div>
                <h3>Edytowanie wymówki:</h3>
                <input
                    type="text"
                    value={editingData.name}
                    onChange={(e) => setEditingData(prev => ({ ...prev!, name: e.target.value }))}
                />

                <select
                    value={editingData.reason}
                    onChange={(e) => setEditingData(prev => ({ ...prev!, reason: e.target.value }))}
                >
                    <option hidden={true}>Wybierz opcję</option>
                    <option value="spóźnienie">Spóźnienie</option>
                    <option value="brak książek">Brak książek</option>
                    <option value="brak pracy domowej">Brak pracy domowej</option>
                    <option value="nieznajomość tematu">Nieznajomość tematu</option>
                </select>

                <input
                    type="range"
                    min={0}
                    max={10}
                    value={editingData.credibility}
                    onChange={(e) => setEditingData(prev => ({ ...prev!, credibility: parseInt(e.target.value) }))}
                />

                <input
                    type="date"
                    value={editingData.date}
                    onChange={(e) => setEditingData(prev => ({ ...prev!, date: e.target.value }))}
                />

                <select
                    value={editingData.creativity}
                    onChange={(e) => setEditingData(prev => ({ ...prev!, creativity: e.target.value }))}
                >
                    <option hidden={true}>Wybierz opcję</option>
                    <option value="typowa wymówka">typowa wymówka</option>
                    <option value="słaba">słaba</option>
                    <option value="przeciętna">przeciętna</option>
                    <option value="duża">duża</option>
                    <option value="bardzo duża">bardzo duża</option>
                </select>

                <textarea
                    placeholder="Miejsce na dodatkowe informacje"
                    value={editingData.info}
                    onChange={(e) => setEditingData(prev => ({ ...prev!, info: e.target.value }))}
                />

                <label>
                    <input
                        type="checkbox"
                        checked={editingData.isUrgent}
                        onChange={(e) => setEditingData(prev => ({ ...prev!, isUrgent: e.target.checked }))}
                    />
                    Pilne
                </label>

                <button onClick={saveChanges}>Zapisz</button>
            </div>
        );
    }



    function saveChanges() {
        if (editingIndex !== null && editingData) {
            generateExcuse(editingData, editingIndex);
            setEditingIndex(null);
            setEditingData(null);
        }
    }


    function handleExcuseClick(index: number) {
        setEditingData(formData);
        setEditingIndex(index);
    }

    return (
        <>
            <h3>Najnowsza wymówka:</h3>
            <div className="div_excuse">
                <p className="p_excuse" style={{ whiteSpace: "pre-wrap" }}>{excuse}</p>
            </div>

            {editingIndex !== null && <EditExcuse />}

            <h3>Wszystkie wymówki:</h3>
            {excuseHistory.map((excuse, index) => (
                <div className="div_excuse" key={index}>
                    <p className="p_excuse" onClick={() => handleExcuseClick(index)} style={{ whiteSpace: "pre-wrap" }}>{excuse}</p>
                </div>
            ))}
        </>
    );
};

export default ExcuseList;