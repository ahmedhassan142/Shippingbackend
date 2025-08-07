"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shippingroute_1 = __importDefault(require("./route/shippingroute"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.json());
const mongooseUri = process.env.MONGODB_URI || "";
mongoose_1.default.connect(mongooseUri)
    .then(() => console.log("Shipping service connected to database"))
    .catch((error) => console.error("Failed to connect to database:", error));
app.use('/api/shipping', shippingroute_1.default);
const server = http_1.default.createServer(app);
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port 3005 is already in use!`);
        process.exit(1);
    }
    console.error('Server error:', err);
});
server.listen(3005, () => {
    console.log(`Shipping service running on port 3005`);
});
