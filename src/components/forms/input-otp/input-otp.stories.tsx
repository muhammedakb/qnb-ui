import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./input-otp"

type InputOTPStoryProps = {
  maxLength: number
  initialValue?: string
  disabled?: boolean
  "aria-invalid"?: boolean
  "aria-label": string
  onChange: (value: string) => void
  onComplete: (value: string) => void
}

function InputOTPStory(props: InputOTPStoryProps) {
  const [value, setValue] = useState(props.initialValue ?? "")

  return (
    <InputOTP
      maxLength={props.maxLength}
      value={value}
      disabled={props.disabled}
      aria-invalid={props["aria-invalid"]}
      aria-label={props["aria-label"]}
      onChange={(nextValue) => {
        setValue(nextValue)
        props.onChange(nextValue)
      }}
      onComplete={props.onComplete}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

const meta = {
  title: "Forms/InputOTP",
  component: InputOTPStory,
  parameters: { layout: "centered" },
  args: {
    maxLength: 6,
    "aria-label": "Doğrulama kodu",
    onChange: fn(),
    onComplete: fn(),
  },
} satisfies Meta<typeof InputOTPStory>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const Prefilled: Story = {
  args: {
    initialValue: "481205",
  },
}

export const CompleteCode: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Doğrulama kodu" })

    await userEvent.click(input)
    await userEvent.type(input, "123456")

    await expect(args.onComplete).toHaveBeenCalledWith("123456")
  },
}

export const Invalid: Story = {
  args: {
    initialValue: "123456",
    "aria-invalid": true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
