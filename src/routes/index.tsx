import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "RelationshipVista" },
      { name: "description", content: "RelationshipVista — a clearer view of your relationships." },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
      <article className="max-w-2xl space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">RelationshipVista</h1>
        <p>Welcome to RelationshipVista, a calm space designed to help you see your relationships clearly.</p>
        <p>We believe every connection has a story, and understanding that story is the first step toward growth.</p>
        <p>RelationshipVista brings together gentle reflection prompts and thoughtful insights in one place.</p>
        <p>Whether you're nurturing a friendship, a partnership, or a family bond, we're here to help.</p>
        <p>Track meaningful moments, notice patterns, and celebrate the people who matter most to you.</p>
        <p>Our approach is simple: less noise, more clarity, and tools that respect your time and attention.</p>
        <p>No dashboards full of metrics — just a quiet vista where your relationships can be seen honestly.</p>
        <p>This is an early preview of RelationshipVista, and we're excited to build it alongside you.</p>
        <p>Thank you for stopping by. Take a breath, look around, and enjoy the view.</p>
      </article>
    </main>
  );
}
