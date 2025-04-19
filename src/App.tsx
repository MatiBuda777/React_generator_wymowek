import './App.css'
import ExcuseForm from "./ExcuseForm.tsx";
import ExcuseList from "./ExcuseList.tsx";
import {useState} from "react";

interface ExcuseProps {
    name: string;
    reason: string;
    credibility: number;
    date: string;
    creativity: string;
    info: string;
    isUrgent: boolean;
}

function App() {
    const [formData, setFormData] = useState<ExcuseProps | null>(null)

    const handleFormData = (data : ExcuseProps) => {
        console.log("Dane z formularza: ", data)
        setFormData(data)
    }


  return (
    <>
      <ExcuseForm sendForm={handleFormData}/>
        <ExcuseList formData={formData}/>
    </>
  )
}

export default App;