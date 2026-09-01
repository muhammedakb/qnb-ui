import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Button } from "./button"

describe("Button", () => {
  it("click olayını iletir", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button onClick={onClick}>Devam et</Button>)
    await user.click(screen.getByRole("button", { name: "Devam et" }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it("disabled durumda etkileşimi engeller", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Button disabled onClick={onClick}>
        Kaydet
      </Button>,
    )

    const button = screen.getByRole("button", { name: "Kaydet" })
    expect(button).toBeDisabled()
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it("variant ve size sınıflarını uygular", () => {
    render(
      <Button variant="outline" size="lg">
        Detay
      </Button>,
    )

    expect(screen.getByRole("button", { name: "Detay" })).toHaveClass(
      "border-border",
      "h-9",
    )
  })
})
