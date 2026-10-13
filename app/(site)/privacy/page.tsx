import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How UPEDGE collects, uses and protects the information you share with us.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="[DATE]"
      sections={[
        {
          heading: "Who we are",
          body: [`${site.name} (${site.legalName}), ${site.address}. You can contact us at ${site.email}.`],
        },
        {
          heading: "Information we collect",
          body: [
            "When you submit the quote form we collect your name, phone number, email address, project type, budget range, project location and the message you write.",
            "Our hosting provider may also record technical data such as IP address and browser type in server logs.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your details to respond to your enquiry, prepare a quote and communicate about your project. We do not sell your information.",
          ],
        },
        {
          heading: "Who we share it with",
          body: [
            "We share information only with service providers that help us run the website and send email, and where the law requires it. [LIST YOUR PROVIDERS, e.g. hosting, email delivery.]",
          ],
        },
        {
          heading: "Retention and your rights",
          body: [
            "We keep enquiry details for as long as needed to deal with your request and for [RETENTION PERIOD]. You can ask us to access, correct or delete your information by emailing us.",
          ],
        },
        {
          heading: "Cookies",
          body: ["[DESCRIBE ANY ANALYTICS OR COOKIES YOU ADD. This site does not set tracking cookies by default.]"],
        },
        {
          heading: "Changes",
          body: ["We may update this policy from time to time. The date at the top shows when it last changed."],
        },
      ]}
    />
  );
}
