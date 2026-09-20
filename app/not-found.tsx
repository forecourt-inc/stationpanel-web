import { Container, CtaPair } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-28">
      <p className="label text-clear">404</p>
      <h1 className="mt-4 text-4xl font-semibold">That page is not on file.</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">Check the address, or start from one of these.</p>
      <div className="mt-8">
        <CtaPair tone="light" />
      </div>
    </Container>
  );
}
