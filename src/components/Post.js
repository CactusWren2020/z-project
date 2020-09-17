import React from "react";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const Post = ({ post }) => {
    const converter = new QuillDeltaToHtmlConverter(post.content.ops);//there used to be an object as a the second parameter, but it broke the app.
    const contentHTML = converter.convert();

    return (
        <article className="post container" >
            <h1>{post.title}</h1>
            <div 
                className="content"
                dangerouslySetInnerHTML={{
                    __html: contentHTML
                }}
            />
        </article>
    );
}

export default Post;