"use client"

import type { LucideIcon } from "lucide-react"

import { cn } from "../../../lib/cn"

export type StepperStep<TStep extends number = number> = {
  number: TStep
  label: string
  icon: LucideIcon
}

export type StepperProps<TStep extends number = number> = {
  steps: StepperStep<TStep>[]
  currentStep: TStep
  onStepChange: (step: TStep) => void
  ariaLabel?: string
}

export function Stepper<TStep extends number>({
  steps,
  currentStep,
  onStepChange,
  ariaLabel = "Adımlar",
}: StepperProps<TStep>) {
  return (
    <nav aria-label={ariaLabel} className="mx-auto w-full max-w-5xl">
      <ol className="grid grid-cols-3 overflow-hidden rounded-2xl border bg-card shadow-sm">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number
          const isComplete = currentStep > step.number
          const canVisit = step.number <= currentStep
          const Icon = step.icon

          return (
            <li
              key={step.number}
              className={cn(
                "relative min-w-0 border-r last:border-r-0",
                isActive && "bg-primary/[0.04]",
              )}
            >
              <button
                type="button"
                disabled={!canVisit}
                onClick={() => onStepChange(step.number)}
                aria-current={isActive ? "step" : undefined}
                className="flex w-full items-center gap-2.5 px-3 py-3.5 text-left transition-colors enabled:hover:bg-muted/60 disabled:cursor-default sm:px-6 sm:py-5"
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors sm:size-10",
                    isActive &&
                      "border-primary bg-primary text-primary-foreground",
                    isComplete &&
                      "border-primary/20 bg-primary/10 text-primary",
                    !isActive &&
                      !isComplete &&
                      "bg-muted text-muted-foreground",
                  )}
                >
                  {isComplete ? (
                    <CheckIcon />
                  ) : (
                    <Icon className="size-4" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="hidden text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/70 sm:block">
                    {step.number}. adım
                  </span>
                  <span
                    className={cn(
                      "block truncate text-xs font-medium sm:text-sm",
                      isActive ? "text-primary" : "text-foreground",
                    )}
                  >
                    {step.label}
                  </span>
                </span>
              </button>
              {index < steps.length - 1 && (
                <span className="absolute top-1/2 right-0 z-10 hidden size-3 -translate-y-1/2 translate-x-1/2 rotate-45 border-t border-r bg-card md:block" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}
