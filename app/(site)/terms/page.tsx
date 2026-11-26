import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms",
  description: "The terms that apply to your use of the UPEDGE website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      updated="26 November 2026"
      sections={[
        {
          heading: "Using this website",
          body: [
            `This website is operated by ${site.name}, ${site.address}. By using it you agree to these terms. If you do not agree, please do not use the site.`,
          ],
        },
        {
          heading: "Information on this site",
          body: [
            "The content here is general information about our services and work. We try to keep it accurate, but services, availability and details can change without notice.",
          ],
        },
        {
          heading: "Designs, photographs and videos",
          body: [
            "Images marked as 3D design are visualisations. They show a design idea and are not photographs of a finished building. Materials, colours, planting, lighting, furniture, vehicles and surroundings in them may differ from what is built.",
            "Site photographs show particular projects at a particular time, some of them while work was still in progress. Your project will differ according to your plot, budget, approvals and choices.",
          ],
        },
        {
          heading: "Quotes and estimates",
          body: [
            "Asking for a quote is free and does not commit you or us to any work. Sending the form opens a WhatsApp message; it is a request for discussion, not a booking or a contract.",
            "Nothing on this website is a binding offer. Scope, price, payment stages, timeline and warranties apply only once they are agreed in writing between you and us. Where that written agreement differs from this website, the agreement applies.",
          ],
        },
        {
          heading: "Advice and articles",
          body: [
            "Articles and answers to questions on this site are general guidance. They are not engineering, legal or financial advice for your property. Please talk to us or a qualified professional before acting on them.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            `The ${site.name} name, logo, designs, text, photographs and videos on this site belong to ${site.name} or their respective owners. You may view and share links to them, but you may not copy, reuse or build from our designs without written permission.`,
            "Comments quoted from Instagram belong to the people who wrote them.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "Do not misuse the site, try to gain unauthorised access to it, disrupt it, copy its content in bulk, or send us false or unlawful information through it.",
          ],
        },
        {
          heading: "Links and other services",
          body: [
            "The site links to or includes services such as WhatsApp, Instagram and Google Maps. We do not control them, and their own terms apply when you use them.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "We take care to keep the site accurate and available, but we do not guarantee that it will be uninterrupted or free of errors. To the extent the law allows, we are not liable for loss arising from your use of the site or reliance on its content. Nothing in these terms limits rights you have under law that cannot be limited.",
          ],
        },
        {
          heading: "Privacy",
          body: ["Our Privacy Policy explains how information is handled when you use this website."],
        },
        {
          heading: "Governing law",
          body: ["These terms are governed by the laws of India. Courts in Madurai, Tamil Nadu have jurisdiction over any dispute about this website."],
        },
        {
          heading: "Changes and contact",
          body: [
            "We may update these terms from time to time. The date at the top shows when they last changed.",
            `Questions about these terms: ${site.phone} (call or WhatsApp), ${site.email}.`,
          ],
        },
      ]}
    />
  );
}
