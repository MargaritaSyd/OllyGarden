"use client";

import { useEffect, useRef } from "react";
import { tulipFaq } from "@/lib/tulip";

export function TulipFaq() {
  return (
    <section
      aria-labelledby="fq-title"
      className="flex justify-center px-5 py-16 sm:px-8 lg:px-[104px] lg:pt-24 lg:pb-[140px]"
    >
      <div className="flex w-full max-w-[1232px] flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-4">
          <h2
            id="fq-title"
            className="text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.18] font-bold tracking-[-0.02em] text-mist"
          >
            {tulipFaq.title}
          </h2>
          <p className="max-w-[500px] text-base leading-[1.45] tracking-[0.02em] text-[#9db4a0]">
            {tulipFaq.sub}
          </p>
        </div>

        <div className="flex flex-col gap-[18px] sm:gap-[26px]">
          {tulipFaq.items.map((item, index) => (
            <FaqItem key={item.q} item={item} defaultOpen={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  item,
  defaultOpen,
}: {
  item: (typeof tulipFaq.items)[number];
  defaultOpen: boolean;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (defaultOpen && ref.current) {
      ref.current.open = true;
    }
  }, [defaultOpen]);

  return (
    <details
      ref={ref}
      className="tulip-faq-item overflow-hidden rounded-xl border border-sunflower/32 bg-[#002810] bg-[url('/images/texture-grain.png')] bg-repeat [background-size:328px_140px] transition-[border-color,box-shadow] duration-200 ease-out hover:border-sunflower/55 hover:shadow-[0_14px_34px_rgba(0,0,0,0.26)]"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[18px] py-5 text-left select-none sm:px-6 sm:py-[26px] [&::-webkit-details-marker]:hidden marker:content-none focus-visible:rounded-xl focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-[#9ca703]/90">
        <h3 className="text-[17px] leading-[1.3] font-semibold tracking-[-0.01em] text-mist sm:text-lg">
          {item.q}
        </h3>
        <svg
          className="size-5 shrink-0 text-bitmap-mid transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 7.5l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <p className="max-w-[1160px] px-[18px] pb-5 text-sm leading-[1.5] tracking-[0.01em] text-mist/82 sm:px-6 sm:pb-[26px] sm:text-[15px]">
        {item.a}
      </p>
    </details>
  );
}
