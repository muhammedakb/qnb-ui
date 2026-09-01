import type { Meta, StoryObj } from "@storybook/react-vite"

import { Separator } from "./separator"

const meta = {
  title: "Layout/Separator",
  component: Separator,
  parameters: { layout: "centered" },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="w-80 space-y-3">
      <p className="text-sm font-medium">Teminat bilgileri</p>
      <Separator {...args} />
      <p className="text-sm text-muted-foreground">İçerik alanı</p>
    </div>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div className="flex h-8 items-center gap-4">
      <span>Poliçeler</span>
      <Separator {...args} />
      <span>Hasarlar</span>
    </div>
  ),
}
