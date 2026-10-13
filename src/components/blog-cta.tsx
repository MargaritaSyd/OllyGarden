import { CtaArrow } from "@/components/cta-arrow";
import { GetStartedLink } from "@/components/get-started-link";
import { MenuItemIcon } from "@/components/menu-icons";
import { blogCtaProducts, type BlogPostCta } from "@/lib/blog-cta";

export function BlogCta({ cta }: { cta: BlogPostCta }) {
  const product = blogCtaProducts[cta.kind];

  return (
    <aside
      aria-label={product.eyebrow}
      className="relative overflow-hidden rounded-3xl bg-mist-tint p-[clamp(1.5rem,3vw,2.25rem)] text-forest shadow-[0_0_48px_rgba(227,226,112,0.12)]"
    >
      <div className="flex flex-col gap-5 min-[720px]:flex-row min-[720px]:items-center min-[720px]:gap-8">
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest">
              <MenuItemIcon name={product.icon} />
            </span>
            <span className="text-sm font-semibold tracking-[0.08em] text-olive uppercase">
              {product.eyebrow}
            </span>
          </div>
          <p className="text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.25] font-bold tracking-[-0.01em]">
            {cta.title}
          </p>
          <p className="text-base leading-[1.55] text-forest/80">{cta.body}</p>
        </div>
        <GetStartedLink
          href={product.href}
          className="shrink-0 !bg-forest !text-mist hover:!bg-olive"
          analytics={{ id: `blog_cta_${cta.kind}`, section: "blog_post" }}
        >
          {product.cta}
          <CtaArrow />
        </GetStartedLink>
      </div>
    </aside>
  );
}
