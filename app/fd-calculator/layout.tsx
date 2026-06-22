import React from "react";
import { metadata as sharedMetadata } from "./metadata";

export const metadata = sharedMetadata;

export default function FdCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}