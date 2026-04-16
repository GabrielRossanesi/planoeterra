# Plano & Terra

Site institucional premium da Plano & Terra migrado para Next.js com App Router,
TypeScript e Tailwind CSS.

## Stack

- Next.js com App Router
- TypeScript
- Tailwind CSS
- Exportação estática (`output: "export"`)
- `@google/model-viewer` carregado sob demanda para projetos com `.glb`

## Estrutura

- `app/`: rotas, layout global, metadata, sitemap e robots
- `components/`: componentes compartilhados, Home e Projetos
- `data/`: conteúdo editorial e projetos tipados
- `lib/`: constantes do site e utilitários de contato
- `public/`: assets servidos publicamente, incluindo imagens e modelo 3D

## Comandos

```bash
npm install
npm run dev
npm run build
```

O build gera uma versão estática em `out/`, pronta para hospedagem simples.

