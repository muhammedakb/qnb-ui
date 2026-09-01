import type { Meta, StoryObj } from "@storybook/react-vite"

import { FlowSkeleton } from "./flow-skeleton"

const meta = {
  title: "Feedback/FlowSkeleton",
  component: FlowSkeleton,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background p-8 text-foreground">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FlowSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
