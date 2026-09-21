import Link from "next/link";
import { EvidenceComposer } from "@/components/evidence-composer";
import { IconArrow, IconEvidence, IconLibrary, IconOverview, IconRoute, IconSettings } from "@/components/icons";
import { PRODUCT } from "@/config/product";
import { dashboardSnapshot } from "@/data/dashboard";

const navigation = [
  { label: "Visão geral", href: "#visao-geral", icon: IconOverview, active: true },
  { label: "Roadmap", href: "#roadmap", icon: IconRoute, active: false },
  { label: "Evidências", href: "#evidencias", icon: IconEvidence, active: false },
  { label: "Biblioteca", href: "#biblioteca", icon: IconLibrary, active: false },
] as const;

function BrandMark() {
  return (
    <Link className="brand-mark" href="#visao-geral" aria-label={`${PRODUCT.name} — visão geral`}>
      <span className="brand-glyph" aria-hidden="true"><i /><i /><i /></span>
      <span><strong>Engineering</strong><em>Compass</em></span>
    </Link>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <BrandMark />
      <nav className="primary-nav" aria-label="Navegação principal">
        {navigation.map(({ label, href, icon: Icon, active }) => (
          <a key={label} href={href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
            <Icon className="icon" />
            {label}
          </a>
        ))}
      </nav>
      <div className="sidebar-spacer" />
      <div className="profile-card">
        <span className="profile-avatar" aria-hidden="true">ML</span>
        <span><strong>Misael Lima</strong><small>Jornada pessoal</small></span>
      </div>
      <a className="settings-link" href="#configuracoes"><IconSettings className="icon" /> Configurações</a>
      <a className="ecosystem-link" href={PRODUCT.portfolioUrl} target="_blank" rel="noreferrer">misaellima<span>.</span>com ↗</a>
    </aside>
  );
}

function MobileHeader() {
  return (
    <header className="mobile-header">
      <BrandMark />
      <details className="mobile-menu">
        <summary>Navegar</summary>
        <nav aria-label="Navegação móvel">
          {navigation.map(({ label, href, icon: Icon }) => (
            <a href={href} key={label}><Icon className="icon" />{label}</a>
          ))}
        </nav>
      </details>
    </header>
  );
}

function RouteField() {
  return (
    <section className="route-field" aria-labelledby="route-title">
      <div className="route-heading">
        <div><h2 id="route-title">Rumo atual</h2><p>{dashboardSnapshot.currentFocus}</p></div>
        <span className="coordinate">BRG 042° · SEM 38</span>
      </div>
      <div className="bearing" aria-label={`${dashboardSnapshot.overallProgress}% da jornada mapeada`}>
        <div className="bearing-axis"><span style={{ width: `${dashboardSnapshot.overallProgress}%` }} /></div>
        <div className="bearing-points" aria-hidden="true">
          <span className="origin">Início</span>
          <span className="current" style={{ left: `${dashboardSnapshot.overallProgress}%` }}>Agora</span>
          <span className="checkpoint">Próximo marco</span>
        </div>
      </div>
      <div className="route-details">
        <div className="progress-reading"><strong>{dashboardSnapshot.overallProgress}<small>%</small></strong><span>da jornada mapeada</span></div>
        <div className="checkpoint-copy"><span>Próximo checkpoint</span><p>{dashboardSnapshot.nextCheckpoint}</p></div>
        <EvidenceComposer />
      </div>
    </section>
  );
}

function DomainMap() {
  return (
    <section id="roadmap" className="section-block" aria-labelledby="domains-title">
      <div className="section-heading">
        <div><h2 id="domains-title">Mapa de competências</h2><p>Quatro territórios para construir amplitude e profundidade.</p></div>
        <a href="#roadmap" className="text-link">Abrir roadmap <IconArrow className="icon" /></a>
      </div>
      <div className="domain-list">
        {dashboardSnapshot.domains.map((domain, index) => (
          <article className="domain-row" key={domain.name}>
            <span className="domain-index">{String(index + 1).padStart(2, "0")}</span>
            <div className="domain-copy"><h3>{domain.name}</h3><p>{domain.description}</p></div>
            <div className="domain-progress"><div><span style={{ width: `${domain.progress}%` }} /></div><small>{domain.completed} de {domain.total} marcos</small></div>
            <strong>{domain.progress}%</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function EvidenceLog() {
  return (
    <section id="evidencias" className="section-block evidence-section" aria-labelledby="evidence-title">
      <div className="section-heading">
        <div><h2 id="evidence-title">Diário de evidências</h2><p>Registros demonstrativos para visualizar o formato futuro.</p></div>
        <span className="sample-label">dados de demonstração</span>
      </div>
      <div className="evidence-log">
        {dashboardSnapshot.recentEvidence.map((item) => (
          <article className="evidence-row" key={item.title}>
            <span className="evidence-type">{item.type}</span>
            <div><h3>{item.title}</h3><p>{item.domain}</p></div>
            <time>{item.date}</time>
            <button type="button" aria-label={`Abrir ${item.title}`}><IconArrow className="icon" /></button>
          </article>
        ))}
      </div>
    </section>
  );
}

function WeekPanel() {
  return (
    <aside className="week-panel" aria-labelledby="week-title">
      <div><h2 id="week-title">Pulso da semana</h2><span>{dashboardSnapshot.weeklyCompleted}/{dashboardSnapshot.weeklyTarget} sessões</span></div>
      <div className="week-track" aria-hidden="true">{Array.from({ length: dashboardSnapshot.weeklyTarget }).map((_, index) => <i className={index < dashboardSnapshot.weeklyCompleted ? "complete" : undefined} key={index} />)}</div>
      <p>Mais duas sessões fecham o plano da semana. Constância antes de velocidade.</p>
    </aside>
  );
}

export default function Home() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
      <Sidebar />
      <MobileHeader />
      <main id="main-content" className="main-content">
        <div className="dashboard-frame" id="visao-geral">
          <header className="page-heading">
            <div><h1>Seu rumo em engenharia</h1><p>Transforme estudo em progresso que você consegue explicar e demonstrar.</p></div>
            <div className="heading-meta">
              <span className="snapshot-label">prévia · dados demonstrativos</span>
              <div className="date-stamp"><span>20 SET 2026</span><small>Maceió · UTC−3</small></div>
            </div>
          </header>
          <RouteField />
          <div className="dashboard-grid"><DomainMap /><WeekPanel /></div>
          <EvidenceLog />
          <section id="biblioteca" className="quiet-section"><h2>Biblioteca em preparação</h2><p>Recursos e referências serão conectados aos marcos do roadmap em uma próxima etapa.</p></section>
          <footer className="app-footer" id="configuracoes"><span>Engineering Compass · base inicial</span><a href={PRODUCT.portfolioUrl}>Parte do ecossistema misaellima.com</a></footer>
        </div>
      </main>
    </div>
  );
}
