// functions/hello.js

exports.handler = async (event) => {
    const { name } = event.queryStringParameters;
    return {
        statusCode: 200,
        body: `Hello, friend. Are you ${name || "no one"}?`,
    };
};

//GET localhost:3000/.netlify/functions/hello
//Hello, friend

//GET localhost:3000/.netlify/functions/hello?name=Eka
//Hello, friend. Are you Eka?