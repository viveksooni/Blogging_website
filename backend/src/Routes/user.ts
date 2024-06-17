import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {Hono} from "hono";
import { sign } from "hono/jwt";

export const  userRoute = new Hono<{Bindings:{DATABASE_URL: string, JWT_secret:string}}>();

//signup
userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  //zod and hasing of password
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_secret);

    return c.json({
      jwt: token,
    });
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.json({ error: "there is some error" });
  }
});

//SignIN
userRoute.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const password = body.password;
  const email = body.email;

  const user = await prisma.user.findUnique({ where: { email, password } });

  if (!user) {
    c.status(403);
    return c.json({ msg: "no user exists" });
  }

  const token = await sign({ id: user.id }, c.env.JWT_secret);
  const header = c.header("Authorization", token);
  return c.json({ email, password: password, jwt_tokken: token, header });
});
