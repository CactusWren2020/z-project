exports.handler = async (event) => {
    const getToken = async () => {
        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic" + btoa(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET),
            },
            body: "grant_type=client_credentials",
        });
        const data = await result.json();
        return data;
    };

    getToken()
    .then((response) => {
        //do stuff
    })
    .catch((error) => {
        //do stuff
    });
};
