import React from "react";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
// import leaping from '../images/leaping.jpg';

const Post = ({ post }) => {
    const converter = new QuillDeltaToHtmlConverter(post.content.ops);//there used to be an object as a the second parameter, but it broke the app.
    const contentHTML = converter.convert();

    return (
        <>
            <article className="post container" >
                <h1>{post.title}</h1>
                <div 
                    className="content"
                    dangerouslySetInnerHTML={{
                        __html: contentHTML
                    }}
                />
            </article>
          
            
        </>
    );
}

export default Post;

// <img src={leaping} alt="using import statement"/>
// <img src={process.env.PUBLIC_URL + "/attack.jpg"} alt="using process.env"/>