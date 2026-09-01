import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./input-otp"

function OtpExample({
  onChange = vi.fn(),
  onComplete = vi.fn(),
}: {
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
}) {
  return (
    <InputOTP
      maxLength={6}
      aria-label="Doğrulama kodu"
      onChange={onChange}
      onComplete={onComplete}
    >
      <InputOTPGroup>
        {Array.from({ length: 6 }, (_, index) => (
          <InputOTPSlot key={index} index={index} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  )
}

describe("InputOTP", () => {
  it("girilen kodu slotlara yansıtır ve tamamlanınca bildirir", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onComplete = vi.fn()

    render(<OtpExample onChange={onChange} onComplete={onComplete} />)
    const input = screen.getByRole("textbox", { name: "Doğrulama kodu" })
    await user.type(input, "123456")

    expect(input).toHaveValue("123456")
    expect(onChange).toHaveBeenLastCalledWith("123456")
    expect(onComplete).toHaveBeenCalledWith("123456")
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("6")).toBeInTheDocument()
  })

  it("yalnızca maxLength kadar karakter kabul eder", async () => {
    const user = userEvent.setup()
    render(<OtpExample />)
    const input = screen.getByRole("textbox", { name: "Doğrulama kodu" })

    await user.type(input, "1234567")
    expect(input).toHaveValue("123456")
  })
})
