import { Clock, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/forms/ContactForm";
import { ChevronPattern } from "@/components/media/ChevronPattern";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { digits, hasNumber, site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Get a Free Quote",
  description: "Tell UPEDGE about your project and get a clear next step, usually within one working day.",
  path: "/contact",
});

export default function ContactPage() {
  const details = [
    { icon: Phone, label: "Phone", value: site.phone, href: hasNumber(site.phone) ? `tel:+${digits(site.phone)}` : undefined },
    { icon: EnvelopeSimple, label: "Email", value: site.email, href: site.email.includes("@") ? `mailto:${site.email}` : undefined },
    { icon: MapPin, label: "Office", value: site.address },
    { icon: Clock, label: "Hours", value: site.hours },
  ];

  return (
    <>
      <PageHero
        title="Get a free quote"
        lead="Tell us about your plot or property. We will come back with a clear next step, usually within one working day."
      />

      <section className="container-x grid gap-14 pb-24 lg:grid-cols-12 lg:gap-10 lg:pb-32">
        <Reveal className="lg:col-span-7">
          <ContactForm />
        </Reveal>

        <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
          <Reveal>
            <dl className="space-y-6">
              {details.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-accent-ink" aria-hidden="true">
                    <Icon size={20} weight="light" />
                  </span>
                  <div>
                    <dt className="text-sm text-muted">{label}</dt>
                    <dd className="mt-0.5">
                      {href ? (
                        <a href={href} className="underline-offset-4 hover:underline">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bezel">
              <div className="relative aspect-[4/3] overflow-hidden rounded-inner bg-inverse-2">
                {site.mapEmbedUrl ? (
                  <iframe
                    src={site.mapEmbedUrl}
                    title="UPEDGE office location"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <>
                    <ChevronPattern className="opacity-[0.14]" />
                    <p className="absolute inset-x-5 bottom-5 text-sm text-on-inverse-muted">
                      <span className="mb-1 block font-medium text-on-inverse">Map placeholder</span>
                      Paste a Google Maps embed URL into mapEmbedUrl in data/site.ts.
                    </p>
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </aside>
      </section>
    </>
  );
}
