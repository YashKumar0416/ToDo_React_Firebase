import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink} from "react-router-dom";
import Button from 'react-bootstrap/esm/Button';
import { useEffect } from 'react';
import { auth } from '../config/firebase';
import { useContext } from 'react';
import { Present } from '../App';
import { signOut } from 'firebase/auth';

function BasicExample() {

  let activeStyle = {
    textDecoration: "underline",
  }

  const {state, dispatch} = useContext(Present);

  useEffect(()=> {
    if(localStorage.getItem("authToken")) {
      dispatch({type: "PRESENT", payload: true})
    }
  }, []);

  const logoutUser = ()=> {
    try {
      signOut(auth);
      localStorage.removeItem("authToken");
      localStorage.removeItem("uid");
      dispatch({type: "PRESENT", paylaod: false})
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className=' fs-3 fw-bold fst-italic logo'>To-Do<span className='text-info fs-2'> App</span> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="ms-auto">
          <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link' to='/'><Button className='button btn-light fw-bold mx-1 text-primary'> Home </Button></NavLink>
          {state ? <>
              <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link mx-1' to='/messages'><Button className='button btn-light fw-bold text-primary'> Add ToDo </Button></NavLink>
              <NavLink className='link mx-1 text-danger' to='/' onClick={logoutUser}><Button className='button btn-light fw-bold text-danger'> Logout </Button></NavLink>
            </>
            :<>
            <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link' to='/signup'><Button className='button btn-light fw-bold mx-1 text-primary'> Sign Up </Button></NavLink>
            <NavLink style={({isActive})=> isActive ? activeStyle:undefined} className='link' to='/login'><Button className='button btn-light fw-bold mx-1 text-primary'> Login </Button></NavLink>
            </>
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;