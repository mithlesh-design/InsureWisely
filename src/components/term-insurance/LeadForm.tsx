"use client";
import type { FormEvent } from "react";
import { SelectField, TextField } from "@/components/insurance/Fields";

const AGE_BANDS = ["18 – 25", "26 – 35", "36 – 45", "46 – 55", "56 – 65"];
const CITIES = ["Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Other"];
const INCOME_BANDS = ["Below ₹5 L", "₹5 L – ₹10 L", "₹10 L – ₹25 L", "₹25 L – ₹50 L", "Above ₹50 L"];

// Figma 1001:232 — expert call-back form
export function LeadForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // No lead endpoint exists yet; send new FormData(event.currentTarget) to it once it does.
  };
  return <form id="get-started" className="ti-lead-card" onSubmit={handleSubmit} aria-label="Connect with an insurance expert">
    <div className="ti-fields">
      <TextField label="First name*" name="firstName" placeholder="Enter name" autoComplete="given-name" required />
      <TextField label="Last name" name="lastName" placeholder="Enter name" autoComplete="family-name" />
      <TextField full label="Phone Number*" name="phone" type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} title="10-digit mobile number" placeholder="Enter number" autoComplete="tel-national" required />
      <SelectField label="Age" name="age" placeholder="Select" options={AGE_BANDS} defaultValue="" required />
      <SelectField label="City" name="city" placeholder="Select" options={CITIES} defaultValue="" required />
      <SelectField full label="Annual Income" name="annualIncome" placeholder="Select" options={INCOME_BANDS} defaultValue="" required />
    </div>
    <button type="submit" className="cta cta-primary">Connect with Expert (FREE)</button>
  </form>;
}
