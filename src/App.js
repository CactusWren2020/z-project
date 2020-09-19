 import React, { Component } from "react";
 import "./App.css";
 import Header from "./components/Header";
 import Posts from "./components/Posts";
 import Post from "./components/Post";
 import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
 import NotFound from "./components/NotFound";
 import PostForm from "./components/PostForm";
 import Message from "./components/Message";
 import SimpleStorage from "react-simple-storage";
 import Login from "./components/Login";
 import NewUser from "./components/NewUser";
 import firebase from "firebase";
 

 class App extends Component {
   state = {
     isAuthenticated: false,
     posts: [],
     message: null,
     username: "",
     password: ""
   }
   componentDidMount() {
     this.props.appService
     .subscribeToPosts(posts => this.setState({
       posts
     }));
    }
   onLogin = (email, password) => {
     this.props.appService
     .login(email, password)
     .then(user => {
       this.setState({ isAuthenticated: true });
     })
     .catch(error => console.error(error));
     }
   onLogout = () => {
     this.props.appService
     .logout()
     .then(user => {
       this.setState({ isAuthenticated: false });
     })
     .catch(error => console.error(error));
   }
   addNewPost = post => {
     this.props.appService
     .savePost(post);
      this.displayMessage("saved");
   }
   displayMessage = type => {
     this.setState( { message: type} );
     setTimeout(() => this.setState( {message: null} ), 1600);
   }
   updatePost = post => {
     this.props.appService
     .updatePost(post);
     this.displayMessage("updated");
    }
    deletePost = post => {
      if (window.confirm("Delete this post?")) {
        this.props.appService
        .deletePost(post);
        this.displayMessage("deleted");
      }
    }
    createNewUser = (username, password, e) => {
      e.preventDefault();
      firebase.auth().createUserWithEmailAndPassword(username, password)
      .catch(error => console.error(error));
      this.displayMessage("userCreated");
      return <Redirect to="/" />;
    };
    
    renderAuthRoute = (Component, props) => 
      this.state.isAuthenticated ? (
        <Component {...props} /> 
      ) : 
      <Redirect to="/" />; 
    
   render() {
     return (
       <Router>
          <div className="App">
            <SimpleStorage parent={this}/> 
            <Header
              isAuthenticated={this.state.isAuthenticated}
              onLogout={this.onLogout}
            />
              {this.state.message && <Message type={this.state.message}/>}
              <Switch>
                <Route
                  exact path="/"
                    render={() => <Posts posts={this.state.posts}
                                        deletePost={this.deletePost}
                                        isAuthenticated={this.state.isAuthenticated}
                                  />}
                />
                <Route
                  path="/post/:postSlug"
                  render={props => {
                    const post = this.state.posts.find(
                      post => post.slug === props.match.params.postSlug);
                      if( post) {return <Post post={post} />} else {return <NotFound/>}
                  }}
                />
                <Route
                  exact path="/login"
                  render={ () => 
                     <Login onLogin={this.onLogin} />
                  }
                />
                <Route //note current code redirects to "/", not login
                  exact path="/new"
                  render={() => (
                    this.renderAuthRoute(PostForm, {
                      addNewPost: this.addNewPost,
                      post: {
                        key: null,
                        slug: "",
                        title: "",
                        content: "",
                        fileName: ""
                      }
                    })
                  )}
                />
                <Route
                    path="/edit/:postSlug"
                    render={(props) => {
 
                      const post = this.state.posts.find(
                        post => post.slug === props.match.params.postSlug);
                      if (post) {
                        return this.renderAuthRoute(PostForm, {
                          updatePost: this.updatePost,
                          post
                        });
                      } else {
                        return <Redirect to="/" />;
                      }
                      // if (post && this.state.isAuthenticated) {
                      //   return (<PostForm
                      //   updatePost={this.updatePost} 
                      //   post={post} />
                      //   );
                      // } else if (post && !this.state.isAuthenticated) {
                      //   return <Redirect to="/login"/>;
                      // } else {
                      //   return <Redirect to="/" />;
                      // }
                    }}
                />
                <Route 
                    exact path="/newUser"
                    render={() => {
                      return <NewUser createNewUser={this.createNewUser} />
                    }}
                  />
                <Route component={NotFound}/>
              </Switch>
          </div>
        </Router>
     );
   }
 }

 export default App;
 