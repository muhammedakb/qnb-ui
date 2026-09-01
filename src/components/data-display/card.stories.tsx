import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "../actions/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

const meta = {
  title: "Data Display/Card",
  component: Card,
  parameters: { layout: "centered" },
  args: {
    size: "default",
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["default", "sm"],
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-96">
      <CardHeader>
        <CardTitle>Poliçe özeti</CardTitle>
        <CardDescription>
          Sağlık sigortası başvurunuzun güncel durumu.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Detay
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-3">
          <div>
            <dt className="text-muted-foreground">Poliçe no</dt>
            <dd className="font-medium">QNB-102938</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Durum</dt>
            <dd className="font-medium text-primary">Aktif</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>Son güncelleme: bugün 14:30</CardFooter>
    </Card>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Hızlı bilgi</CardTitle>
        <CardDescription>Kompakt kart görünümü.</CardDescription>
      </CardHeader>
      <CardContent>İçerik alanı</CardContent>
    </Card>
  ),
}
