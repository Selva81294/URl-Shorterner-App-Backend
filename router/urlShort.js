import express from "express";
import { URLShort } from "../models/urlShortModel.js";

const router = express.Router();

function generateURL() {
  let randamResult = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ124567890abcdefghijklmnopqrstuvwxyz";
  let charactersLength = characters.length;

  for (let i = 0; i < 5; i++) {
    randamResult += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return randamResult;
}

router.get("/", (req, res) => {
  res.send("Welcome to URL-Shortener APP");
});

router.get("/geturl", async (req, res) => {
  try {
    const allUrlData = await URLShort.find();
    if (!allUrlData)
      return res.status(400).json({ message: "Could not fetch your data" });
    res.status(200).json(allUrlData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/posturl", async (req, res) => {
  try {
    let urlShort = await new URLShort({
      longURL: req.body.longURL,
      shortURL: generateURL(),
    }).save();
    if (!urlShort)
      return res.status(400).json({ message: "Error posting your content" });
    res.status(200).json(urlShort);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:urlId", async (req, res) => {
  try {
    const shortUrl = await URLShort.findOne({ shortURL: req.params.urlId });
    await URLShort.findByIdAndUpdate({_id: shortUrl._id},{$inc:{clickCount : 1}})
    res.redirect(shortUrl.longURL);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/delete/:id", async (req,res)=>{
    try {
        await URLShort.findByIdAndDelete({_id: req.params.id})
        res.redirect("https://main--roaring-narwhal-9deaa8.netlify.app/")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
})

export const urlShortRouter = router;
