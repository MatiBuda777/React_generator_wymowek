import {useState} from "react";
import "./ExcuseForm.css"

interface PropsExcuseForm {
    sendForm: (
        name: string,
        reason: string,
        credibility: number,
        date: string,
        creativity: string,
        additionalInfo: string,
        urgency: boolean
    ) => void,
}

const ExcuseForm = ({sendForm}: PropsExcuseForm) => {
    const [textName, setTextName] = useState<string>('')
    const [textReason, setTextReason] = useState<string>('brak powodu')
    const [credibleNum, setCredibleNum] = useState<number>(0)
    const [textDate, setTextDate] = useState<string>('kiedyś')
    const [textCreative, setTextCreative] = useState<string>('nie ustalona')
    const [textInfo, setTextInfo] = useState<string>('')
    const [isUrgent, setIsUrgent] = useState<boolean>(false)

    return (
        <div>
            <input type="text" placeholder={"Imię delikwenta"} value={textName}
                   onChange={(e) => setTextName(e.target.value)}
            />

            <br/>

            <select value={textReason} onChange={(e) => setTextReason(e.target.value)}>
                <option value="spóźnienie">Spóźnienie</option>
                <option value="brak książek">Brak książek</option>
                <option value="brak pracy domowej">Brak pracy domowej</option>
                <option value="nieznajomość tematu">Nieznajomość tematu</option>
            </select>

            <br/>

            <input type="range" min={0} max={10} value={credibleNum}
                   onChange={(e) => setCredibleNum(parseInt(e.target.value))}
            />

            <br/>

            <input type="date" value={textDate}
                   onChange={(e) => setTextDate(e.target.value)}
            />

            <br/>

            <select value={textCreative} onChange={(e) => setTextCreative(e.target.value)}>
                <option value="typowa wymówka">typowa wymówka</option>
                <option value="słaba">słaba</option>
                <option value="przeciętna">przeciętna</option>
                <option value="duża">duża</option>
                <option value="bardzo duża">bardzo duża</option>
            </select>

            <br/>

            <textarea placeholder="Miejsce na dodatkowe informacje" value={textInfo}
                      onChange={(e) => setTextInfo(e.target.value)}
            />

            <br/>

            <label>
                <input type="checkbox" checked={isUrgent}
                          onChange={(e) => setIsUrgent((e.target.checked))}
                />
                Pilne
            </label>


            <br/>

            <button
                onClick={() => sendForm(textName, textReason, credibleNum, textDate, textCreative, textInfo, isUrgent)}
            >
                Wygeneruj wymówkę
            </button>
        </div>
    )
}

export default ExcuseForm;