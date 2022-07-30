# URL_shortner_API_-_test
2 endpoints API to generate shorter URL and retrieve the original one + tests

# HOW TO RUN ME

### PACKAGES INSTALLATION

- Make sure you have npm installed on your machine by running the command: npm -v
- Make sure you have node installed on your machine by running the command: node -v
- Run the command: npm install to install all packages

### SERVER

- Start the server by running the command: npm run devStart

### POST REQUEST (/encode)

##### Get a new short url

- Create a POST request : http://localhost:3333/encode
- In the request body, send the original long url, in the following JSON format:

```
{
    "url":"https://www.google.com"
}
```

- The API will respond with a unique shorten url (in JSON format), e.g:

```
{
    "shortUrl": "http://short.est/9uW_i1"
}
```

- If the long url you pass in the POST request is invalid, you should see the following response:

```
{
    "error": "invalid url"
}
```

- If the long url you are passing in the POST request already exists, it will return the short url already assigned to it and not a new one

### GET REQUEST (/decode)

##### Retrieve the original long url

- Create a GET request : http://localhost:3333/decode
- Enter the following params:

```
  Key: shortUrl
  Value (e.g): http://short.est/9uW_i1
```

- The API will retrieve the original url (in JSON format), e.g:

```
{
    "fullUrl": "https://www.google.com"
}
```

- If the short url you pass in the GET request doesn't exist yet, you should see the following response:

```
{
    "error": "no url matching the request"
}
```

### TESTS

- Start the testing server by running the command: npm run test
