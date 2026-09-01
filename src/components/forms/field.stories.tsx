import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "./field"
import { Input } from "./input"

const meta = {
  title: "Forms/Field",
  component: Field,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const FormGroup: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>İletişim bilgileri</FieldLegend>
      <FieldDescription>
        Poliçe bildirimleri için kullanılacak bilgiler.
      </FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-name">Ad soyad</FieldLabel>
          <Input id="field-name" placeholder="Ad soyad" />
        </Field>
        <Field>
          <FieldLabel htmlFor="field-phone">Telefon</FieldLabel>
          <Input id="field-phone" type="tel" placeholder="05xx xxx xx xx" />
        </Field>
        <FieldSeparator>veya</FieldSeparator>
        <Field data-invalid="true">
          <FieldLabel htmlFor="field-email">E-posta</FieldLabel>
          <Input id="field-email" type="email" aria-invalid="true" />
          <FieldError errors={[{ message: "Bu alan zorunludur." }]} />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal">
      <FieldLabel htmlFor="customer-number">Müşteri numarası</FieldLabel>
      <Input id="customer-number" className="w-48" />
    </Field>
  ),
}
