import React from "react";

const Message = ({ type }) => {
    const messages = {
        saved: "post has been saved!",
        updated: "post has been updated!",
        deleted: "post has been deleted!",
    }
    return (
        <div className={`App-message ${type}`}>
            <p className="container">
                <strong>{messages[type]}</strong>
            </p>
        </div>
    )
}

export default Message;