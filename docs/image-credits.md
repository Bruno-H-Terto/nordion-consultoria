# Image and geographic data credits

Reviewed on 2026-09-04. Photographs below permit free commercial use under their respective stock licenses; they are **not public-domain photographs**. No purchased assets, Unsplash+ images or external image requests are used. Local responsive WebP derivatives are generated at 960 and 1920 pixels wide.

| Local asset | Author | Original / license | Composition and use |
| --- | --- | --- | --- |
| `skyline-*` | Henrique Hanemann | [São Paulo](https://unsplash.com/photos/city-skyline-under-blue-sky-during-daytime-xEkUtoYEJeE) · [Unsplash License](https://unsplash.com/license) | Open sky supports oversized headlines; actual São Paulo skyline anchors the market-entry story. |
| `global-port-*` | Dominik Lückmann | [Container ship in Hamburg](https://unsplash.com/photos/blue-and-red-cargo-ship-4aOhA4ptIY4) · [Unsplash License](https://unsplash.com/license) | International operations context, copper cranes; not presented as a Brazilian port or a Nordion client. |
| `boardroom-*` | Max Vakhtbovych | [Contemporary boardroom](https://www.pexels.com/photo/modern-interior-of-office-room-7534216/) · [Pexels License](https://www.pexels.com/license/) | Symmetrical landscape composition, wood and graphite fit the palette. Illustrative space, not represented as company premises. |
| `collaboration-*` | fauxels | [Coworkers working together](https://www.pexels.com/photo/coworkers-working-together-3184293/) · [Pexels License](https://www.pexels.com/license/) | Working session rather than posed portrait; illustrates collaboration, not actual Nordion employees or endorsements. |

## Geographic outline

`src/data/brazil-outline.json` is the Brazil exterior ring extracted from Natural Earth's 1:110m admin-0 country data, rounded to four decimal places. [Source GeoJSON](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson) · [Public-domain terms](https://www.naturalearthdata.com/about/terms-of-use/).

The 3D map is stylized, with vertical exaggeration and schematic connection arcs. City points provide visual anchors; paths and airplanes are illustrative, not actual flights, schedules or business coverage. Airplane geometry and procedural cloud textures are authored in the project and use no external models.

## Interactive portrait bubbles

Small local WebP files at 400 px wide. Circular framing is applied in CSS. The portraits are illustrative interface elements, not testimonials, clients or Nordion employees; they carry no testimonials.

| Local asset | Photographer | Original |
| --- | --- | --- |
| `portrait-woman.webp` | Andrea Piacquadio | [Woman in collared shirt](https://www.pexels.com/photo/woman-in-collared-shirt-774909/) |
| `portrait-man.webp` | Italo Melo | [Smiling man](https://www.pexels.com/photo/portrait-photo-of-smiling-man-with-his-arms-crossed-standing-in-front-of-a-wall-2379004/) |
| `portrait-consultant.webp` | Christina Morillo | [Woman smiling at the camera](https://www.pexels.com/photo/woman-smiling-at-the-camera-1181686/) |

All three were verified as free to use under the [Pexels License](https://www.pexels.com/license/) on 2026-09-04.

## Architectural opening

`bridge-1920.webp` and `bridge-960.webp`: [Odinei Ramone — Ponte Octávio Frias de Oliveira](https://unsplash.com/photos/a-bridge-with-a-road-and-buildings-e86s9jQTsFg), free commercial use under the [Unsplash License](https://unsplash.com/license). Reviewed 2026-09-04. Monochrome architectural lines fit the graphite palette; CSS controls framing without modifying the source photograph.

The team section uses seven conceptual profiles with silhouette illustrations. No identities are presented as actual staff. Profile data lives in `src/data/team.ts`.

## Supplied brand symbol

`public/brand/nordion-symbol.png` is the user's supplied `logo-nordin-simplificado.png`, copied unchanged. CSS provides the central constellation framing. The opening uses a code-native orbital constellation instead of a photographic slideshow.

## Business mosaic — 2026-09-05

The third section uses seven distinct images, with CSS-only variations in saturation, contrast, warmth and slight blur. They are not reused by the values carousel.

- `bridge-960.webp`: Odinei Ramone / Unsplash, credited above.
- `business-meeting.jpg`: [Pexels media 3182812](https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg), downloaded at 1000 px.
- `architecture-960.webp`: previously supplied photograph of Frankfurt architecture; not described as a Brazilian landmark.
- `rio-grid.jpg`: Jonathan Borba, [Rio de Janeiro beachfront](https://www.pexels.com/photo/scenic-beachfront-skyline-of-rio-de-janeiro-36953262/), downloaded at 1200 px.
- `business-discussion.jpg`: [Pexels media 3184405](https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg), downloaded at 1000 px.
- `planning-960.webp`: previously supplied business planning photograph.
- `global-port-960.webp`: Dominik Lückmann / Unsplash, credited above; illustrative international port, not represented as Brazilian.

The new Pexels downloads follow the [Pexels License](https://www.pexels.com/license/). The two individual business photo pages were unavailable to the research tool; the original media identifiers are recorded above. All photos were visually inspected before use. No stock subjects are identified as Nordion staff or clients.

The values carousel uses the distinct local assets `boardroom`, `collaboration`, `portrait`, `founder`, and `team`; the last three are from the user's supplied imagery.
