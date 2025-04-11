import './App.css'
import ExcuseForm from "./ExcuseForm.tsx";

function App() {
  //const [count, setCount] = useState(0)

    function getFormData(formData : {
        name :string;
        reason :string;
        credibility :number;
        date :string;
        creativity :string;
        info :string;
        urgent :boolean;
    }) {
        console.log("Dane z formularza: ", formData)
    }

  return (
    <>
      <ExcuseForm sendForm={getFormData}/>
    </>
  )
}

export default App
