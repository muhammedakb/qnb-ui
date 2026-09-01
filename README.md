# qnb-ui

QNB Sigorta uygulamalarında kullanılmak üzere React 18/19 ve Tailwind CSS v4 ile hazırlanmış component kütüphanesi.

## Geliştirme

```bash
npm install
npm run dev
```

## Storybook

Component kataloğunu yerel olarak çalıştırmak için:

```bash
npm run storybook
```

Statik Storybook çıktısı ve tarayıcı tabanlı component testleri için:

```bash
npm run build-storybook
npm run test-storybook
```

Story dosyaları ilgili componentlerin yanında `*.stories.tsx` adıyla tutulur.
Storybook; light/dark tema geçişini, Controls ve Docs panellerini, etkileşim
testlerini ve otomatik erişilebilirlik kontrollerini içerir.

## Build

```bash
npm run build
npm pack --dry-run
```

## Kullanım

```bash
npm install @muhammedakb/qnb-ui
```

Uygulamanın global girişinde stil dosyasını bir kez import edin:

```ts
import "@muhammedakb/qnb-ui/styles.css"
```

Componentleri amaçlarına göre ayrılmış paket alt yollarından kullanın:

```tsx
import { Button } from "@muhammedakb/qnb-ui/actions"
import { Card } from "@muhammedakb/qnb-ui/data-display"
import { Input } from "@muhammedakb/qnb-ui/forms"
```

Kullanılabilir alt yollar: `actions`, `data-display`, `feedback`, `forms`,
`layout`, `navigation` ve `overlays`. Geriye dönük uyumluluk için paket kökü de
aynı componentleri dışa aktarmaya devam eder.

Uygulamanın kendi Tailwind CSS kurulumu ve utility class'ları bağımsız olarak kullanılmaya devam eder. Paket CSS'i sadece kütüphane componentlerinin ihtiyaç duyduğu utility class'ları ve tasarım tokenlarını içerir.
