import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import {
  OtpVerificationDialog,
  type OtpVerificationDialogProps,
} from "./otp-verification-dialog"

function ControlledOtpDialog(args: OtpVerificationDialogProps) {
  const [open, setOpen] = useState(args.open)
  const [value, setValue] = useState(args.value)

  return (
    <OtpVerificationDialog
      {...args}
      open={open}
      value={value}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        args.onOpenChange(nextOpen)
      }}
      onValueChange={(nextValue) => {
        setValue(nextValue)
        args.onValueChange(nextValue)
      }}
    />
  )
}

const meta = {
  title: "Overlays/OtpVerificationDialog",
  component: OtpVerificationDialog,
  parameters: { layout: "centered" },
  args: {
    open: true,
    value: "",
    onOpenChange: fn(),
    onValueChange: fn(),
    onVerify: fn(),
  },
  render: (args) => <ControlledOtpDialog {...args} />,
} satisfies Meta<typeof OtpVerificationDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    value: "123456",
    error: "Girdiğiniz doğrulama kodu geçersiz.",
  },
}

export const VerifyCode: Story = {
  play: async ({ args }) => {
    const portal = within(document.body)
    const input = await portal.findByRole("textbox", {
      name: "Tek kullanımlık şifre",
    })

    await userEvent.type(input, "654321")
    await expect(args.onVerify).toHaveBeenCalledWith("654321")
  },
}
