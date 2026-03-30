import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have questions? Get in touch with the Primitive Informatics team.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
