import { describe, it } from "node:test";
import assert from "node:assert";
import { cn } from "./utils.ts";

describe("cn utility function", () => {
  it("merges basic classes", () => {
    assert.strictEqual(cn("px-2", "py-2"), "px-2 py-2");
  });

  it("resolves tailwind class conflicts", () => {
    assert.strictEqual(cn("px-2 py-2", "p-4"), "p-4");
  });

  it("handles conditional classes", () => {
    assert.strictEqual(cn("px-2", true && "py-2", false && "p-4"), "px-2 py-2");
  });

  it("handles arrays and objects", () => {
    assert.strictEqual(
      cn(["px-2", "py-2"], { "bg-red-500": true, "bg-blue-500": false }),
      "px-2 py-2 bg-red-500"
    );
  });

  it("ignores undefined and null", () => {
    assert.strictEqual(cn("px-2", undefined, null, "py-2"), "px-2 py-2");
  });
});
