Usamos as seguintes ferramentas para interagir com a API do projeto:

- Orval (https://orval.dev/) para gerar funções e tipos
- TanStack Query (integrado com o Orval)

## Regras

- **EVITE** transformar páginas inteiras em Client Components.
- Prefira fazer o fetching de dados em Server Components sempre que possível.
- **SEMPRE** Use as funções presentes em @lib/api/generated para fazer fetching de dados em Client Components.
- **SEMPRE** use TanStack Query Query para fazer todo data fetching no client-side (Client Components) e, para isso, **SEMPRE** use os hooks presentes em @lib/api/generated.
- Caso você precise de uma função que não está presente em @lib/api/generated, execute o comando `npx orval` para gerar os arquivos novamente. Caso a função ainda não esteja presente após a execução do comando, INTERROMPA a sua resposta e avise o usuário.
- Ao chamar o `authClient`, **NUNCA** o coloque dentro de um `try, catch`. **SEMPRE** faça o destructuring do `error` que vem do seu resultado e trate isso corretamente. Exemplo: `const { error } = await authClient.changePassword({})`
- **SEMPRE** chame a variação síncrona da mutation ao usar hooks de @lib/api/generated. Nesses casos, **SEMPRE** lide com o casso de sucesso e erro por meio dos parâmetros `onError` e `onSuccess`. Exemplo:

  ```tsx
  const { mutateAsync: createGateway, isPending: isCreating } =
    useCreateStorePaymentGatewayIntegration();

  const onSubmit = (payload) => {
    createCondition(
      {
        storeId,
        data: payload,
      },
      {
        onSuccess: () => {
          toast.success("Configuração de frete criada com sucesso!");
          queryClient.invalidateQueries({
            queryKey: getGetStoreShippingCostConditionsQueryKey(storeId),
          });
          onClose();
        },
        onError: (error) => {
          if (
            error.response?.data.code === "ShippingCostConditionConflictError"
          ) {
            return toast.error(
              "Já existe uma configuração de frete ativa para este período."
            );
          }
          const errorMessage =
            error?.response?.data?.message ||
            "Erro ao criar configuração de frete.";
          toast.error(errorMessage);
        },
      }
    );
  };
  ```

## Data Fetching: Server-side e Client-side

- **PRIORIZE** fazer fetching de dados no server-side com o `fetch` e usar o resultado da resposta como `initialData` nos hooks gerados do TanStack Query.
- Ao fazer data fetching no server-side, **SEMPRE** use as funções exportadas de @lib/api/fetch-generated/index.ts.
- Ao fazer data-fetching no client-side, **SEMPRE** use os hooks exportados de @lib/api/rc-generated/index.ts.

Exemplo:

```tsx
// page.tsx (Server Component)
import { getHomeDate } from "@/lib/api/fetch-generated";

const Home = async () => {
  const data = await getHomeDate(new Date());

  return <ClientComponent data={data} />;
};

export default Home;

// client-component.tsx (Client Component)
import { useGetHomeDate } from "@/lib/api/rc-generated";

export const ClientComponent = (props) => {
  const result = useGetHomeDate(props.today, {
    query: { initialData: props.data },
  });

  return <></>;
};
```
