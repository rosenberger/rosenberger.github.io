# rosenberger.github.io

Základný [Eleventy](https://www.11ty.dev/) projekt s **TailwindCSS** a **Stimulus**.

## Spustenie

Nainštaluj závislosti:

```bash
npm install
```

Vývoj (11ty server + watch Tailwind + watch JS bundling):

```bash
npm run dev
```

Build do `_site/`:

```bash
npm run build
```

## Štruktúra

- `src/` – zdrojové templaty a obsah
- `src/_includes/` – includes a layouty
- `src/assets/` – Tailwind input + JS entrypoint + Stimulus controllery
- `_site/` – výsledný statický web (build output)
