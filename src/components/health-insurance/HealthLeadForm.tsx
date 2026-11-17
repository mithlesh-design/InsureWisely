"use client";
import type { FormEvent } from "react";
import { SelectField, TextField } from "@/components/insurance/Fields";

const MEMBERS = ["Myself", "Myself & spouse", "My family (spouse & children)", "My parents", "Whole family incl. parents"];

// Figma 1001:768 — one-row expert call-back form that overlaps the bottom of the hero photo
export function HealthLeadForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // No lead endpoint exists yet; send new FormData(event.currentTarget) to it once it does.
  };
  return <form id="get-started" className="hh-lead-card" onSubmit={handleSubmit} aria-label="Connect with a health insurance expert">
    <div className="hh-lead-fields">
      <TextField label="Full name*" name="fullName" placeholder="Enter name" autoComplete="name" required />
      <TextField label="Phone Number*" name="phone" type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} title="10-digit mobile number" placeholder="Enter number" autoComplete="tel-national" required />
      <SelectField label="Who needs cover?" name="members" placeholder="Select" options={MEMBERS} defaultValue="" required />
    </div>
    <button type="submit" className="cta cta-primary hh-lead-submit">Connect now</button>
  </form>;
}
