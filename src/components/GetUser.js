import React from "react";
import firebase from "firebase";

class GetUser extends React.Component {
state = {
    username: ""
}
getUsername = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then((idToken) => {
        console.log(idToken)
        // admin.auth().verifyIdToken(idToken)
        // .then((decodedToken) => {
        //     let uid = decodedToken.uid;
        //     console.log(uid);
        })

    
    .catch((err) => console.error(err)); 
}
    render() {
        return ( 
        <>
            <p>Username: {this.state.username}</p>
            <button onClick={this.getUsername}>Get Username</button> 
        </>
        );
    }
        
}

export default GetUser;
