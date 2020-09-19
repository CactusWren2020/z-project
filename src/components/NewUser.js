import React from "react";
import { Link } from "react-router-dom";
 
class NewUser extends React.Component {
    state = { 
        username: "", password: ""
    }
    getUsername = (e) => {
        this.setState( {username: e} );
    }
    getPassword = (e) => {
        this.setState( {password: e} );
    }
    
    render() {
        return ( 
        <form className="container" onSubmit={(e) => this.props.createNewUser(this.state.username, this.state.password, e)} >
            <h1>Sign Up to Contribute!</h1>
            <p>
                Or go {<Link to="/login">here</Link>} if you already have an account
            </p>
            <p>
                <input 
                    type="email" 
                    name="username"
                    onChange={(e) => this.getUsername(e.target.value)}
                />
                <label htmlFor="username">Enter your email to be your username</label>
            </p>
            <p>
                <input 
                    type="password" 
                    name="password"
                    onChange={(e) => this.getPassword(e.target.value)}
                />
                <label htmlFor="password">Choose a password</label>
            </p>
            <button type="submit">Submit</button>
        </form>
        )
    }
}

export default NewUser;
