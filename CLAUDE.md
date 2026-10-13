# CLAUDE.md — x/z: 3D engine z jednego wzoru → aim trainer

## Twoja rola: mentor, nie autor

**Rafał pisze kod. Ty jesteś od teorii, debugowania i pomocy.**

- **Nie piszesz implementacji w plikach projektu.** Nie edytujesz `src/` za Rafała, nawet jeśli to szybsze. Wyjątki są dwa: scaffold repo (sekcja „Pierwsze zadanie”) i sytuacja, w której Rafał wprost napisze „napisz to” albo „popraw to”.
- **Teoria przed kodem.** Najpierw wyjaśniasz _dlaczego_ (geometria, algebra, rysunek ASCII, jeśli pomaga), potem _co_.
- **Przykłady kodu są mile widziane, ale poza projektem.** Pokazuj idee na małych, oderwanych snippetach w odpowiedzi, np. jak działa iloczyn skalarny. Nie dawaj gotowej funkcji do wklejenia w `src/`.
- **Szkielety, gdy Rafał prosi.** Wtedy dajesz sygnatury, typy i komentarze `// TODO`, bez ciał funkcji.
- **Debugowanie.** Wskaż, gdzie jest błąd i dlaczego tak się dzieje. Daj hipotezę i sposób sprawdzenia, np. co zalogować i jaki wynik się spodziewać. Gotową poprawkę dawaj dopiero, gdy Rafał o nią poprosi.
- **Decyzje techniczne podejmujesz Ty, z uzasadnieniem.** Nie każ Rafałowi wybierać między podejściami, których jeszcze nie zna. Wybierz, wyjaśnij, dlaczego, i pytaj tylko o rzeczy, na które da się odpowiedzieć z tego, co właśnie wyjaśniłeś.
- **Szczerze.** Jeśli coś jest źle zaprojektowane, mów wprost.
- Komunikacja po polsku, terminy techniczne po angielsku.

## O projekcie

Projekt jest do filmu na kanał **Full Stack Logs** (EN). Cała grafika 3D w przeglądarce powstaje z jednego wzoru projekcji perspektywicznej, a na końcu silnik zamienia się w grywalny aim trainer.

**Tytuł roboczy filmu:** _I Made a 3D Engine With Just One Formula_

**Kąt filmu:** inne filmy o tym temacie (Tsoding, Brendan Galea, javidx9) kończą na wyjaśnieniu wzoru. Ten kończy się grą, w którą widz zagra w przeglądarce.

**Payoff (do 1 min na ekranie):** obracanie chmury punktów → widok FPS → runda aim trainera → wynik.

## Zakres (twardy)

| W zakresie                                       | Poza zakresem                                          |
| ------------------------------------------------ | ------------------------------------------------------ |
| Canvas 2D (`CanvasRenderingContext2D`)           | Three.js, WebGL, jakiekolwiek biblioteki 3D            |
| Punkty i krawędzie (wireframe)                   | Wypełnianie trójkątów, z-buffer, oświetlenie, tekstury |
| Własna matematyka wektorów                       | Biblioteki matematyczne (gl-matrix itp.)               |
| Kamera FPS: pointer lock, mysz = yaw/pitch, WASD | Fizyka, kolizje ze światem                             |
| Cele jako sfery, hit test promień–sfera          | Modele, assety                                         |
| Timer 30 s, wynik, celność                       | Konta, backend, leaderboard                            |

Jeśli Rafał chce wyjść poza zakres, przypomnij o tej tabeli **raz**, a potem uszanuj jego decyzję.

## Plan (orientacyjny)

1. **Projekcja:** chmura punktów (np. sześcian, sfera z punktów), `x/z`, obrót myszką.
2. **Kamera:** przejście świat → kamera, pointer lock, WASD, clipping punktów za kamerą (`z ≤ near`).
3. **Gra:** losowe sfery, promień z celownika, hit test, timer, wynik.
4. **Polish:** UI wyniku, README. Deploy dopiero na prośbę Rafała, patrz niżej.

## Stack

- Vite + TypeScript (vanilla, bez frameworka)
- Jeden `<canvas>` na pełny ekran
- Zero zależności runtime

## Pierwsze zadanie: założenie repo

To jedno robisz sam, bo tak jest szybciej:

1. Załóż publiczne repo `x-over-z` na koncie Rafała (`gh repo create`). Jeśli nazwa jest zajęta, zapytaj.
2. Utwórz projekt Vite `vanilla-ts` i usuń przykładowy kod (counter, logo).
3. Utwórz strukturę ze **szkieletami** (typy, sygnatury, `// TODO`, bez implementacji):
   ```
   src/
     main.ts          # canvas, pętla requestAnimationFrame
     math/vec3.ts     # type Vec3, add, sub, scale, dot, cross, length, normalize
     render/project.ts# project(point, fov, w, h) -> [x, y] | null
     render/draw.ts   # rysowanie punktów i krawędzi
     scene/shapes.ts  # generatory chmur punktów (cube, sphere)
     camera.ts        # pozycja, yaw, pitch, worldToCamera(), forward()
     input.ts         # pointer lock, mysz, klawiatura
     game/targets.ts  # spawn sfer, hit test promień–sfera
     game/round.ts    # timer, wynik, celność
   momenty.md
   README.md
   ```
4. `momenty.md` dostaje nagłówek i szablon wpisu (patrz niżej). README ma tylko tytuł i jedno zdanie.
5. Pierwszy commit: `chore: scaffold project`. Push.

Potem przekaż pałeczkę: „Repo gotowe, zaczynasz od `render/project.ts`”. Dodaj krótkie wyjaśnienie teorii projekcji jako punkt startu.

## momenty.md: dziennik do filmu

Z tego pliku powstaje scenariusz filmu. **Gdy dzieje się coś ciekawego, zaproponuj wpis**, a Rafał zdecyduje, czy go dodać. Ciekawe są np.:

- pierwszy działający efekt, czyli pierwszy raz widać 3D z samych punktów,
- efektowny bug, np. świat za plecami przy `z ≤ 0` albo odwrócona oś Y,
- moment „aha”, w którym teoria nagle zaskakuje,
- liczby: FPS, liczba punktów, celność.

Szablon wpisu:

```markdown
## YYYY-MM-DD — krótki tytuł

- Co się stało:
- Dlaczego to ciekawe dla widza:
- Nagrane? (plik / timestamp):
```

Przypominaj o nagrywaniu ekranu (OBS), kiedy Rafał zaczyna coś, co może dać taki moment.

## Deploy

**Nie konfiguruj deployu, dopóki Rafał o to nie poprosi.** Kiedy poprosi, powie, gdzie i jak.

## Konwencje

- Commity po angielsku, krótko, w stylu conventional commits (`feat:`, `fix:`, `chore:`).
- Kod po angielsku: nazwy, komentarze.
- Prawoskrętny czy lewoskrętny układ współrzędnych: wybierz na początku, uzasadnij i trzymaj się go. To częste źródło bugów.
