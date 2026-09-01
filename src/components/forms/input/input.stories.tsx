import type { Meta, StoryObj } from "@storybook/react-vite"
import { MailIcon } from "lucide-react"

import { Field, FieldDescription, FieldError, FieldLabel } from "../field"
import { InputShell } from "../input-shell"
import { Input } from "./input"

const meta = {
  title: "Forms/Input",
  component: Input,
  parameters: { layout: "centered" },
  args: {
    "aria-label": "Adınız",
    placeholder: "Adınızı girin",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="email">E-posta adresi</FieldLabel>
      <InputShell icon={MailIcon}>
        <Input
          {...args}
          id="email"
          type="email"
          aria-label={undefined}
          className="pl-10"
          placeholder="ornek@qnb.com.tr"
        />
      </InputShell>
      <FieldDescription>Bildirimler bu adrese gönderilir.</FieldDescription>
    </Field>
  ),
}

export const Invalid: Story = {
  render: (args) => (
    <Field data-invalid="true">
      <FieldLabel htmlFor="invalid-email">E-posta adresi</FieldLabel>
      <Input
        {...args}
        id="invalid-email"
        type="email"
        value="gecersiz-adres"
        aria-label={undefined}
        aria-invalid="true"
        readOnly
      />
      <FieldError>Geçerli bir e-posta adresi girin.</FieldError>
    </Field>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Değiştirilemez değer",
  },
}

export const File: Story = {
  args: {
    type: "file",
    "aria-label": "Belge yükle",
    placeholder: undefined,
  },
}
