import { Request } from "express";
import { Socket } from "socket.io";

export interface IPayload {
  userId: number;
}

export interface IRepuest extends Request {
  userId: number;
}
