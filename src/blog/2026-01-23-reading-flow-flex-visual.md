---
title: 'reading-flow: flex-visual; a prístupnosť vo flexboxe'
excerpt: 'Ako zosúladiť vizuálne poradie prvkov s poriadkom čítania a fokusom — aj keď podpora ešte nie je všade.'
tags: posts
layout: layouts/post.njk
date: 2026-01-23
---

Keď robíš layout vo flexboxe, veľmi rýchlo narazíš na rozdiel medzi:

- **DOM poradím** (poradie elementov v HTML)
- **vizuálnym poradím** (ako to vidíš na obrazovke)
- **reading/focus poradím** (ako sa prvky prechádzajú čítačkou a klávesnicou)

Historicky sa to riešilo “trikmi” typu `order`, `row-reverse` alebo prehadzovaním DOM. Problém: vizuálny layout a klávesnicový focus sa často začnú správať inak, než používateľ očakáva.

`reading-flow: flex-visual;` je novší spôsob, ako povedať: “pri čítaní/fokuse sa drž vizuálneho poradia flexu”.

> Poznámka: Podpora ešte nie je všade, takže sa oplatí mať fallback.

## Príklad: vizuálne otočenie bez mätúceho tabovania

Máš dva prvky a na desktop-e chceš mať sidebar vizuálne vľavo, ale HTML nechceš prehadzovať:

```html
<div class="layout">
  <main>…hlavný obsah…</main>
  <aside>…sidebar…</aside>
</div>
```

Bez `reading-flow` to často skončí tak, že:

- vizuálne je `aside` vľavo
- ale focus/tab ide podľa DOM (`main` → `aside`), čo môže pôsobiť “proti smeru”

S `reading-flow: flex-visual;` vieš zosúladiť fokus/čítanie s vizuálnym poradím:

```css
.layout {
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
  reading-flow: flex-visual;
}
```

## Prečo je to lepšie pre prístupnosť

- **Klávesnica**: focus prechádza prvky v rovnakom poradí, v akom ich používateľ vidí.
- **Čitateľnosť UI**: minimalizuješ “kde mi práve skočil fokus?” momenty.
- **Menej DOM hackov**: nemusíš prehadzovať HTML len kvôli layoutu.

## Fallback (keď `reading-flow` nie je podporované)

Najbezpečnejšie je spraviť fallback tak, aby bol aspoň konzistentný:

- na menších šírkach nech je layout lineárny (napr. `flex-direction: column;`)
- “otočenia” používaj len tam, kde to dáva zmysel a kde máš jasný fokus štýl

Príklad:

```css
.layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 48rem) {
  .layout {
    flex-direction: row-reverse;
    /* ak je podporované, zosúladí sa reading/focus s vizuálom */
    reading-flow: flex-visual;
  }
}
```

Ak chceš mať kompatibilitu úplne striktne (aj na starších prehliadačoch), stále platí: **najspoľahlivejšie je mať DOM poradie rovnaké ako vizuálne poradie**.
