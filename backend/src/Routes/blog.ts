import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Jwt } from "hono/utils/jwt";

// Initialize the Hono app with types for Bindings and Variables
export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_secret: string;
  };
  Variables: { userId: string };
}>();

// Middleware to verify JWT and extract user ID
blogRoute.use("/*", async (c, next) => {
  const auth = c.req.header("Authorization") || "";
  console.log(auth);

  try {
    const user = await Jwt.verify(auth, c.env.JWT_secret);
    if (user) {
      // @ts-ignore
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ msg: "You are not logged in" });
    }
  } catch (error) {
    c.status(403);
    console.log(error);
    return c.json({ msg: "you are not logged in" });
  }
});

// Helper function to create Prisma Client instance
const getPrismaClient = (databaseUrl: string) => {
  return new PrismaClient({
    datasourceUrl: databaseUrl,
  }).$extends(withAccelerate());
};

// Route to create a new blog post
blogRoute.post("/", async (c) => {
  const body = await c.req.json();
  const prisma = getPrismaClient(c.env.DATABASE_URL);
  const userId = c.get("userId");
  console.log(userId);
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId, // Use extracted userId
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ msg: "Error creating blog post", error });
  }
});
blogRoute.put("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const body = await c.req.json();
    const prisma = getPrismaClient(c.env.DATABASE_URL);

    const post = await prisma.post.update({
      where: { id: id },
      data: { title: body.title, content: body.content },
    });
    return c.json({ id: post.id });
  } 
  catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "there is some error check console" });
  }
});


// Route to get a specific blog post by ID
blogRoute.get("/", async (c) => {
  const { id } = await c.req.json();
  const prisma = getPrismaClient(c.env.DATABASE_URL);

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    return c.json({
      blog,
    });
  } catch (error) {
    c.status(500);
    return c.json({ msg: "Error fetching blog post", error });
  }
});

// Route to get multiple blog posts (Add pagination in the future)
blogRoute.get("/bulk", async (c) => {
  const prisma = getPrismaClient(c.env.DATABASE_URL);

  try {
    const blogs = await prisma.post.findMany();
    return c.json({
      blogs,
    });
  } catch (error) {
    c.status(500);
    return c.json({ msg: "Error fetching blog posts", error });
  }
});
