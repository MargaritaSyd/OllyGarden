"use client";

import { useState } from "react";
import { categoryColor } from "@/components/instrumentation-score-ui";
import type { scoreCategories } from "@/lib/instrumentation-score";

type Category = (typeof scoreCategories)[number];

/** The score categories on a 0–100 scale; hovering or focusing a band or a row highlights both. */
export function ScoreCategoriesCard({
  title,
  categories,
  ticks,
  className,
}: {
  title: string;
  categories: readonly Category[];
  ticks: readonly number[];
  className: string;
}) {
  const [hot, setHot] = useState<Category["name"] | null>(null);
  const ascending = [...categories].reverse();

  return (
    <div className={className} onMouseLeave={() => setHot(null)}>
      <h3 className="text-xl leading-[1.28] font-bold tracking-[-0.01em] text-mist">{title}</h3>

      <div className="mt-5" aria-hidden="true">
        <div className="flex h-3 gap-1">
          {ascending.map((category, index) => {
            const width = (ascending[index + 1]?.min ?? 101) - category.min;
            return (
              <span
                key={category.name}
                onMouseEnter={() => setHot(category.name)}
                style={{ flexGrow: width, backgroundColor: categoryColor[category.name] }}
                className={`rounded-full transition-opacity duration-200 motion-reduce:transition-none ${hot && hot !== category.name ? "opacity-30" : "opacity-90"}`}
              />
            );
          })}
        </div>
        <div className="relative mt-1.5 h-4 font-mono text-[11px] text-mist/55">
          {ticks.map((tick) => (
            <span
              key={tick}
              data-tick={tick}
              className="absolute -translate-x-1/2 before:content-[attr(data-tick)] first:translate-x-0 last:-translate-x-full"
              style={{ left: `${tick}%` }}
            />
          ))}
        </div>
      </div>

      <table className="mt-3 w-full text-left text-[15px] text-mist/80">
        <thead>
          <tr className="border-b border-mist/12 text-[12px] tracking-[0.08em] text-mist/55 uppercase">
            <th scope="col" className="py-2 pr-3 font-bold">Score</th>
            <th scope="col" className="py-2 pr-3 font-bold">Category</th>
            <th scope="col" className="py-2 font-bold max-sm:sr-only">Meaning</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.name}
              tabIndex={0}
              onMouseEnter={() => setHot(category.name)}
              onFocus={() => setHot(category.name)}
              onBlur={() => setHot(null)}
              className={`border-b border-mist/8 align-top transition-colors duration-200 last:border-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-sunflower motion-reduce:transition-none ${hot === category.name ? "bg-mist/6" : ""}`}
            >
              <td className="py-2.5 pr-3 font-mono whitespace-nowrap text-mist max-[767px]:text-[12.5px]">{category.range}</td>
              <th scope="row" className="py-2.5 pr-3 font-semibold text-mist">
                <span
                  className="mr-2 inline-block size-2 rounded-full"
                  style={{ backgroundColor: categoryColor[category.name] }}
                  aria-hidden="true"
                />
                {category.name}
              </th>
              <td className="py-2.5 max-sm:sr-only">{category.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
