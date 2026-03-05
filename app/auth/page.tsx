import Image from "next/image";
import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { SignInWithGoogle } from "./_components/sign-in-with-google";

export default async function AuthPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (session.data?.user) redirect("/");

  return (
    <div className="relative flex min-h-svh flex-col bg-black">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/login-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 flex justify-center pt-12">
        <Image src="/fit-ai-logo.svg" alt="FIT.AI" width={85} height={38} />
      </div>

      <div className="flex-1" />

      <div className="relative z-10 flex flex-col items-center gap-15 rounded-t-[20px] bg-primary px-5 pb-10 pt-12">
        <div className="flex w-full flex-col items-center gap-6">
          <h1 className="w-full text-center font-heading text-[32px] font-semibold leading-[1.05] text-primary-foreground">
            O app que vai transformar a forma como você treina.
          </h1>

          <SignInWithGoogle />
        </div>

        <p className="font-heading text-xs leading-[1.4] text-primary-foreground/70">
          ©2026 Copyright FIT.AI. Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
