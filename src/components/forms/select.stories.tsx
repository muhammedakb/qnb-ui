import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, waitFor, within } from "storybook/test"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"

const cities = {
  istanbul: "İstanbul",
  bursa: "Bursa",
  ankara: "Ankara",
  eskisehir: "Eskişehir",
}

type CitySelectProps = {
  initialValue: keyof typeof cities
  disabled?: boolean
  onValueChange: (value: string, eventDetails: unknown) => void
}

function CitySelect({
  initialValue,
  disabled,
  onValueChange,
}: CitySelectProps) {
  const [value, setValue] = useState<string>(initialValue)

  return (
    <Select
      value={value}
      items={cities}
      disabled={disabled}
      onValueChange={(nextValue, eventDetails) => {
        if (nextValue) setValue(nextValue)
        onValueChange(nextValue ?? "", eventDetails)
      }}
    >
      <SelectTrigger className="w-56" aria-label="Şehir seçin">
        <SelectValue placeholder="Şehir seçin" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Marmara</SelectLabel>
          <SelectItem value="istanbul">İstanbul</SelectItem>
          <SelectItem value="bursa">Bursa</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>İç Anadolu</SelectLabel>
          <SelectItem value="ankara">Ankara</SelectItem>
          <SelectItem value="eskisehir">Eskişehir</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const meta = {
  title: "Forms/Select",
  component: CitySelect,
  parameters: { layout: "centered" },
  args: {
    initialValue: "istanbul",
    onValueChange: fn(),
  },
} satisfies Meta<typeof CitySelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SelectAnOption: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("combobox", { name: "Şehir seçin" }))

    const portal = within(document.body)
    await userEvent.click(await portal.findByRole("option", { name: "Ankara" }))

    await expect(args.onValueChange).toHaveBeenCalledWith(
      "ankara",
      expect.anything(),
    )
    await expect(canvas.getByRole("combobox")).toHaveTextContent("Ankara")
    await waitFor(() => {
      expect(portal.queryByRole("listbox")).not.toBeInTheDocument()
    })
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
