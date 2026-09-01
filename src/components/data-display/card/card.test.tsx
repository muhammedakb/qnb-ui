import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

describe("Card", () => {
  it("bileşik içeriği doğru slotlarla render eder", () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Poliçe özeti</CardTitle>
          <CardDescription>Başvuru bilgileri</CardDescription>
        </CardHeader>
        <CardContent>QNB-123</CardContent>
        <CardFooter>Aktif</CardFooter>
      </Card>,
    )

    expect(screen.getByText("Poliçe özeti")).toHaveAttribute(
      "data-slot",
      "card-title",
    )
    expect(screen.getByText("Başvuru bilgileri")).toBeInTheDocument()
    expect(screen.getByText("QNB-123")).toBeInTheDocument()
    expect(screen.getByText("Aktif")).toHaveAttribute(
      "data-slot",
      "card-footer",
    )
  })

  it("small boyutunu data attribute ile yansıtır", () => {
    render(<Card data-testid="card" size="sm" />)
    expect(screen.getByTestId("card")).toHaveAttribute("data-size", "sm")
  })
})
