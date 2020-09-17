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
//  import firebase from "./firebase";

 class App extends Component {
   state = {
     isAuthenticated: false,
     posts: [],
     message: null
   }
   componentDidMount() {
     this.props.appService
     .subscribeToPosts(posts => this.setState({
       posts
     }));
    }
  //    const postsRef = firebase.database().ref("posts");
  //    postsRef.on("value", snapshot => {
  //      const posts = snapshot.val();
  //      const newStatePosts = [];
  //      for (let post in posts) {
  //        newStatePosts.push({
  //          key: post,
  //          slug: posts[post].slug,
  //          title: posts[post].title,
  //          content: posts[post].content
  //        });
  //      }  
  //      this.setState({ posts: newStatePosts });
  //    });
  //  }
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
      
    //  const postsRef = firebase.database().ref("posts");
    //  post.slug = this.getNewSlugFromTitle(post.title);
    //  delete post.key;
    //  postsRef.push(post);
    //  this.displayMessage("saved");
   }
   displayMessage = type => {
     this.setState( { message: type} );
     setTimeout(() => this.setState( {message: null} ), 1600);
   }
   updatePost = post => {
     this.props.appService
     .updatePost(post);
     this.displayMessage("updated");
    // const postRef = firebase.database().ref("posts/" + post.key);
    // postRef.update({
    //   slug: this.getNewSlugFromTitle(post.title),
    //   title: post.title,
    //   content: post.content
    // });
    //   this.displayMessage("updated");
    }
    deletePost = post => {
      if (window.confirm("Delete this post?")) {
        this.props.appService
        .deletePost(post);
        this.displayMessage("deleted");
        // const postRef = firebase.database().ref("posts/" + post.key);
        // postRef.remove();
        // this.displayMessage("deleted"); 
      }
    }
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
                  render={() => 
                    !this.state.isAuthenticated ? ( 
                     <Login onLogin={this.onLogin}/>
                    ) : 
                    <Redirect to="/"/>   
                  }  
                />
                <Route
                  exact path="/new"
                  render={() => (
                    this.state.isAuthenticated ? (
                    <PostForm addNewPost={this.addNewPost}
                      post={{
                        key: null,
                        slug: "",
                        title: "", content: ""}}
                        /> 
                    ) : 
                    <Redirect to="/login"/>
                  )}
                />
                <Route
                    path="/edit/:postSlug"
                    render={(props) => {
                      const post = this.state.posts.find(
                        post => post.slug === props.match.params.postSlug);
                      if (post && this.state.isAuthenticated) {
                        return (<PostForm
                        updatePost={this.updatePost} 
                        post={post} />
                        );
                      } else if (post && !this.state.isAuthenticated) {
                        return <Redirect to="/login"/>;
                      } else {
                        return <Redirect to="/" />;
                      }
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

//  {
//   id: 1,
//   slug: "bruce-lee",
//   title: "Bruce Lee and the Kung Fu Explosion",
//   content: "In this day of diversity and Chinese wuxia freely available on Netflix..."
//  },
//  {
//   id: 2,
//   slug: "jackie-chan",
//   title: "Jackie Chan, Kung Fu Komedian",
//   content: "What came first, the movie or the outtake?"
//  },
//  {
//   id: 3,
//   slug: "jet-li",
//   title: "Jet Li's Dignified Assassin",
//   content: "Charisma takes many forms. Jet Li's charimsa is of the quiet kind..."
//  },