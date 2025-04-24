import {useEffect, useState} from "react";
import "./ExcuseList.css"
import * as React from "react";

interface ExcuseListProps {
    formData : {
        name: string;
        reason: string;
        credibility: number;
        date: string;
        creativity: string;
        info: string;
        isUrgent: boolean;
    } | null
}

const ExcuseList = ({formData} : ExcuseListProps) => {
    const [excuse, setExcuse] = useState<string>('Brak wymówki');
    const [excuseData, setExcuseData] = useState<string[]>([]);
    const [excuseHistory, setExcuseHistory] = useState<string[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingData, setEditingData] = useState<ExcuseListProps['formData']>(null);

    useEffect(() => {generateExcuse()});

    function generateExcuse(data = formData) {
        if (!data) {
            return;
        }
        
        const {name, reason, credibility, date, creativity, info, isUrgent} = data;
        const index = excuseHistory.length;
        setExcuseData( [index.toString(), name, reason, credibility.toString(), date, creativity, info, isUrgent.toString()])
        if (!name || !reason || !credibility || !date || !creativity) {
            setExcuse('Brak danych do wygenerowania wymówki.');
            return;
        }

        // Tutaj napisałem sobie komentarz
        let reasonText = '';
        switch (reason) {
            case "spóźnienie":
                if (name.endsWith('a')) reasonText = 'nie mogła się pojawić';
                else reasonText = 'nie mógł się pojawić';
                break;

            case "brak książek":
                if (name.endsWith('a')) reasonText = 'nie miała książek';
                else reasonText = 'nie miał książek';
                break;

            case "brak pracy domowej":
                if (name.endsWith('a')) reasonText = 'nie zrobiła pracy domowej';
                else reasonText = 'nie zrobił pracy domowej';
                break;

            case "nieznajomość tematu":
                if (name.endsWith('a')) reasonText = 'nie znała tematu';
                else reasonText = 'nie znał tematu';
                break;
        }
        const urgencyText = isUrgent ? 'To było naprawdę pilne!' : 'Nie było to pilne.';
        const credibilityComment =
            credibility >= 8
                ? 'Brzmi bardzo wiarygodnie.'
                : credibility >= 5
                    ? 'Może przejdzie.'
                    : credibility >= 1
                        ? 'Brzmi podejrzanie'
                        : 'Chyba głupszej wymówki nie ma';

        const newExcuse = `
            ${name} ${reasonText}.
            Wydarzyło się to ${date}, a poziom kreatywności wymówki to: ${creativity}.
            ${info ? `Dodatkowe informacje: ${info}.` : ''}
            ${urgencyText}
            Ocena wiarygodności: ${credibility}/10. ${credibilityComment}
            `.trim();
        setExcuse(newExcuse);
        setExcuseHistory(prev => [...prev, newExcuse]);

        return newExcuse;
    }

    function EditExcuse() {
        if (!editingData) return null;

        return (
            <div>
                <h3>Edytowanie wymówki:</h3>
                <input
                    type="text"
                    value={editingData.name}
                    onChange={(e) => setEditingData({...editingData, name: e.target.value})}
                />
                <select
                    value={editingData.reason}
                    onChange={(e) => setEditingData({...editingData, reason: e.target.value})}
                >
                    <option value="spóźnienie">Spóźnienie</option>
                    <option value="brak książek">Brak książek</option>
                    <option value="brak pracy domowej">Brak pracy domowej</option>
                    <option value="nieznajomość tematu">Nieznajomość tematu</option>
                </select>
                <input
                    type="number"
                    value={editingData.credibility}
                    onChange={(e) => setEditingData({...editingData, credibility: parseInt(e.target.value)})}
                />
                {/* Dodaj pozostałe pola */}
                <button onClick={saveChanges}>Zapisz</button>
            </div>
        );
    }


    function saveChanges() {
        if (editingIndex !== null && editingData) {
            const updatedExcuse = generateExcuse(editingData); // Musisz zaimplementować tę funkcję
            setExcuseHistory(prev => {
                const updatedHistory = [...prev];
                updatedHistory[editingIndex] = updatedExcuse;
                return updatedHistory;
            });
            setEditingIndex(null);
            setEditingData(null);
        }
    }

    function handleExcuseClick(index) {
        function parseExcuse(excuse: string) {

            return {
                name: 'Jan Kowalski',
                reason: 'spóźnienie',
                credibility: 8,
                date: '2023-01-01',
                creativity: 'duża',
                info: 'Brak dodatkowych informacji.',
                isUrgent: false
            };
        }

        const parsedData = parseExcuse(excuseHistory[index]); // Implementuj funkcję parseExcuse
        setEditingData(parsedData);
        setEditingIndex(index);
    }


    return (
        <>
            <h3>Najnowsza wymówka:</h3>
            <div className={"div_excuse"}>
                <p className={"p_excuse"} style={{ whiteSpace: 'pre-wrap' }}>
                    {excuse}
                </p>
            </div>
            <h3>Wszystkie wymówki:</h3>
            {excuseHistory.map((excuse, index) => (
                <div className={"div_excuse"} key={index}>
                    <p className={"p_excuse"} onClick={() => handleExcuseClick(index)} style={{ whiteSpace: 'pre-wrap' }}>
                        {excuse}
                    </p>
                </div>
            ))}
            {editingIndex !== null && <EditExcuse />}
        </>
    )
}

export default ExcuseList;