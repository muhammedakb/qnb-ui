import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileCheckIcon, ShieldCheckIcon, UserRoundIcon } from "lucide-react"
import { expect, fn, userEvent, within } from "storybook/test"

import { Stepper } from "./stepper"

const steps = [
  { number: 1, label: "Kişisel bilgiler", icon: UserRoundIcon },
  { number: 2, label: "Güvenlik onayı", icon: ShieldCheckIcon },
  { number: 3, label: "Başvuru özeti", icon: FileCheckIcon },
]

const meta = {
  title: "Navigation/Stepper",
  component: Stepper,
  parameters: { layout: "padded" },
  args: {
    steps,
    currentStep: 2,
    onStepChange: fn(),
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const FirstStep: Story = {
  args: { currentStep: 1 },
}

export const CurrentStep: Story = {}

export const Completed: Story = {
  args: { currentStep: 3 },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      canvas.getByRole("button", { name: /kişisel bilgiler/i }),
    )
    await expect(args.onStepChange).toHaveBeenCalledWith(1)
  },
}
