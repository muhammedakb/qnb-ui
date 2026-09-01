import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { OtpVerificationDialog } from "./otp-verification-dialog"

describe("OtpVerificationDialog", () => {
  it("başlık, açıklama ve demo kodunu render eder", () => {
    render(
      <OtpVerificationDialog
        open
        value=""
        onOpenChange={vi.fn()}
        onValueChange={vi.fn()}
        onVerify={vi.fn()}
      />,
    )

    expect(
      screen.getByRole("dialog", { name: "Güvenlik onayı" }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/telefonunuza gönderilen 6 haneli/i),
    ).toBeInTheDocument()
    expect(screen.getByText("Demo kod: 123456")).toBeInTheDocument()
  })

  it("hata mesajını alert olarak gösterir", () => {
    render(
      <OtpVerificationDialog
        open
        value="123456"
        error="Kod geçersiz."
        onOpenChange={vi.fn()}
        onValueChange={vi.fn()}
        onVerify={vi.fn()}
      />,
    )

    expect(screen.getByRole("alert")).toHaveTextContent("Kod geçersiz.")
  })

  it("doğrulama butonu mevcut değeri iletir", async () => {
    const user = userEvent.setup()
    const onVerify = vi.fn()
    render(
      <OtpVerificationDialog
        open
        value="654321"
        onOpenChange={vi.fn()}
        onValueChange={vi.fn()}
        onVerify={onVerify}
      />,
    )

    await user.click(screen.getByRole("button", { name: "Kodu doğrula" }))
    expect(onVerify).toHaveBeenCalledWith("654321")
  })
})
