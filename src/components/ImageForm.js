import React from "react";
import firebase from "firebase";

class ImageForm extends React.Component {
    state = {    //put reference to uploaded img in state
        fileName: ""
    }
    imageUpload = (e) => {
        e.preventDefault();
        const file = e.target.elements.imageUpload.files[0];
        const storageRef = firebase.storage().ref("images/" + file.name);
        const task = storageRef.put(file);
        task.on("state_changed",
            (snapshot) => {   //info to make a progress bar
                var percentage = (snapshot.bytesTransferred /
                snapshot.totalBytes)  * 100;
                console.log(percentage)
            },
            (err) => { console.error(err); },
            () => {
                console.log("file is uploaded!");
                storageRef.getDownloadURL().then(fileURL =>  { 
                    console.log(fileURL)
                    this.setState({fileName: fileURL})
                    }
                );  
            }, 
        );   
        
       
    }
    render() {
        return (
            <form className="container" onSubmit={(e) => this.imageUpload(e)}>    
                <p>
                    {!this.state.fileName && <input type="file" 
                            name="imageUpload" 
                            className="file-upload" 
                            accept="image/*"    
                        />}
                </p>
                 <p>
                    {!this.state.fileName && <button type="submit">Submit</button>}
                </p>
                    <img src={this.state.fileName} className="img" alt="image" />
                {/* uses state value to display pic */ }
            </form>
        )
    }
}

export default ImageForm;


// <p>
// <label htmlFor="imageUpload">Upload a Pic</label>
// </p>
// 
