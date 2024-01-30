import { Environment } from "vitest";

export default (<Environment>{
  name: "prisma",
  transformMode: "web", // Add the missing transformMode property
  async setup() {
    console.log("executou o setup");

    return {
      teardown() {
        console.log("exutou o teardown");
      },
    };
  },
}) as unknown; // Convert the expression to unknown
