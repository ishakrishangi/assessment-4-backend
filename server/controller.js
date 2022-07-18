let globalId = 4;
const encouragements = require('./db.json');
module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["A fresh start will put you on your way.", "Do not underestimate yourself. Human beings have unlimited potentials.", "Soon life will become more interesting.", "The change you started already have far-reaching effects. Be ready.", "You are offered the dream of a lifetime. Say yes!"];
      
        // choose random fortune
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },

    getAllEncouragements: (req,res) => {
        res.status(200).send(encouragements);
    },

    createEncouragement: (req,res) => {
        //destructuring title,rating,imageURL from the input box
        const {statement, level, gifURL} = req.body
        let newEncouragement = {
            id: globalId,
            statement, 
            level,
            gifURL
        };
        encouragements.push(newEncouragement)
        res.status(200).send(encouragements)
        globalId++
    },

    deleteEncouragement: (req,res) => {
        let {id} = req.params
        let index = encouragements.findIndex(encouragement => encouragement.id === +id)
        if (index === -1){
        //checking to see if it to see if the array has something in it or not, checking to make sure that the index actually exists
            res.status(400).send('user not found')
        } else {
            encouragements.splice(index, 1) //start at index, remove 1 element
            res.status(200).send(encouragements)
        }
    },

    updateEncouragement: (req,res) => {
        let{id} =req.params
        let{type} = req.body
        let index = encouragements.findIndex(encouragement => encouragement.id === +id)
        if(index === -1){
            res.status(400).send(`user not found`)
        } else  if(encouragements[index].level === 100 && type === 'plus'){
            res.status(400).send('rating cannot go higher than 100')
        } else if(encouragements[index].level === 1 && type === 'minus'){
            res.status(400).send('cannot go below 1')
        } else if(type === 'plus'){
            encouragements[index].level++
            res.status(200).send(encouragements)
        } else if(type === 'minus'){
            encouragements[index].level--
            res.status(200).send(encouragements)
        } else{
            res.sendStatus
        }
        }
    








}