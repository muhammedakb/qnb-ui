import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Separator } from "./separator"

describe("Separator", () => {
  it.each(["horizontal", "vertical"] as const)(
    "%s yönünü erişilebilir state olarak yansıtır",
    (orientation) => {
      render(<Separator orientation={orientation} />)
      expect(screen.getByRole("separator")).toHaveAttribute(
        "aria-orientation",
        orientation,
      )
    },
  )
})
