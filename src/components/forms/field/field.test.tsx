import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "./field"
import { Input } from "../input"

describe("Field", () => {
  it("label ile input arasında erişilebilir ilişki kurar", () => {
    render(
      <Field>
        <FieldLabel htmlFor="email">E-posta</FieldLabel>
        <Input id="email" />
        <FieldDescription>İletişim adresiniz.</FieldDescription>
      </Field>,
    )

    expect(screen.getByRole("textbox", { name: "E-posta" })).toBeInTheDocument()
    expect(screen.getByText("İletişim adresiniz.")).toBeInTheDocument()
  })

  it("tekil hata mesajlarını tekrar etmeden listeler", () => {
    render(
      <FieldError
        errors={[
          { message: "Bu alan zorunludur." },
          { message: "Bu alan zorunludur." },
          { message: "En az 3 karakter girin." },
        ]}
      />,
    )

    const alert = screen.getByRole("alert")
    expect(alert).toHaveTextContent("Bu alan zorunludur.")
    expect(alert).toHaveTextContent("En az 3 karakter girin.")
    expect(screen.getAllByText("Bu alan zorunludur.")).toHaveLength(1)
  })

  it("içerik olmadığında hata alanı render etmez", () => {
    const { container } = render(<FieldError errors={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
})
