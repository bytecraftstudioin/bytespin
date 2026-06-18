import { yesNoMetadata } from "./metadata";

export const metadata = yesNoMetadata;

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}