const shortNames: Record<string, string> = {
  "domain.programming-fundamentals": "Fundamentals",
  "domain.data-structures-algorithms": "Algorithms",
  "domain.go": "Go",
  "domain.typescript-node-js": "TS / Node.js",
  "domain.python": "Python",
  "domain.git-development-workflow": "Git",
  "domain.linux-runtime-environment": "Linux",
  "domain.software-design-code-quality": "Code design",
  "domain.testing": "Testing",
  "domain.databases-sql": "Databases",
  "domain.networking-http-apis": "HTTP / APIs",
  "domain.concurrency": "Concurrency",
  "domain.distributed-systems-messaging": "Distributed systems",
  "domain.architecture-system-design": "Architecture",
  "domain.security": "Security",
  "domain.docker-ci-cd-infrastructure": "Infrastructure",
  "domain.observability-reliability": "Observability",
  "domain.performance": "Performance",
  "domain.maintenance-evolution": "Maintenance",
  "domain.product-requirements-domain": "Product",
  "domain.professional-work-autonomy": "Professional practice",
  "domain.ai-engineering": "AI engineering",
  "domain.frontend-literacy": "Frontend",
  "domain.engineering-with-ai": "AI-assisted engineering",
};

export function DomainBadge({
  domainCode,
  title,
}: {
  domainCode: string;
  title: string;
}) {
  return (
    <span
      title={title}
      aria-label={`Domain: ${title}`}
      className="inline-flex max-w-full items-center rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium leading-tight text-accent"
    >
      {shortNames[domainCode] ?? title}
    </span>
  );
}
