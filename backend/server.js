const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const chapter=require("./models/chapt")
const app = express();
app.use(express.json()); 
app.use(cors());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

mongoose.connect("mongodb://localhost:27017/Apti_web", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

app.post('/chaptt', async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const updatedChapter = await chapter.findOneAndUpdate(
            { chapterName: req.body.chapterName },  
            { $push: { questions: { $each: req.body.questions } } }, 
            { new: true, upsert: true }  
        );
        console.log("Updated Chapter:", updatedChapter);
        res.json({ message: "Questions added successfully.", updatedChapter });

    } catch (err) {
        console.error("Error saving to DB:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/users', async (req, res) => {
    try {
        const us = await chapter.find({}, "chapterName"); 
        res.json(us.map(obj => obj.chapterName));
    } catch (err) {
        console.log("Error fetching:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
 });
 
 app.get("/questions/:chapterName",async(req, res) => {
    try {
        console.log("Received request for:", req.params.chapterName);

        const {chapterName}=req.params;
        const chap = await chapter.findOne({chapterName:{ $regex: new RegExp("^"+chapterName+"$","i")}});
        console.log("Fetched chapter from DB:", chap);

        if (!chap) {
            return res.status(404).json({ message: "Chapter not found" });
        }

        res.json({ questions: chap.questions });

    } catch (err) {
        console.error("Error fetching questions:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(8000, () => console.log("Server running on port 8000"));