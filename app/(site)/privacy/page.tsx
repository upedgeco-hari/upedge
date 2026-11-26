import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How UPEDGE collects, uses and protects the information you share with us.",
  path: "/privacy",
});

const contact = `${site.phone} (call or WhatsApp), ${site.email}`;

/* Keep this page true to the site: update it when a form, analytics tool or embed changes. */
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="26 November 2026"
      sections={[
        {
          heading: "Who we are",
          body: [
            `${site.name} is a construction business offering planning, construction, interiors, design and landscaping. Our office is at ${site.address}.`,
            `This policy explains what happens to your information when you use this website or contact us through it. You can reach us on ${contact}.`,
          ],
        },
        {
          heading: "Information you give us",
          body: [
            "The quote form asks for your name, phone number, project type, budget range, project location and a message about your project.",
            "The form does not send these details to a server of ours. It writes them into a WhatsApp chat addressed to us, and we receive them only when you press send in WhatsApp. WhatsApp is run by Meta and handles your messages under its own terms and privacy policy.",
            "If you call us, email us or message us on WhatsApp or Instagram, we receive your number, address or profile name along with whatever you share.",
          ],
        },
        {
          heading: "Information stored in your browser",
          body: [
            "So that a half-finished request is not lost, what you type into the quote form is saved in your own browser. It stays on your device until you choose Start fresh on the form or clear your browser data. If you share the device, clear it when you are done.",
          ],
        },
        {
          heading: "Cookies and third-party services",
          body: [
            "We do not run advertising or analytics trackers on this website, and we do not set cookies of our own.",
            "This website is hosted by Vercel, which may record technical data such as your IP address, browser type and the pages requested, to deliver and protect the site.",
            "The contact page shows a Google Maps map of our office. Loading it connects your browser to Google, which may collect technical data and set cookies under Google's privacy policy.",
            "Links to Instagram and WhatsApp take you to services run by Meta, which apply their own policies.",
          ],
        },
        {
          heading: "Photos and comments from our Instagram",
          body: [
            "This website shows photographs and video stills from our Instagram account, including homes, project locations, our team and workers at site, and people at ceremonies such as bhoomi poojas and housewarmings. It also shows some public comments from our posts, with the commenter's username.",
            "If you appear in a photo, own a property shown here or wrote a comment, and you want it removed, tell us and we will take it down.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "We use your details to reply to your enquiry, arrange site visits, prepare estimates, carry out work you have asked for and keep the records that work and the law require.",
            "We do not sell your information.",
          ],
        },
        {
          heading: "Who we share it with",
          body: [
            "Within our business, your details are seen by the people handling your enquiry or project. Where a project needs it, we share relevant details with consultants, contractors, suppliers or authorities, for example when preparing approvals.",
            "We also share information where the law requires it. The services named above process data as part of providing the website, maps and messaging.",
          ],
        },
        {
          heading: "How long we keep it",
          body: [
            "We keep enquiry details only as long as we need them to deal with your request or project, and to meet legal, tax and warranty obligations. After that we delete them.",
          ],
        },
        {
          heading: "Your choices and rights",
          body: [
            "You can ask what information we hold about you, ask us to correct or delete it, or withdraw your permission for us to contact you. Some records may need to be kept where the law requires it.",
            `To make a request or raise a concern, contact us on ${contact}.`,
          ],
        },
        {
          heading: "Security",
          body: ["We take reasonable care to protect your information. No website or messaging service can be guaranteed completely secure."],
        },
        {
          heading: "Changes",
          body: ["We may update this policy from time to time. The date at the top shows when it last changed."],
        },
      ]}
    />
  );
}
