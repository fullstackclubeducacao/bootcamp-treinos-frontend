"use client";

import Image from "next/image";
import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";

export default function AuthPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;
  if (session) redirect("/");

  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    if (error) {
      console.error(error.message);
    }
  };

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

          <Button
            onClick={handleGoogleLogin}
            className="h-[38px] rounded-full bg-white px-6 text-black hover:bg-white/90"
          >
            <Image
              src="/google-icon.svg"
              alt=""
              width={16}
              height={16}
              className="shrink-0"
            />
            Fazer login com Google
          </Button>
        </div>

        <p className="font-heading text-xs leading-[1.4] text-primary-foreground/70">
          ©2026 Copyright FIT.AI. Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}
