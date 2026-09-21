# Engineering Compass — Design

## Foundation

- Cores derivadas do portfólio, configuradas em `src/styles/tokens.css`.
- IBM Plex Sans para títulos, Geist para interface e Geist Mono para labels técnicas.
- Fundo quase preto, superfícies teal, texto frio e aqua como único destaque.
- Containers usam cantos recortados; controles usam raio pequeno.

## Implementation

- Componentes são estilizados com utilities do Tailwind CSS v4.
- `globals.css` contém apenas base global, seleção, foco e reduced motion.
- A aplicação não importa estilos ou código do portfólio em runtime.
