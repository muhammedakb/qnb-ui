import { useState } from "react"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "../index"

export function App() {
  const [name, setName] = useState("")

  return (
    <main className="min-h-screen bg-background p-8 font-sans text-foreground">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>QNB UI</CardTitle>
          <CardDescription>Component library playground</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Adınız"
          />
          <p className="text-muted-foreground">
            {name ? `Merhaba, ${name}` : "Bir isim yazın"}
          </p>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger render={<Button />}>Dialog aç</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>QNB UI hazır</DialogTitle>
                <DialogDescription>
                  Bu pencere yayınlanacak kütüphaneden render ediliyor.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter showCloseButton />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </main>
  )
}
