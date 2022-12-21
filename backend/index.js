const app = require("./app");
const http = require("http");

const server = http.createServer(app);

// The port might have to be something different for deployment. Have to check this out later.
server.listen(5000, () => {
  console.log(`Server running on port: 5000`);
});