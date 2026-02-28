## Componentes

- Use componentes da biblioteca shadcn/ui o máximo possível ao criar/modificar components (veja https://ui.shadcn.com/ para a lista de componentes disponíveis).
- Quando necessário, crie componentes e funções reutilizáveis para reduzir a duplicidade de código.
- Antes de criar um novo componente, **SEMPRE** use Context7 para verificar se já existe um componente do shadcn/ui que possa ser utilizado. Caso exista, instale-o.

## Formulários

- SEMPRE use Zod para validação de formulários.
- Sempre use React Hook Form para criação e validação de formulários. SEMPRE use o componente @components/ui/form.tsx para criar formulários.

Exemplo de formulário:

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function ProfileForm() {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Estilização

- **NUNCA** use cores hard-coded do Tailwind, mas **SEMPRE** as cores do tema que estão em @app/globals.css
- Antes de criar uma nova variável de cor, **SEMPRE** busque na documentação do shadcn/ui sobre theming e veja se realmente é necessário.
- **SEMPRE** veja os componentes que podem ser reutilizados para construção de uma página em @components/ui/page.tsx.

## Imagens

- **SEMPRE** use o componente `Image` do Next para renderizar imagens.
