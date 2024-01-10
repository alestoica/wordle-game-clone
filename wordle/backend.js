const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get('/word', function (req, res) {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '5', wordLength: '5'},
        headers: {
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
            'X-RapidAPI-Key': 'ade60585e8mshafd210f16bf0ae7p1b0f31jsne20188e3be36'
        }
    };

    axios.request(options).then(function (response) {
        res.json(response.data[0]);
    }).catch(function (error) {
        console.error(error);
    });
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));
