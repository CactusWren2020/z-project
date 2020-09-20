import React from "react";
import { Redirect } from "react-router-dom";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";
import firebase from "firebase";
import GetUser from "./GetUser"
// import ImageForm from "./ImageForm";

class PostForm extends React.Component {

    state = {
        post: {
            key: this.props.post.key,
            slug: this.props.post.slug,
            title: this.props.post.title,
            content: this.props.post.content,
            fileName: this.props.post.fileName
        },
        saved: false
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.post.key !== this.props.post.key) {
            this.setState({
                post: {
                    key: this.props.post.key,
                    slug: this.props.post.slug,
                    title:this.props.post.title,
                    content: this.props.post.content,
                    fileName: this.props.post.fileName
                }
            })
        }
    }
    handleAddNewPost = e => {
        e.preventDefault();
        if (this.state.post.title) {
            if (this.props.updatePost) {
                this.props.updatePost(this.state.post);
            }  else {
                this.props.addNewPost(this.state.post);
            }
            this.setState({ saved: true });
        } else {
            alert("please enter a title")
        }
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
                    console.log(fileURL);
                    const stateCopy = this.state.post;
                    this.state.post.fileName = fileURL;
                    this.setState({
                        post: stateCopy
                        })
                    }
                );  
            }, 
        );   
    }
    render(){
        if (this.state.saved === true) {
            return <Redirect to="/" />;
        }
        return (
        <>
            <form className="container" onSubmit={this.handleAddNewPost}>
                <h1>Add a New Post</h1>
                <p>
                    <label htmlFor="form-title">Title:</label>
                    <br/>
                    <input
                        defaultValue={this.props.title}
                        id="form-title"
                        value={this.state.post.title}
                        onChange={e => this.setState({
                            post: {
                                ...this.state.post,
                                title: e.target.value
                            }
                        })
                    }
                    />
                </p>
                <p>
                    <label htmlFor="form-content">Content: </label>
                </p>
                <Quill
                    defaultvalue={this.state.post.content}
                    onChange={(content, delta, source, editor) => {
                        this.setState({
                            post: {
                                ...this.state.post,
                                content: editor.getContents()
                            }
                        });
                    }}
                />
                <p>
                    <button type="submit">Save</button>
                </p>
                
            </form>
            <form className="container" onSubmit={(e) => this.imageUpload(e)}>    
            <p>
                {!this.state.post.fileName && <input type="file" 
                        name="imageUpload" 
                        className="file-upload" 
                        accept="image/*"    
                    />}
            </p>
             <p>
                {!this.state.post.fileName && <button type="submit">Submit</button>}
            </p>
                {this.state.post.fileName && <img src={this.state.post.fileName} className="img" alt="image" /> }
            {/* uses state value to display pic */ }
        </form>
        <GetUser />
        </>
        );
    }
}

export default PostForm;