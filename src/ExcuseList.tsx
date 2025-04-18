import {useState} from "react";

interface ExcuseListProps {
    formData : {
        name :string;
        reason :string;
        credibility :number;
        date :string;
        creativity :string;
        info :string;
        urgent :boolean;
    }
}

const ExcuseList = ({formData} : ExcuseListProps) => {
    const [excuse, setExcuse] = useState<string>('Brak wymówki');
    const [excuseList, setExcuseList] = useState<string[]>([]);

    const generateExcuse = () => {
        const { name, reason, credibility, date, creativity, info, urgent } = formData

        if (!name) return <p>Brak danych do wygenerowania wymówki.</p>

        const urgencyText = urgent ? 'To było naprawdę pilne!' : 'Sprawa nie była aż tak pilna.'
        const credibilityComment =
            credibility >= 8
                ? 'Brzmi bardzo wiarygodnie.'
                : credibility >= 4
                    ? 'Może przejdzie.'
                    : 'Brzmi trochę podejrzanie...'

        let newExcuse = `
            ${name} nie mógł się pojawić z powodu: ${reason}.
            Wydarzyło się to ${date}, a poziom kreatywności wymówki to: ${creativity}.
            ${info ? `Dodatkowe informacje: ${info}.` : ''}
            ${urgencyText}
            Ocena wiarygodności: ${credibility}/10. ${credibilityComment}
        `.trim()

        if (name.endsWith('a')) {
            newExcuse = newExcuse.replace('mógł', 'mogła')
        }


        setExcuseList(prevList => [...prevList, newExcuse])
        setExcuse(newExcuse)
    }

    return (
        <div>
            <h1>Generator Wymówek</h1>
            <br />
            <h2>Wygenerowane wymówki:</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>{excuse}</p>

            {excuseList.map((excuse, index) => (
                <p key={index} style={{ whiteSpace: 'pre-wrap' }}>{excuse}</p>
            ))}
        </div>
    )
}

export default ExcuseList;