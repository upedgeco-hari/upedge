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
      updated="[DATE]"
      sections={[
        {
          heading: "Using this website",
          body: [
            `This website is operated by ${site.name} (${site.legalName}). By using it you agree to these terms. If you do not agree, please do not use the site.`,
          ],
        },
        {
          heading: "Information on this site",
          body: [
            "Project descriptions, images and estimates are provided for general information. Nothing on this site is a binding offer. A quote or contract is only binding once agreed in writing.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            `The content, logo and photography on this site belong to ${site.name} or its licensors. You may not copy or reuse them without written permission.`,
          ],
        },
        {
          heading: "Liability",
          body: [
            "We take care to keep the site accurate and available, but we do not guarantee that it will be error-free. To the extent the law allows, we are not liable for loss arising from your use of it.",
          ],
        },
        {
          heading: "Governing law",
          body: ["These terms are governed by the laws of [JURISDICTION]."],
        },
        {
          heading: "Contact",
          body: [`Questions about these terms can be sent to ${site.email}.`],
        },
      ]}
    />
  );
}
