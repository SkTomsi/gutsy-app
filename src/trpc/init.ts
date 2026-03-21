import { publicProcedure } from "./core";
import { requireAuth } from "./middleware";

export const authProcedure = publicProcedure.use(requireAuth);

export {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "./core";
