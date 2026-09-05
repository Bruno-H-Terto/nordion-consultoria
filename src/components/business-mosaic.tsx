import type { Copy } from "../locales";
const images = [
  "bridge-960.webp",
  "business-meeting.jpg",
  "architecture-960.webp",
  "rio-grid.jpg",
  "business-discussion.jpg",
  "planning-960.webp",
  "global-port-960.webp",
];
export function BusinessMosaic({ t }: { t: Copy }) {
  return (
    <div className="business-mosaic">
      {images.map((image, i) => (
        <figure key={image} className={`mosaic-cell mosaic-${i}`}>
          <img
            src={`/images/${image}`}
            alt={t.mosaicDescriptions[i]}
            loading="lazy"
          />
          <span aria-hidden="true" />
        </figure>
      ))}
    </div>
  );
}
