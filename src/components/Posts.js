import React from 'react';
import { Link } from 'react-router-dom';
  

const Posts = ({posts, deletePost, isAuthenticated}) => {
    return (
        <article className="posts container">
            

            <img src={process.env.PUBLIC_URL + "nitro.webp"} alt="Dog Fu Showdown"/>
            <h1>Posts</h1>
            <ul>
                {posts.length < 1 && (<li key="empty">No posts!</li>)}
                {posts.map(post => (
                        <li key={post.key}>
                            <h2>
                                <Link to={`/post/${post.slug}`} >{post.title}</Link>    
                            </h2>
                            {isAuthenticated && ( 
                            <p>
                                <Link to={`/edit/${post.slug}`} >Edit</Link>
                                {" | "}
                                <button 
                                    className="linkLike"
                                    onClick={() => deletePost(post)}
                                    >
                                    Delete
                                </button>
                            </p>
                            )}
                        </li>
                ))}
            </ul>
        </article>
    )
};

export default Posts;