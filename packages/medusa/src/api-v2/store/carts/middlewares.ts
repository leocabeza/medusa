import { transformBody, transformQuery } from "../../../api/middlewares"
import { MiddlewareRoute } from "../../../loaders/helpers/routing/types"
import * as QueryConfig from "./query-config"
import {
  StoreGetCartsCartParams,
  StorePostCartReq,
  StorePostCartsCartReq,
} from "./validators"

export const storeCartRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/store/carts/:id",
    middlewares: [
      transformQuery(
        StoreGetCartsCartParams,
        QueryConfig.retrieveTransformQueryConfig
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/store/carts",
    middlewares: [transformBody(StorePostCartReq)],
  },
  {
    method: ["POST"],
    matcher: "/store/carts/:id",
    middlewares: [transformBody(StorePostCartsCartReq)],
  },
]
