import { Request } from "express";

export interface IPayload {
  userId: number;
}

export interface IRepuest extends Request {
  userId: number;
}
