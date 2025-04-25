import {useState} from "react";
import "./ExcuseForm.css"
import * as React from "react";

interface ExcuseData {
    name: string;
    reason: string;
    credibility: number;
    date: string;
    creativity: string;
    info: string;
    isUrgent: boolean;
}

interface PropsExcuseForm {
    sendForm: (formData : ExcuseData) => void,
}

const ExcuseForm = ({sendForm}: PropsExcuseForm) => {
    const [formData, setFormData] = useState<ExcuseData>({
            name: "",
            reason: "",
            credibility: 0,
            date: "",
            creativity: "",
            info: "",
            isUrgent: false
        }
    )

    const handleChange = (field: keyof ExcuseData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendForm(formData)
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Generator wymówek</h2>

                <pre>Imię:</pre>
                <input type="text" placeholder={"Imię delikwenta"} value={formData.name}
                       onChange={(e) => handleChange("name", e.target.value)}
                />

                <br/>

                <pre>Powód wymówki:</pre>
                <select value={formData.reason} defaultValue={"Default"} onChange={(e) => handleChange("reason", e.target.value)}>
                    <option value={"Default"} hidden={true}>Wybierz opcję</option>
                    <option value="spóźnienie">Spóźnienie</option>
                    <option value="brak książek">Brak książek</option>
                    <option value="brak pracy domowej">Brak pracy domowej</option>
                    <option value="nieznajomość tematu">Nieznajomość tematu</option>
                </select>

                <br/>

                <pre>Wiarygodność: {formData.credibility}</pre>
                <input type="range" min={0} max={10} value={formData.credibility}
                       onChange={(e) => handleChange("credibility", parseInt(e.target.value))}
                />

                <br/>

                <pre>Data wydarzenia:</pre>
                <input type="date" value={formData.date}
                       onChange={(e) => handleChange("date", e.target.value)}
                />

                <br/>

                <pre>Kreatywność wymówki:</pre>
                <select value={formData.creativity} defaultValue={"Default"} onChange={(e) => handleChange("creativity", e.target.value)}>
                    <option value={"Default"} hidden={true}>Wybierz opcję</option>
                    <option value="typowa wymówka">typowa wymówka</option>
                    <option value="słaba">słaba</option>
                    <option value="przeciętna">przeciętna</option>
                    <option value="duża">duża</option>
                    <option value="bardzo duża">bardzo duża</option>
                </select>

                <br/>

                <pre>Wyjaśnienie:</pre>
                <textarea placeholder="Miejsce na dodatkowe informacje" value={formData.info}
                          onChange={(e) => handleChange("info", e.target.value)}
                />

                <br/>

                <label>
                    <input type="checkbox" checked={formData.isUrgent}
                           onChange={(e) => handleChange("isUrgent", e.target.checked)}
                    />
                    Pilne
                </label>

                <br/>

                <button type={"submit"}>
                    Wygeneruj wymówkę
                </button>
            </form>
        </>

    )
}

export default ExcuseForm;