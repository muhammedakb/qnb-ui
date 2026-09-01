# qnb-ui

QNB Sigorta uygulamalarında kullanılmak üzere React 18/19 ve Tailwind CSS v4 ile hazırlanmış component kütüphanesi.

## Geliştirme

```bash
npm install
npm run dev
```

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

Componentleri paket kökünden kullanın:

```tsx
import { Button, Card, Input } from "@muhammedakb/qnb-ui"
```

Uygulamanın kendi Tailwind CSS kurulumu ve utility class'ları bağımsız olarak kullanılmaya devam eder. Paket CSS'i sadece kütüphane componentlerinin ihtiyaç duyduğu utility class'ları ve tasarım tokenlarını içerir.
