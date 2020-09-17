import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <article className="not-found container">
            <h1>404!</h1>
            <p>
                content not found
            </p>
            <Link to="/">Return to posts</Link>
        </article>
    )
}

export default NotFound;