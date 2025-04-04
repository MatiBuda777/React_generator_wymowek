import {useState} from "react";

interface PropsExcuseForm {
    name : string;
    reason : string;
    credibility: number;
    date : string;
    creativity : string;
    additionalInfo : string;
    urgency : boolean;
}

const ExcuseForm = ({name, reason, credibility, date, creativity, additionalInfo, urgency} : PropsExcuseForm) => {
    const [textName, setTextName] = useState<string>('')
    const [textReason, setTextReason] = useState<string>('brak powodu')
    const [credibleNum, setCredibleNum] = useState<number>()
    const [textDate, setTextDate] = useState<string>('')
    const [textCreative, setTextCreative] = useState<string>('')
    const [textInfo, setTextInfo] = useState<string>('')
    const [isUrgent, setIsUrgent] = useState<boolean>(false)

    return (
        <>
            <input type="text" value={textName} onChange={(e) => {e.target.value}}/>

            <select value={textReason}>
                <option value="spóźnienie"></option>
                <option value="brak książek"></option>
                <option value="brak pracy domowej"></option>
                <option value="nieznajomość tematu"></option>
            </select>

            <input type="range" value={credibleNum}/>

            <input type="date" value={textDate}/>

            <select value={textCreative}>
                <option value="typowa wymówka"></option>
                <option value="słaba"></option>
                <option value="przeciętna"></option>
                <option value="duża"></option>
                <option value="bardzo duża"></option>
            </select>

            <textarea value={textInfo} />

            {/*<input type="checkbox" value={isUrgent}/>*/}
        </>
    )
}

export default ExcuseForm