# Deploy da demo no GitHub Pages

A demo está configurada para o subcaminho:

`https://gabrielrossanesi.github.io/planoeterra/`

## Rodar localmente

```bash
npm install
npm run dev
```

Com `basePath: "/planoeterra"`, acesse:

`http://localhost:3000/planoeterra/`

## Gerar build estática

```bash
npm run build
```

ou:

```bash
npm run build:pages
```

O Next.js usa `output: "export"` e gera a pasta `out/`.

## Publicar pelo GitHub Actions

O workflow fica em `.github/workflows/github-pages.yml`.

Ele roda em push para `main`, `master` ou `demo`, executa:

- `npm ci`
- `npm run typecheck`
- `npm run build:pages`
- upload da pasta `out/`
- deploy no GitHub Pages

No GitHub, configure o Pages para usar **GitHub Actions** como source.

## Publicar manualmente

Depois de `npm run build`, a pasta `out/` contém o site estático pronto para hospedagem. Ela deve ser publicada como raiz do site Pages. O repositório já usa `basePath: "/planoeterra"`, então os links e assets apontam para o subcaminho correto.

## Se mudar o nome do repositório

Atualize em conjunto:

- `basePath` em `next.config.ts`
- `siteBasePath` em `lib/site.ts`
- `site.url` em `lib/site.ts`

Exemplo: se a URL virar `https://usuario.github.io/novo-repo/`, use `/novo-repo`.

## Limitações da exportação estática

- Não há SSR em runtime.
- Não há API routes ou backend.
- Não há middleware, redirects ou headers dinâmicos.
- Conteúdo e dados ficam locais no build.
- Imagens usam `images.unoptimized = true` para compatibilidade com export estático.
