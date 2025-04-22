import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { BookRoutes } from "../modules/book/book.route";
import { OrderRoutes } from "../modules/order/order.route";
import { UserRoutes } from "../modules/user/user.route";
import { SSLRoutes } from "../modules/sslcommerz/sslcommerz.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
  {
    path: "/ssl",
    route: SSLRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
