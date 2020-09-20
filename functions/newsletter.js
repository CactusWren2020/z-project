// functions/newsletter.js

exports.handler = async (event) => {
    const { body } = event;

    fetch(`https://someserver.com/v1/some/endpoint`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: body,
    })
    .then((response) => {
        // do stuff
    })
    .catch((error) => {
        //do stuff with error response
    });
};

// POST localhost:3000/.netlify/functions/newsletter
// -> 200 OK
