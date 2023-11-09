const router = require("express").Router();
const axios = require("axios");

const charactersService = require('../services/characters.services');
const { response } = require("express");


/* GET home page */
// router.get("/characters", (req, res, next) => {
//     axios
//         .get("https://ih-crud-api.herokuapp.com/characters")
//         .then(responseFromAPI => {
//             // console.log(responseFromAPI)
//             res.render("characters/list-characters", { characters: responseFromAPI.data });
//         })
//         .catch(err => console.error(err))
// });

router.get('/characters', (req, res, next) => {
    charactersService
        .getAllCharacters()
        .then(response => res.render('characters/list-characters.hbs', { characters: response.data }))
        .catch(err => next(err))

})


// router.get("/characters/:id", (req, res, next) => {
//     axios
//         .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
//         .then(responseFromAPI => {
//             // console.log("details: ", responseFromAPI.data)
//             res.render("characters/details-character", { character: responseFromAPI.data });
//         })
//         .catch(err => console.error(err))
// });


router.get('/characters/:id', (req, res, next) => {

    const { id: character_id } = req.params


    charactersService
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details-character.hbs', { character: response.data }))
        .catch(err => next(err))


})


router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-character.hbs')
})

router.post('/characters/create', (req, res, next) => {

    const { name, occupation, weapon } = req.body

    const character_data = { name, occupation, weapon }

    charactersService
        .saveCharacter(character_data)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters