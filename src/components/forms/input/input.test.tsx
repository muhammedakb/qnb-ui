import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Input } from "./input"

describe("Input", () => {
  it("kullanıcı değerini onChange ile iletir", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Input aria-label="Ad" onChange={onChange} />)
    const input = screen.getByRole("textbox", { name: "Ad" })
    await user.type(input, "Ayşe")

    expect(input).toHaveValue("Ayşe")
    expect(onChange).toHaveBeenCalled()
  })

  it("disabled ve invalid durumlarını native inputa aktarır", () => {
    render(<Input aria-label="E-posta" disabled aria-invalid="true" />)
    const input = screen.getByRole("textbox", { name: "E-posta" })

    expect(input).toBeDisabled()
    expect(input).toHaveAttribute("aria-invalid", "true")
  })

  it("istenen input tipini kullanır", () => {
    render(<Input aria-label="Telefon" type="tel" />)
    expect(screen.getByRole("textbox", { name: "Telefon" })).toHaveAttribute(
      "type",
      "tel",
    )
  })
})
