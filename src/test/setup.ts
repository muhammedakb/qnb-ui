import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

class ResizeObserverMock implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = "0px"
  readonly thresholds = []

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

vi.stubGlobal("ResizeObserver", ResizeObserverMock)
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock)

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

if (!window.PointerEvent) {
  vi.stubGlobal("PointerEvent", MouseEvent)
}

Element.prototype.scrollIntoView = vi.fn()

document.elementFromPoint = vi.fn(() => null)
document.elementsFromPoint = vi.fn(() => [])
