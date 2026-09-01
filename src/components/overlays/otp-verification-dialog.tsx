"use client"

import { Info, ShieldCheck } from "lucide-react"

import { Button } from "../actions/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../forms/input-otp"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog"

export type OtpVerificationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: string
  onValueChange: (value: string) => void
  onVerify: (value: string) => void
  error?: string
  codeLength?: number
  demoCode?: string
  title?: string
  description?: string
  helperText?: string
  verifyLabel?: string
}

export function OtpVerificationDialog({
  open,
  onOpenChange,
  value,
  onValueChange,
  onVerify,
  error,
  codeLength = 6,
  demoCode = "123456",
  title = "Güvenlik onayı",
  description,
  helperText,
  verifyLabel = "Kodu doğrula",
}: OtpVerificationDialogProps) {
  const resolvedDescription =
    description ??
    `Telefonunuza gönderilen ${codeLength} haneli doğrulama kodunu girin.`
  const resolvedHelperText =
    helperText ??
    `Demo akışında herhangi bir ${codeLength} haneli kod ile ilerleyebilirsiniz.`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
        <DialogHeader className="border-b px-6 py-5">
          <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="size-5" />
          </div>
          <DialogTitle className="text-lg">{title}</DialogTitle>
          <DialogDescription className="leading-relaxed">
            {resolvedDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 px-6 py-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Tek kullanımlık şifre</span>
            {demoCode && (
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                Demo kod: {demoCode}
              </span>
            )}
          </div>
          <InputOTP
            maxLength={codeLength}
            value={value}
            onChange={onValueChange}
            onComplete={onVerify}
            containerClassName="justify-center"
            aria-label="Tek kullanımlık şifre"
            aria-invalid={!!error}
          >
            <InputOTPGroup className="gap-2">
              {Array.from({ length: codeLength }, (_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="size-11 rounded-lg border text-base first:rounded-lg last:rounded-lg"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p role="alert" className="text-center text-sm text-destructive">
              {error}
            </p>
          )}
          <div className="flex gap-2 rounded-xl border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" />
            {resolvedHelperText}
          </div>
        </div>
        <DialogFooter className="m-0 justify-stretch rounded-none px-6 py-4 sm:justify-stretch">
          <Button
            type="button"
            onClick={() => onVerify(value)}
            className="h-10 w-full"
          >
            {verifyLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
