import { useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

const cities = {
  istanbul: "İstanbul",
  ankara: "Ankara",
}

function CitySelect({ onValueChange = vi.fn(), disabled = false }) {
  const [value, setValue] = useState("istanbul")

  return (
    <Select
      value={value}
      items={cities}
      disabled={disabled}
      onValueChange={(nextValue, eventDetails) => {
        if (nextValue) setValue(nextValue)
        onValueChange(nextValue, eventDetails)
      }}
    >
      <SelectTrigger aria-label="Şehir seçin">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="istanbul">İstanbul</SelectItem>
        <SelectItem value="ankara">Ankara</SelectItem>
      </SelectContent>
    </Select>
  )
}

describe("Select", () => {
  it("seçenek listesini açar ve seçimi değiştirir", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(<CitySelect onValueChange={onValueChange} />)
    const trigger = screen.getByRole("combobox", { name: "Şehir seçin" })
    expect(trigger).toHaveTextContent("İstanbul")

    await user.click(trigger)
    await user.click(await screen.findByRole("option", { name: "Ankara" }))

    expect(trigger).toHaveTextContent("Ankara")
    expect(onValueChange).toHaveBeenCalledWith("ankara", expect.anything())
  })

  it("disabled durumda açılmaz", async () => {
    const user = userEvent.setup()
    render(<CitySelect disabled />)
    const trigger = screen.getByRole("combobox", { name: "Şehir seçin" })

    expect(trigger).toBeDisabled()
    await user.click(trigger)
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })
})
