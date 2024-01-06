import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import Modal from "../../../components/modals";
import dayjs from 'dayjs'
import useRejectCommentForm from "./rejectCommentForm";
import useApproveCommentForm from "./approveCommentForm";
   
function CardView({data,getTicket,ThreadForm,threadSaveFunction}) {
    const type=localStorage.getItem('type')
    const {rejectTicket,RejectCommentForm}=useRejectCommentForm({getTicket})
    const {approveTicket,ApproveCommentForm}=useApproveCommentForm({getTicket})

    return (
        <>
        {data &&
        <Card className="border-2 border-black h-full flex-grow">
        <header className="bg-green-600 text-white flex items-center justify-center py-4 rounded-lg">
        <Typography variant="h5">{data.title}</Typography>
        </header>
        <CardBody>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Date Created: {dayjs(data.date).format('DD/MM/YYYY, HH:mm:ss')}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            FROM: {data.TA}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            TO: {data.prof}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Student: {data.student.name}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Category: {data.category}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Severity: {data.severity}
          </Typography>
          <Typography>
           Details: {data.details}
          </Typography>
          <Typography variant="h6" color="blue-gray" className="mb-2 mt-3">
            Thread:
          </Typography>
          {data.thread.map((dat,idx)=>{
            return(
              <div key={idx}>
              <Typography variant="h6" color="blue-gray">
                From:{dat.by} Date:{dayjs(dat.date).format('DD/MM/YYYY, HH:mm:ss')}
              </Typography>
              <Typography>
                message: {dat.details}
              </Typography>
              </div>
            )
          })}
        </CardBody>
        
        <div className="flex justify-between mt-auto">
          <div className="h-full">
            <Modal 
            Body={ThreadForm} 
            title={"Create thread"} 
            saveFunction={threadSaveFunction} 
            id={data.id} 
            buttonName={'create thread'}
            />
          </div>
            {type==='Prof'&&
            <div className="flex">
              <Modal 
                color="bg-green-500"
                Body={ApproveCommentForm} 
                title={"Approve Ticket"} 
                saveFunction={approveTicket} 
                id={data.id} 
                buttonName={'Approve Ticket'}
              />
              <Modal 
                color="bg-red-500"
                Body={RejectCommentForm} 
                title={"Reject Ticket"} 
                saveFunction={rejectTicket} 
                id={data.id} 
                buttonName={"Reject Ticket"}
              />
            </div>  
            }
        </div>
        </Card>
        }
        {!data && 
            <Card className="w-96 border-2 border-black h-full flex-grow items-center justify-center">
            <Typography variant="h1" color="blue-gray" className="mb-2 ">
                No Tickets
            </Typography>
            </Card>
        }
        </>
    );
}

export default CardView