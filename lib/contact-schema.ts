import { z } from "zod";

/** Edit these lists to change the dropdown options on the quote form. */
export const projectTypes = [
  "Residential construction",
  "Commercial construction",
  "Renovation and remodelling",
  "Interiors and fit-outs",
  "Architectural planning",
  "Project management",
  "Something else",
] as const;

export const budgetRanges = [
  "Under 25 lakh",
  "25 to 50 lakh",
  "50 lakh to 1 crore",
  "1 to 3 crore",
  "Above 3 crore",
  "Not sure yet",
] as const;

/** Shared by the browser form and the API route, so both validate identically. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\-\s\d]{7,18}$/, "Please enter a valid phone number."),
  email: z.email("Please enter a valid email address."),
  projectType: z.enum(projectTypes, { error: "Please choose a project type." }),
  budget: z.enum(budgetRanges, { error: "Please choose a budget range." }),
  location: z.string().trim().min(2, "Please tell us where the project is."),
  message: z.string().trim().min(10, "Please add a few details (at least 10 characters).").max(3000, "Please keep your message under 3000 characters."),
  /** Honeypot: real people never see or fill this. */
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
