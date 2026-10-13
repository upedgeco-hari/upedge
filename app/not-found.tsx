import { ChevronPattern } from "@/components/media/ChevronPattern";
import { Button } from "@/components/ui/Button";
import { cta } from "@/data/site";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100dvh] items-center overflow-hidden bg-inverse text-on-inverse" data-inverse>
      <ChevronPattern className="opacity-[0.1]" />
      <div className="container-x relative py-32">
        <h1 className="display-1 max-w-3xl text-balance">This page has not been built.</h1>
        <p className="lead mt-6 text-on-inverse-muted!">The link may be old or mistyped. Try one of these instead.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/projects" variant="outline-inverse" arrow={false}>
            {cta.projects}
          </Button>
        </div>
      </div>
    </section>
  );
}
