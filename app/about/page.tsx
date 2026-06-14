import PageContainer from "@/components/layout/PageContainer";

export default function AboutPage() {
  return (
    <PageContainer title="About ByteSpin">
      <div className="space-y-6 text-gray-300 leading-8 text-lg">

        <p>
          ByteSpin is a free online spin wheel and random picker tool created by Bytecraft Studio.
        </p>

        <p>
          Our platform helps users make random decisions, choose winners,
          pick food options, select teams, assign tasks, and create custom
          spin wheels instantly.
        </p>

        <p>
          ByteSpin is designed to be fast, simple, and completely free to use.
        </p>

      </div>
    </PageContainer>
  );
}