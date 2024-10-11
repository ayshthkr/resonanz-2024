import SIGNIUPForm from "@/components/Form/signup/SIGNIUPForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to create your account.",
};

export default function page() {
  return <SIGNIUPForm/>;
}
