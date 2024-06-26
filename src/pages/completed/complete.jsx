import client from "../../axios";
import { useEffect, useState } from "react";
import NavBar from "../../components/navBar";
import TaskListView from "./components/taskListView";
import TicketListView from "./components/ticketListView";
import { useIsAuthenticated } from "@azure/msal-react";

function Completed(){

    const [tasks, setTasks] = useState([]);
    const [screen, setScreen] = useState(true)
    const [tickets, setTickets] = useState([]);

    function setChange(){
        setScreen(prev=>!prev)
    }

    async function getTicket(){
        const request= await client.get('completedticket/')
        setTickets(request.data)
    }

    async function getTask(){
        const request= await client.get('completedtask/')
        setTasks(request.data)
    }
    const isAuthenticated = useIsAuthenticated();

    useEffect(()=>{
        Promise.all([
            getTask(),
            getTicket()
        ])
    },[])

    return(
        <div className="flex flex-col h-screen">
            <NavBar/>
            {
                screen ?
                <TicketListView items={tickets} header={'Ticket'} setChange={setChange} getTicket={getTicket}/>
                :
                <TaskListView items={tasks} header={'Tasks'} setChange={setChange} getTask={getTask}/>
            }
        </div>
    )
}

export default Completed;