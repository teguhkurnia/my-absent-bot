const connectToWhatsApp = require("./whatsapp");
const dotenv = require("dotenv");
const server = require("./server");

dotenv.config();

connectToWhatsApp().catch((err) => console.log("unexpected error: " + err)); //

server();
