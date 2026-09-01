import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowRightIcon, PlusIcon } from "lucide-react"
import { expect, fn, userEvent, within } from "storybook/test"

import { Button } from "./button"

const meta = {
  title: "Actions/Button",
  component: Button,
  parameters: { layout: "centered" },
  args: {
    children: "Devam et",
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "secondary",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: [
        "default",
        "xs",
        "sm",
        "lg",
        "icon",
        "icon-xs",
        "icon-sm",
        "icon-lg",
      ],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Devam et" }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="default" />
      <Button {...args} variant="outline" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="ghost" />
      <Button {...args} variant="destructive" />
      <Button {...args} variant="link" />
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="xs" />
      <Button {...args} size="sm" />
      <Button {...args} size="default" />
      <Button {...args} size="lg" />
    </div>
  ),
}

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args}>
        <PlusIcon data-icon="inline-start" />
        Yeni kayıt
      </Button>
      <Button {...args} variant="outline">
        İlerle
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
      <Button {...args} size="icon" aria-label="Yeni kayıt">
        <PlusIcon />
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
