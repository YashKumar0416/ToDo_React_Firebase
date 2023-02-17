import React, { useContext, useEffect, useState } from 'react';
import { db} from '../config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Present } from '../App'

const Messages = () => {

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [id] = useState(localStorage.getItem("uid"));
    const messagesRef = collection(db, "to_do");
    const [update, setUpdate] = useState(false);
    const [updatedMessage, setUpdatedMessage] = useState({id: '', message: ''})
    const {state, dispatch} = useContext(Present);

    const saveData = async (e)=> {
        e.preventDefault();

        if(inputMessage === "") {
            return;
        }
        try {
            await addDoc(messagesRef, {id: id, message: inputMessage})
            getMessages();
            setInputMessage('')
        } catch (error) {
            console.log(error)
        }
    };

    const getMessages = async ()=> {
        try {
            const qeryRef = query(collection(db, "to_do"), where("id", "==", id))
            const res = await getDocs(qeryRef);
            const filteredData = res.docs.map((doc)=> ({
                ...doc.data(),
                id: doc.id,
            }));
            setMessages(filteredData)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMessage = async (id)=> {
        try {
            const messageDoc = doc(db, 'to_do', id)
            await deleteDoc(messageDoc);
            getMessages();
        } catch (error) {
            console.log(error)
        }
    };

    const changeMessage = (id, message)=> {
        setInputMessage(message);
        setUpdatedMessage({id: id, message: message})
        setUpdate(true)
    };

    const updateMessage = async ()=> {
        const {id} = updatedMessage;
        if(inputMessage === "") {
            return
        }
        try {
            const messageDoc = doc(db, 'to_do', id)
            await updateDoc(messageDoc,{message: inputMessage} )
            setUpdatedMessage({id: '', message: ''})
            setUpdate(false)
            getMessages();
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(()=> {
        if(localStorage.getItem("authToken")) {
            dispatch({type: "PRESENT", payload: true})
        }
        getMessages();
    }, []);

  return (
    <>
        {state ? 
            <div className='main_container mt-5'>
                <h1 className='mb-3'>Add To Do Items</h1>
                <div className='border border-info rounded container text-center w-50 p-3'>
                <Form>
                <Form.Group className="m-3" controlId="formBasicEmail">
                    <Form.Control className='text_input' type="text" required={true} onChange={(e)=> setInputMessage(e.target.value)} value={inputMessage} placeholder="Enter Message" />
                </Form.Group>
                {update ?<Button className='w-50 m-2 fw-bold' variant='outline-primary' onClick={()=> updateMessage()}> Update </Button> :
                 <Button className='w-50 m-2 fw-bold' variant='outline-primary'  onClick={saveData}> Add </Button>}
                </Form>
                {messages !== [] ?
                    <>
                    {messages.map((value, index)=> {
                    return (
                    <div key={index} className='border-bottom border-info mt-3 d-flex justify-content-between align-items-center m-2'>
                        <div><h4>{value.message}</h4></div>
                        <div className='d-flex justify-content-between w-25 p-1'>
                            <Button variant='outline-danger fw-bold p-2' onClick={()=> {deleteMessage(value.id)}}> Delete </Button>
                            <Button variant='outline-success fw-bold p-2' onClick={()=> {changeMessage(value.id, value.message)}} > Update </Button>
                        </div>
                    </div>)
                    })}
                    </>
                    :<h4>No Messages to show</h4>}
                </div>
            </div>
        : <div className="main_container mt-5"><h1>Login Required</h1></div>
            }
    </>
  )
}

export default Messages;