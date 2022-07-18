const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, getAllEncouragements, createEncouragement, deleteEncouragement, updateEncouragement } = require('./controller')


app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/encouragements", getAllEncouragements);
app.post('/api/encouragements', createEncouragement)
app.delete('/api/encouragements/:id', deleteEncouragement)
app.put('/api/encouragements/:id', updateEncouragement)

app.listen(4000, () => console.log("Server running on 4000"));
