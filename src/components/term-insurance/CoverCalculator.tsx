"use client";
import { useState, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/PageElements";
import { SelectField } from "@/components/insurance/Fields";

const LAKH = 1e5;
const CRORE = 1e7;
const rupees = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const oneDecimal = (value: number) => String(Math.round(value * 10) / 10);
const shortRupees = (value: number) =>
  value >= CRORE ? `₹${oneDecimal(value / CRORE)} Cr` : value >= LAKH ? `₹${oneDecimal(value / LAKH)} L` : rupees(value);

type SliderKey = "age" | "income" | "loans" | "expenses" | "existingCover";
type Slider = { key: SliderKey; label: string; values: number[]; initial: number; format: (value: number) => string };

/*
  Sliders snap to value lists. Every default sits 23% along its track, where the Figma knobs are drawn
  (age 30 of 18–70, the rest at index 3 of 14).
  The design labels the fifth slider "Outstanding Loans" a second time; it feeds the "Existing cover" result row,
  so it is labelled that way here.
*/
const SLIDERS: Slider[] = [
  { key: "age", label: "Your Age", values: Array.from({ length: 53 }, (_, i) => 18 + i), initial: 30, format: v => `${v} yrs` },
  { key: "income", label: "Annual Income", values: [0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25].map(v => v * LAKH), initial: 2 * LAKH, format: rupees },
  { key: "loans", label: "Outstanding Loans", values: [0, 10 * LAKH, 50 * LAKH, CRORE, 1.5 * CRORE, 2 * CRORE, 2.5 * CRORE, 3 * CRORE, 4 * CRORE, 5 * CRORE, 6 * CRORE, 7.5 * CRORE, 8.5 * CRORE, 10 * CRORE], initial: CRORE, format: rupees },
  { key: "expenses", label: "Monthly Family Expenses", values: [10e3, 30e3, 50e3, 70e3, LAKH, 1.25 * LAKH, 1.5 * LAKH, 1.75 * LAKH, 2 * LAKH, 2.5 * LAKH, 3 * LAKH, 4 * LAKH, 5 * LAKH, 7.5 * LAKH], initial: 70e3, format: rupees },
  { key: "existingCover", label: "Existing Cover", values: [0, LAKH, 2.5 * LAKH, 5 * LAKH, 10 * LAKH, 15 * LAKH, 25 * LAKH, 50 * LAKH, 75 * LAKH, CRORE, 1.5 * CRORE, 2 * CRORE, 3 * CRORE, 5 * CRORE], initial: 5 * LAKH, format: rupees },
];
const YEAR_RANGES = ["10 year - 15 year", "15 year - 20 year", "20 year - 25 year", "25 year - 30 year", "30 year - 35 year", "35 year - 40 year", "40 year - 45 year"];

type Estimate = { total: number; covered: number; rows: { label: string; value: number; share: number }[] };

// What the design shows before the visitor calculates anything
const DESIGN_ESTIMATE: Estimate = {
  total: 2.5 * CRORE,
  covered: 4,
  rows: [
    { label: "Income", value: 1.8 * CRORE, share: 88.27 },
    { label: "Loans", value: 50 * LAKH, share: 32 },
    { label: "Expenses", value: 25 * LAKH, share: 46.67 },
    { label: "Existing cover", value: 10 * LAKH, share: 30.67 },
  ],
};

// Indicative only: income replacement for the chosen years + loans + a household-expense buffer, less existing cover
const EXPENSE_BUFFER_YEARS = 3;
function estimateNeed(inputs: Record<SliderKey, number>, yearRange: string): Estimate {
  const [from, to] = yearRange.match(/\d+/g)!.map(Number);
  const income = inputs.income * ((from + to) / 2);
  const loans = inputs.loans;
  const expenses = inputs.expenses * 12 * EXPENSE_BUFFER_YEARS;
  const gross = income + loans + expenses;
  const existing = Math.min(inputs.existingCover, gross);
  const share = (value: number) => (gross ? (value / gross) * 100 : 0);
  return {
    total: gross - existing,
    covered: Math.round(share(existing)),
    rows: [
      { label: "Income", value: income, share: share(income) },
      { label: "Loans", value: loans, share: share(loans) },
      { label: "Expenses", value: expenses, share: share(expenses) },
      { label: "Existing cover", value: existing, share: share(existing) },
    ],
  };
}

const RING_RADIUS = 72;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

// Figma 1001:161 heading + 1001:257 calculator card
export function CoverCalculator() {
  const [indexes, setIndexes] = useState(() => Object.fromEntries(SLIDERS.map(s => [s.key, s.values.indexOf(s.initial)])) as Record<SliderKey, number>);
  const [years, setYears] = useState(YEAR_RANGES[YEAR_RANGES.length - 1]);
  const [estimate, setEstimate] = useState(DESIGN_ESTIMATE);

  const valueOf = (slider: Slider) => slider.values[indexes[slider.key]];
  const calculate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEstimate(estimateNeed(Object.fromEntries(SLIDERS.map(s => [s.key, valueOf(s)])) as Record<SliderKey, number>, years));
  };

  return <section className="section ti-calc" aria-labelledby="calc-title">
    <div className="page-container">
      <Eyebrow>Term Insurance</Eyebrow>
      <h2 id="calc-title" className="display-heading">Find out your ideal cover amount</h2>
      <div className="ti-calc-card">
        <form className="ti-calc-form" onSubmit={calculate} aria-label="Cover calculator">
          <div className="ti-calc-fields">
            {SLIDERS.map(slider => {
              const id = `calc-${slider.key}`;
              const fill = (indexes[slider.key] / (slider.values.length - 1)) * 100;
              return <div key={slider.key}>
                <div className="ti-slider-head">
                  <label className="ti-label" htmlFor={id}>{slider.label}</label>
                  <output className="ti-chip" htmlFor={id}>{slider.format(valueOf(slider))}</output>
                </div>
                <div className="ti-slider" style={{ "--fill": `${fill}%` } as CSSProperties}>
                  <input id={id} className="ti-range" type="range" min={0} max={slider.values.length - 1} step={1}
                    value={indexes[slider.key]} aria-valuetext={slider.format(valueOf(slider))}
                    onChange={event => setIndexes({ ...indexes, [slider.key]: Number(event.target.value) })} />
                </div>
              </div>;
            })}
            <SelectField full muted label="Years of income to protect" name="years" options={YEAR_RANGES} value={years} onChange={event => setYears(event.target.value)} />
          </div>
          <button type="submit" className="cta cta-primary">Calculate now</button>
        </form>

        <div className="ti-calc-result">
          <div>
            <div className="ti-estimate" aria-live="polite">
              <div className="ti-ring">
                <svg width="156" height="156" viewBox="0 0 156 156" aria-hidden="true">
                  <circle cx="78" cy="78" r={RING_RADIUS} fill="none" stroke="#fff" strokeWidth="12" />
                  {estimate.covered > 0 && <circle cx="78" cy="78" r={RING_RADIUS} fill="none" stroke="#ff7e3d" strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={`${(estimate.covered / 100) * RING_LENGTH} ${RING_LENGTH}`} transform="rotate(-90 78 78)" />}
                </svg>
                <span className="ti-ring-value">{estimate.covered}%</span>
                <span className="ti-ring-caption">already covered</span>
              </div>
              <div className="ti-estimate-copy">
                <p className="ti-estimate-label">Your estimated protection need</p>
                <p className="ti-estimate-amount">{shortRupees(estimate.total)}</p>
                <p className="ti-estimate-note">Based on the information you&apos;ve provided.</p>
              </div>
            </div>
            <ul className="ti-breakdown" aria-label="Estimate breakdown">
              {estimate.rows.map(row => <li className="ti-breakdown-row" key={row.label}>
                <span className="ti-breakdown-label">{row.label}</span>
                <span className="ti-bar" aria-hidden="true"><span style={{ width: `${row.share}%` }} /></span>
                <span className="ti-breakdown-value">{shortRupees(row.value)}</span>
              </li>)}
            </ul>
          </div>
          <div>
            <div className="ti-result-actions">
              <Link className="ti-btn ti-btn-primary" href="#get-started">Talk to an Insurance Expert</Link>
              <Link className="ti-btn ti-btn-outline" href="#get-started">Get My Personalised Recommendation</Link>
            </div>
            <p className="ti-disclaimer">This is an indicative estimate based on the information provided and should not be<br className="ti-desktop-break" /> considered financial advice or a policy quote.</p>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
