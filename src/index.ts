import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { trimTrailingSlash } from "hono/trailing-slash";
import { timing, setMetric, startTime, endTime } from "hono/timing";
import type { TimingVariables } from "hono/timing";
import { secureHeaders } from "hono/secure-headers";
import { getGithubUser } from "./lib";

type Variables = TimingVariables;

const app = new Hono<{ Variables: Variables }>({
  strict: true,
});

app.use(logger());
app.use(secureHeaders());
app.use(timing());
app.use(trimTrailingSlash());
app.use("/api/*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/github/:username", async (c) => {
  const username = c.req.param("username");

  // custom metrics
  setMetric(c, "region", "sg");

  // measure time
  startTime(c, "github-api");
  const result = await getGithubUser(username);
  endTime(c, "github-api");

  console.log(result);

  return c.json(result);
});

export default {
  port: 8000,
  fetch: app.fetch,
};
