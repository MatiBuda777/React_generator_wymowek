import './App.css'
import ExcuseForm from "./ExcuseForm.tsx";
import ExcuseList from "./ExcuseList.tsx";
import {useState} from "react";

function App() {
    const [formData, setFormData] = useState({
        name: '',
        reason: '',
        credibility: 0,
        date: '',
        creativity: '',
        extraInfo: '',
        urgent: false
    })

    const handleFormData = (formData : {
        name :string;
        reason :string;
        credibility :number;
        date :string;
        creativity :string;
        info :string;
        urgent :boolean;
    }) => {
        console.log("Dane z formularza: ", formData)
    }

  return (
    <>
      <ExcuseForm sendForm={handleFormData}/>
        <ExcuseList formData={formData}/>
    </>
  )
}

export default App
