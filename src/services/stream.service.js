import { StreamChat } from "stream-chat";

const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_SECRET = process.env.STREAM_SECRET;

const streamClient = new StreamChat(STREAM_API_KEY, STREAM_SECRET);

export const generateStreamToken = (userID) => {
    return streamClient.createToken(userID);
};
