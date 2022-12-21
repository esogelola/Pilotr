import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

// This is a middleware function that checks if the user is authenticated
// If not, it throws an error
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("not authenticated");
  }

  return next();
};