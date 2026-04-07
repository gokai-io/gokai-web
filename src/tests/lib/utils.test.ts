import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
  it("merges class names", () => {
    const result = cn("text-red-500", "bg-blue-500")
    expect(result).toBe("text-red-500 bg-blue-500")
  })

  it("handles conditional classes", () => {
    const result = cn("base", false && "hidden", "visible")
    expect(result).toBe("base visible")
  })

  it("resolves tailwind conflicts", () => {
    const result = cn("px-4", "px-6")
    expect(result).toBe("px-6")
  })

  it("handles undefined and null", () => {
    const result = cn("base", undefined, null, "end")
    expect(result).toBe("base end")
  })

  it("handles empty input", () => {
    const result = cn()
    expect(result).toBe("")
  })
})
