import type { Request, Response, NextFunction } from "express";

const asyncHandler = (fn: Function) => {
    return (req : Request, res : Response, next : NextFunction) => {
        try {
            return fn(req, res, next);
        } catch (error) {
            console.log(error);
        }
    }
}

export { asyncHandler }