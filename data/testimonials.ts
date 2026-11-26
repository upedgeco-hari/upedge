import type { Testimonial } from "@/lib/types";

const comment = (name: string, quote: string, post: string): Testimonial => ({
  name,
  quote,
  role: "Comment on Instagram",
  href: `https://www.instagram.com/reel/${post}/`,
});

/**
 * Public comments on @upedge_co reels. Words and spelling are as posted, with emoji left out.
 * These are viewers' comments, not verified client reviews, so the section heading must keep
 * saying they come from Instagram. Do not lengthen or rewrite them. An empty list hides the section.
 */
export const testimonials: Testimonial[] = [
  comment("@tenashkumar.mani_24", "I need to build my home like this already I have plans you can do ?", "DHgK8YIhC5D"),
  comment("@drbalacu", "What a masterpiece! The design and execution are just wow.", "DZuvEhKTqo4"),
  comment("@venkatesh.kumar.3954546", "Eagerly waiting to see the interior of the house!!", "DZuvEhKTqo4"),
  comment("@saravanankmu", "நான் ரொம்ப சந்தோஷமா இருக்கேன் தம்பி", "DFj-lKUhpfW"),
  comment("@rp_homes_and_designs", "Looks great, what is the width of the strip light ?", "Df7LHeQIxkC"),
  comment("@goldy379", "It represnts life it self in ture form of happiness", "DXPIJoDAXHF"),
  comment("@_shyju.vc_", "Very realistic 3D animation 99 out of 100", "DXPIJoDAXHF"),
  comment("@karthick_signature", "Very nice bro I call u in future", "C9cYKZKhblw"),
  comment("@ruslan_rj___", "Risky stair but trendfull for house", "DcnrI5fABqv"),
  comment("@siddu_sgr", "Sir superb plz update interior view", "DHOIK9eBkXJ"),
  comment("@_bala_atman", "Boundary wall it's nice", "DIGxKPPhlI1"),
  comment("@mytonbuildingmaterial", "Beautifully designed", "DHgK8YIhC5D"),
  comment("@vijay_dechu", "So beautiful", "DHOIK9eBkXJ"),
  comment("@prasitha", "Ultimate, Bro", "DZuvEhKTqo4"),
  comment("@krishnangobi", "SUPER SIR", "DavIRYZNPdN"),
];
