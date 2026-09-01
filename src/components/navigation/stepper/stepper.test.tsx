import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FileCheckIcon, ShieldCheckIcon, UserRoundIcon } from "lucide-react"
import { describe, expect, it, vi } from "vitest"

import { Stepper } from "./stepper"

const steps = [
  { number: 1, label: "Kişisel bilgiler", icon: UserRoundIcon },
  { number: 2, label: "Güvenlik onayı", icon: ShieldCheckIcon },
  { number: 3, label: "Başvuru özeti", icon: FileCheckIcon },
]

describe("Stepper", () => {
  it("aktif adımı işaretler ve gelecek adımları devre dışı bırakır", () => {
    render(
      <Stepper steps={steps} currentStep={2} onStepChange={vi.fn()} />,
    )

    expect(
      screen.getByRole("button", { name: /güvenlik onayı/i }),
    ).toHaveAttribute("aria-current", "step")
    expect(
      screen.getByRole("button", { name: /başvuru özeti/i }),
    ).toBeDisabled()
    expect(
      screen.getByRole("button", { name: /kişisel bilgiler/i }),
    ).toBeEnabled()
  })

  it("ziyaret edilebilir önceki adımı bildirir", async () => {
    const user = userEvent.setup()
    const onStepChange = vi.fn()
    render(
      <Stepper steps={steps} currentStep={3} onStepChange={onStepChange} />,
    )

    await user.click(
      screen.getByRole("button", { name: /kişisel bilgiler/i }),
    )
    expect(onStepChange).toHaveBeenCalledWith(1)
  })

  it("nav için özelleştirilebilir erişilebilir ad kullanır", () => {
    render(
      <Stepper
        steps={steps}
        currentStep={1}
        onStepChange={vi.fn()}
        ariaLabel="Başvuru adımları"
      />,
    )

    expect(
      screen.getByRole("navigation", { name: "Başvuru adımları" }),
    ).toBeInTheDocument()
  })
})
