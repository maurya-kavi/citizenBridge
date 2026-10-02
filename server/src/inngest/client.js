import { Inngest } from "inngest";
import { ENV } from "../lib/env.js";

export const inngest = new Inngest({
  id: "my-app",
  eventKey: ENV.inngest_event_key,
});