import request from "supertest";
import app from "../app";

describe("POST /encode", () => {
  it("Returns the short url with status 201", async function () {
    const response = await request(app)
      .post("/encode")
      .send({ url: "https://something.com" })
      .set("Accept", "application/json");
    expect(response.status).toEqual(201);
    expect(response.body.shortUrl).toMatch(/http:\/\/short.est\/.{6}/);
  });

  it("Returns an error with status 400 in case of bad url", async function () {
    const response = await request(app)
      .post("/encode")
      .send({ url: "wrongurl.com" })
      .set("Accept", "application/json");
    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual("invalid url");
  });

  it("In case the url is already saved, it returns the matching shorten link with status 201", async function () {
    const responseA = await request(app)
      .post("/encode")
      .send({ url: "https://something.com" })
      .set("Accept", "application/json");
    const shortUrl = responseA.body.shortUrl;
    const responseB = await request(app)
      .post("/encode")
      .send({ url: "https://something.com" })
      .set("Accept", "application/json");
    expect(responseB.status).toEqual(201);
    expect(responseB.body.shortUrl).toEqual(shortUrl);
  });
});

describe("GET /decode", () => {
  let shortUrl;

  beforeEach(async () => {
    const response = await request(app)
      .post("/encode")
      .send({ url: "https://something.com" });
    shortUrl = response.body.shortUrl;
  });

  it("Returns the long url given the short version", async function () {
    const response = await request(app)
      .get("/decode")
      .query({ shortUrl: shortUrl })
      .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect(response.body.fullUrl).toEqual("https://something.com");
  });

  it("Returns an error with state 400 if the url does not exist", async function () {
    const response = await request(app)
      .get("/decode")
      .query({ shortUrl: "http://aaaaa.com" })
      .set("Accept", "application/json");
    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual("no url matching the request");
  });
});
