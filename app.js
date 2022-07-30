import express from "express";
import { nanoid } from "nanoid";
import validUrl from "valid-url";

const app = express();
app.use(express.json());

const urls = {};
// urls = {token: fullUrl};
// shortUrl = `http://short.est/${token}`

//------------------Generate a unique shorten Url---------------

app.post("/encode", (req, res) => {
  const fullUrl = req.body.url;
  // checking if url is valid
  if (!validUrl.isWebUri(fullUrl)) {
    res.status(400).json({ error: "invalid url" });
    return;
  }
  let token;
  // checking if url has already been saved
  if (Object.values(urls).includes(fullUrl)) {
    token = Object.keys(urls).find((key) => urls[key] === fullUrl);
  } else {
    // generate a token and verify it is not already used
    token = nanoid(6);
    let alreadyTaken = urls[token];
    while (alreadyTaken) {
      token = nanoid(6);
      alreadyTaken = urls[token];
    }
    urls[token] = fullUrl;
  }
  // return a unique short url
  res.status(201).json({ shortUrl: `http://short.est/${token}` });
  console.log(urls);
});

//------------------Retrieving the original full Url---------------

app.get("/decode", (req, res) => {
  const shortUrl = req.query.shortUrl;
  const token = shortUrl.slice(-6);
  // checking if url already exist
  if (!Object.keys(urls).includes(token)) {
    res.status(400).json({ error: "no url matching the request" });
  } else {
    // retrieving the original full url
    const fullUrl = urls[token];
    res.status(200).json({ fullUrl });
  }
});

export default app;
