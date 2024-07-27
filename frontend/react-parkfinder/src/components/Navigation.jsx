import React from "react";
// import "./NavBar.css";
import { Link,NavLink, useNavigate } from "react-router-dom";
import './Navigation.css';
// import { Navbar, Nav, NavItem, NavbarBrand } from "reactstrap";


// function Navigation() {

    // const navigate = useNavigate();

    // const handleLogout = () => {
    //     setToken('');
    //     setUser(null);
    //     navigate("/");
    // }

    
      
        function Navigation({user, setToken, setUser}) {

         const navigate = useNavigate();
         
         const handleLogout =() =>{
          setToken('');
          setUser(null);
          console.log("logged out")
          navigate("/")
         }

         function loggedInNav(){
          return(             
              <ul className="navbar-nav ml-auto">
                <li className="nav-right">
                  <NavLink className="nav-link parkfinder-link" to="/">
                    Parkfinder
                  </NavLink>
                </li>
                
                <li className="nav-right">
                  <NavLink className="nav-link" to="/parks">
                    Parks
                  </NavLink>
                </li>                 
                
                <li className="nav-right">
                  <NavLink className="nav-link" to={`/users/${user.username}/favorites`}>
                    Favorites
                  </NavLink>
                </li>                 
                
                <li className="nav-right">
                  <NavLink className="nav-link" to="/reviews">
                    See Reviews
                  </NavLink>
                </li>                 
                <li className="nav-right">
                  <NavLink className="nav-link" to={`/users/${user.username}/saved-items`}>
                    Saved Items
                  </NavLink>
                </li>                 
                <li className="nav-right">
                  <NavLink className="nav-link" to={`/users/${user.username}/profile`}>
                    Profile
                  </NavLink>
                </li>
           
                {/* <li className="nav-right">
                  <NavLink className="nav-link" to="/signup">
                    Signup
                  </NavLink>
                </li>                 */}
                <li className="nav-right">
                  <Link className="nav-link" to="/" onClick={handleLogout} >                                  
                    Log out {user.first_name || user.username}
                    {/* Log out */}
                  </Link>
                </li>
                
              </ul>
          );
          
         }

         function loggedOutNav() {
          return (
              <ul className="navbar-nav ml-auto">
                <li className="nav-right">
                  <NavLink className="nav-link parkfinder-link" to="/">
                    Parkfinder
                  </NavLink>
                </li>
                <li className="nav-right">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-right">
                  <NavLink className="nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
              </ul>
          );
        }

      //   return (
      //     <nav className="Navigation navbar navbar-expand-md">
      //       <NavLink className="home-nav-link" to="/">
      //         Parkfinder
      //       </NavLink>
      //       {user ? loggedInNav() : loggedOutNav()}
      //     </nav>
      // );
    
        return(<div>
          {user ? loggedInNav() : loggedOutNav()}
        </div>)
    }    
    
      export default Navigation;

  







