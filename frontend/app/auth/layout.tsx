import { Container } from "@/components/ui/container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      maxWidth="xl"
      className="py-8 flex h-screen m-auto w-full flex-col items-center justify-center p-4"
    >
      {children}
    </Container>
  );
}
