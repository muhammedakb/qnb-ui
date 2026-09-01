import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Label } from "./label"

describe("Label", () => {
  it("native label özelliklerini iletir", () => {
    render(
      <>
        <Label htmlFor="policy-number">Poliçe numarası</Label>
        <input id="policy-number" />
      </>,
    )

    expect(screen.getByLabelText("Poliçe numarası")).toHaveAttribute(
      "id",
      "policy-number",
    )
  })
})
