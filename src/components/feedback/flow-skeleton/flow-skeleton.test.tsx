import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FlowSkeleton } from "./flow-skeleton"

describe("FlowSkeleton", () => {
  it("yükleme iskeletini animasyonlu olarak render eder", () => {
    const { container } = render(<FlowSkeleton />)
    const skeleton = container.firstElementChild

    expect(skeleton).toHaveClass("animate-pulse")
    expect(skeleton?.children).toHaveLength(2)
  })
})
