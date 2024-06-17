import { Hono } from "hono";
import { userRoute } from "./Routes/user";
import { blogRoute } from "./Routes/blog";
import { cors } from "hono/cors";
const app = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_secret: string };
}>();
app.use("/*",cors());
app.route("/api/v1/user",userRoute);
app.route("/api/v1/blog",blogRoute);



export default app;
