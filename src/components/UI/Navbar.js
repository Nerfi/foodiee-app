import React,{useState,useContext} from  'react';
import { UserContext} from '../../AuthContext/AuthContext';
import {Navbar, Nav} from 'react-bootstrap';
import {firebase} from '../../firebase/firebase';
import {useHistory} from 'react-router-dom';


function NavbarFood() {

  const {user, logOut} = useContext(UserContext);
  const history  = useHistory();
  const [error, setError] = useState(null);


  const signOut = async () => {

    try {
     await logOut();
     history.push("/");

    } catch(error){
      setError(error.message)
    }
  }

  return(
   <Navbar className="navbar" fixed="top" bg="light">
    <Navbar.Brand href="/"><span style={{color: '#ff0157'}}>F</span>oodied </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text >
      {user ? `${user?.displayName}` : ""}
      </Navbar.Text>

    {
      user ? <div>
       <Navbar.Text  onClick={signOut} style={{cursor: 'pointer'}}>
      Signout
     </Navbar.Text>

     <Navbar.Text  onClick={() => history.push("/dashboard")} style={{cursor: 'pointer'}}>
       Profile
     </Navbar.Text>
     </div>
      :
       <Navbar.Text onClick={() =>  history.push('/login') } style={{cursor: 'pointer'}}>
       login
      </Navbar.Text>
    }


  </Navbar.Collapse>
</Navbar>

  );
};


export  default NavbarFood;
