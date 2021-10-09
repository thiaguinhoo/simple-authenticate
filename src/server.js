require('dotenv').config();
const application = require('./application');

const serverPort = process.env.SERVER_PORT || 3333;

application.listen(
  serverPort,
  () => console.log(`Server running on *:${serverPort}`)
);

