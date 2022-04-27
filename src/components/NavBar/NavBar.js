import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Button, Image } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { snackbar } from '../Toaster/Toaster';


export function Header(props){

    const history = useHistory();

    const handleSubmit = ()=>{

    history.push("/login");

    }

    const { isLoggedIn, userName, setLogin, setUser, setToken , setUserGlobal, setIsUserDetail, setDataRelative, setIsRelative } = useContext(UserContext);

    const logout = () => {
        setLogin(false);
        setUser(undefined);
        setToken(undefined);
        setIsUserDetail(false);
        setUserGlobal({})
        setDataRelative([]);
        setIsRelative(false);
        snackbar("notification","User logged out")
        history.push("/");
    }

    return(

        <Navbar bg="white" expand="lg" sticky= 'top' >
        <Container>
            <img src="/guvi.png" style={{width:250,height:50}} alt="image" />
            {/* <img src="/logo.png" alt="image" /> */}
            {!isLoggedIn ? (<Button className="signin-btn" onClick={() => history.push('/login')}>Login/Signup</Button>) : 
            <Button onClick={logout}  title="logout" style={{ backgroundColor: "transparent", border: "none", color: "red" }} >
            <Image src="/blankimage.webp" style={{width:50, height:50}} alt="image" rounded/></Button>}

        </Container>
    </Navbar>
    )
}
