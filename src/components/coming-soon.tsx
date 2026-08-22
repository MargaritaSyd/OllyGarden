import Link from "next/link";

type ComingSoonProps = {
  title: string;
  description?: string;
};

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24">
      <p className="text-sm font-medium tracking-wide text-sunflower uppercase">
        Coming soon
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-mist">{title}</h1>
      <p className="mt-4 max-w-xl text-lg leading-8 text-mist/75">
        {description ?? `${title} is on the way. Check back soon.`}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-mist px-5 text-sm font-medium text-forest hover:bg-sunflower"
      >
        Back to home
      </Link>
    </div>
  );
}
