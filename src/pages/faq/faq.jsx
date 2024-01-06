import client from "../../axios";
import react, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../../components/navBar";
import ListView from "./components/listView";

function FAQ(){

    const [inputs, setInputs] = useState({});
    const [tasks, setTasks] = useState([]);
    const [formErrors, setFormErrors] = useState({});

    const validate = (values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Title is required";
        } 
        if (!values.details) {
            errors.details = "Detail is required!";
        } 
        return errors;
      };

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }

    async function getFaq(){
        const request= await client.get('faq/')
        console.log(request.data)
        setTasks(request.data)
    }

    const handleSubmit = async (event) =>{
        const errors = validate(inputs)
        if(Object.keys(errors).length === 0){
            await client.post('faq/',{...inputs})
            setInputs({})
            getFaq()
            setFormErrors({})
            return true
        } else{
            setFormErrors(errors);
            return false
        }
    }

    useEffect(()=>{
        getFaq()
    },[])

    function Form(){
        return(
            <form className="w-full">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
                        Title
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="" onChange={handleChange} name="title" value={inputs.title || ""}/>
                    <h6 className="text-red-500 text-lg">{formErrors.title}</h6>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-detail">
                        Detail
                    </label>
                    <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-detail" placeholder="" onChange={handleChange} name="details" value={inputs.details || ""}/>
                    <h6 className="text-red-500 text-lg">{formErrors.details}</h6>
                    </div>
                </div>
                </form>
        )
    }



    return(
        <div className="flex flex-col h-screen">
            <NavBar/>
            <ListView items={tasks} header={'FAQs'} getFaq={getFaq} Form={Form} saveFunction={handleSubmit}/>
        </div>
    )
}

export default FAQ;