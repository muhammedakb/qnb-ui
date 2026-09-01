import { render, screen } from "@testing-library/react"
import { MailIcon } from "lucide-react"
import { describe, expect, it } from "vitest"

import { Input } from "../input"
import { InputShell } from "./input-shell"

describe("InputShell", () => {
  it("ikon ve child inputu birlikte render eder", () => {
    const { container } = render(
      <InputShell icon={MailIcon}>
        <Input aria-label="E-posta" />
      </InputShell>,
    )

    expect(screen.getByRole("textbox", { name: "E-posta" })).toBeInTheDocument()
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true")
  })
})
