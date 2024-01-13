import { io } from "socket.io-client";
import { serverApi } from "../../lib/Config";
import  { createContext } from "react";

export const socket = io.connect(serverApi);
export const SocketContext = createContext();