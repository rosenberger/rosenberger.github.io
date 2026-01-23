---
title: "flex-direction a prístupnosť vo flexboxe"
excerpt: "Ako môže flex-direction:row-reverse pomôcť udržať logické poradie v DOM (tab order) a pritom otočiť vizuálne rozloženie — a na čo si dať pozor."
tags: posts
layout: layouts/post.njk
date: 2026-01-23
---

`flex-direction: row-reverse;` otočí smer hlavnej osi flex kontajnera. V praxi to znamená, že prvky sa **vykreslia v opačnom poradí** (sprava doľava), aj keď ich HTML poradie zostane rovnaké.

To sa môže hodiť pri prístupnosti cez klávesnicu vtedy, keď chceš:

- **zachovať logické poradie v DOM** (čo typicky určuje poradie pri `Tab`)
- ale **zmeniť vizuálne rozloženie** bez toho, aby si prehadzoval HTML (napr. kvôli čítačkám, SEO, alebo zdieľaným komponentom)

## Typický príklad: hlavný obsah má byť “prvý”, ale vizuálne napravo

Povedzme, že chceš mať na desktop-e sidebar vizuálne vľavo, ale pre klávesnicu (a čítačky) chceš mať hlavný obsah skôr.

HTML necháš “logicky”:

```html
<div class="layout">
  <main>…hlavný obsah…</main>
  <aside>…sidebar…</aside>
</div>
```

CSS spraví vizuálne otočenie:

```css
.layout {
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
}
```

Výsledok:

- **DOM/Tab poradie**: `main` → `aside`
- **vizuálne poradie**: `aside` (vľavo) → `main` (vpravo)

Týmto vieš napríklad dosiahnuť, že klávesnicový používateľ sa dostane do hlavného obsahu skôr (bez toho, aby si “prehadzoval” HTML len kvôli layoutu).

## Dôležité upozornenie

Toto je “trade-off”:

- **Plus**: logické DOM poradie ostáva čisté a stabilné (lepší základ pre prístupnosť).
- **Mínus**: keď vizuálne poradie nesedí s tab orderom, môže to byť pre niekoho mätúce (fokus sa môže pohybovať “proti očakávaniu” zľava doprava).

Praktické odporúčania:

- **Používaj to len tam, kde to dáva zmysel** (napr. keď naozaj chceš prioritizovať fokus do hlavného obsahu).
- **Dbaj na výrazný focus ring** (aby bolo jasné, kde sa používateľ nachádza).
- Ak chceš, aby fokus sledoval vizuálne poradie, často je lepšie **preusporiadať HTML** (alebo použiť iný layout), než spoliehať sa na vizuálne “triky”.

## Podpora prehliadačov

Flexbox je dnes podporovaný veľmi široko, ale ak cieliš aj na staršie prostredia (alebo špecifické embed-y), je dobré mať fallback:

- základný layout bez `row-reverse` (napr. `flex-direction: column;`)
- a `row-reverse` až pod `@media` pre väčšie šírky

