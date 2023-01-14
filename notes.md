# Nodejs - Express

## Basic Server Node

### Plain Text

```javascript
const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World!");
});

app.listen(**PORT**);
```

### Json

```javascript
const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(**JSON**));
});

app.listen(**PORT**);
```

## Basic Server Node + Express

```javascript
const express = require("express");

const app = express();

app.listen(**PORT**);
```
