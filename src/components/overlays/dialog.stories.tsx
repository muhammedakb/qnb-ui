import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  expect,
  fn,
  userEvent,
  waitForElementToBeRemoved,
  within,
} from "storybook/test"

import { Button } from "../actions/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"

const meta = {
  title: "Overlays/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
  args: {
    onOpenChange: fn(),
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button />}>Dialog aç</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Başvuruyu onayla</DialogTitle>
          <DialogDescription>
            Bilgilerinizi kontrol ettikten sonra işlemi tamamlayabilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button>Onayla</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Open: Story = {
  args: {
    defaultOpen: true,
  },
}

export const OpenAndClose: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Dialog aç" }))

    const portal = within(document.body)
    const dialog = await portal.findByRole("dialog", {
      name: "Başvuruyu onayla",
    })
    await expect(dialog).toHaveAttribute("data-open")

    await userEvent.keyboard("{Escape}")
    await waitForElementToBeRemoved(dialog)
  },
}
