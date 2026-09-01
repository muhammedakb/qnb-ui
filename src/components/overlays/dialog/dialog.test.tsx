import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Button } from "../../actions/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

function DialogExample({ onOpenChange = vi.fn() }) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger render={<Button />}>Dialog aç</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Başvuruyu onayla</DialogTitle>
          <DialogDescription>İşlem detaylarını kontrol edin.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

describe("Dialog", () => {
  it("trigger ile açılır ve erişilebilir başlığı kullanır", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<DialogExample onOpenChange={onOpenChange} />)

    await user.click(screen.getByRole("button", { name: "Dialog aç" }))
    const dialog = await screen.findByRole("dialog", {
      name: "Başvuruyu onayla",
    })

    expect(dialog).toHaveTextContent("İşlem detaylarını kontrol edin.")
    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it("kapat butonu ile kapanır", async () => {
    const user = userEvent.setup()
    render(<DialogExample />)
    await user.click(screen.getByRole("button", { name: "Dialog aç" }))
    const dialog = await screen.findByRole("dialog")

    await user.click(screen.getByRole("button", { name: "Kapat" }))
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    })
    expect(dialog).not.toBeInTheDocument()
  })
})
