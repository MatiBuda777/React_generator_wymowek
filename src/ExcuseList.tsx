import {useEffect, useState} from "react";
import "./ExcuseList.css"

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
    const [excuseHistory, setExcuseHistory] = useState<string[]>([]);

    useEffect(() => {
        if (!formData) {
            return;
        }
        const {name, reason, credibility, date, creativity, info, isUrgent} = formData;
        if (!name || !reason || !credibility || !date || !creativity) {
            setExcuse('Brak danych do wygenerowania wymówki.');
            return;
        }

        // Powód
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
                        ? 'Brzmi trochę sus'
                        : 'Chyba głupszej wymówki nie ma';
        let newExcuse = `
            ${name} ${reasonText} z powodu: ${reason}.
            Wydarzyło się to ${date}, a poziom kreatywności wymówki to: ${creativity}.
            ${info ? `Dodatkowe informacje: ${info}.` : ''}
            ${urgencyText}
            Ocena wiarygodności: ${credibility}/10. ${credibilityComment}
            `.trim();
        if (name.endsWith('a')) {
            newExcuse = newExcuse.replace('mógł', 'mogła');
        }
        setExcuse(newExcuse);
        setExcuseHistory(prev => [...prev, newExcuse]);
    }, [formData]);

    return (
        <>
            <h3>Najnowsza wymówka:</h3>
            <div className={"div_excuse"}>
                <p className={"p_excuse"} style={{ whiteSpace: 'pre-wrap' }}>{excuse}</p>
            </div>
            <h3>Wszystkie wymówki:</h3>
            {excuseHistory.map((excuse, index) => (
                <div className={"div_excuse"}><p key={index} className={"p_excuse"} style={{ whiteSpace: 'pre-wrap' }}>{excuse}</p></div>
            ))}
        </>
    )
}

export default ExcuseList;