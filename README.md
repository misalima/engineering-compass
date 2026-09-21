# Engineering Compass

Plataforma pessoal para orientar estudos, registrar evidências e acompanhar o desenvolvimento em engenharia de software. O projeto será publicado em [skills.misaellima.com](https://skills.misaellima.com).

## Desenvolvimento

Requisitos: Node.js 20+ e pnpm 10.27.0.

```bash
pnpm install
pnpm dev
```

Verificações principais:

```bash
pnpm lint
pnpm build
```

## Arquitetura visual

O Engineering Compass compartilha o DNA visual do portfólio, mas não depende dele em runtime.

- `src/styles/tokens.css`: ponte de marca e tokens semânticos do produto. Se cores ou tipografia do portfólio mudarem, este é o primeiro ponto de atualização.
- `src/config/product.ts`: nome, domínio, descrição e vínculo com o ecossistema.
- `src/data/dashboard.ts`: modelo e conteúdo demonstrativo do dashboard inicial.
- `DESIGN.md`: regras duráveis do sistema visual e decisões de interface.
- `PRODUCT.md`: propósito, princípios e restrições do produto.

Os componentes consomem tokens semânticos (`--canvas`, `--surface-*`, `--ink-*`, `--accent`) em vez de valores do portfólio. Isso permite atualizar a ponte de marca sem reconstruir a interface.

## Escopo desta base

O dashboard atual demonstra a arquitetura da aplicação, a navegação, o mapa de competências e o fluxo local de registro de evidência. Os dados são ilustrativos e não são persistidos. Modelagem definitiva do roadmap, autenticação e persistência ficam para as próximas etapas.
