import React from "react";
import { metadata as sharedMetadata } from "./metadata";

// Metadata-va standard naming framework-padi export panrom
export const metadata = sharedMetadata;

// Intha core structural layout function thaan default-ah export aaganum thalaiva
export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}