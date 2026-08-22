const SRC = "/brand/layout/image.svg";
const WIDTH = 317;
const HEIGHT = 509;

export function PageMotif() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[100dvh] overflow-hidden select-none"
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 top-0 h-16 overflow-hidden sm:h-20">
        <MotifImage className="absolute top-0 left-0" />
        <MotifImage className="absolute top-0 right-0" />
      </div>

      <div className="absolute inset-y-0 left-0 w-[6.5rem] overflow-hidden lg:w-[7.5rem]">
        <MotifImage className="absolute top-0 left-0" />
        <MotifImage className="absolute bottom-0 left-0 -scale-y-100" />
      </div>
      <div className="absolute inset-y-0 right-0 w-[6.5rem] overflow-hidden lg:w-[7.5rem]">
        <MotifImage className="absolute top-0 right-0" />
        <MotifImage className="absolute bottom-0 right-0 -scale-y-100" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[min(22dvh,18rem)] overflow-hidden">
        <MotifImage className="absolute bottom-0 left-0 -scale-y-100" />
        <MotifImage className="absolute bottom-0 left-[18%] -scale-y-100" />
        <MotifImage className="absolute bottom-0 right-[18%] -scale-y-100" />
        <MotifImage className="absolute bottom-0 right-0 -scale-y-100" />
      </div>
    </div>
  );
}

function MotifImage({ className }: { className: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SRC}
      alt=""
      width={WIDTH}
      height={HEIGHT}
      className={`block h-auto w-[317px] max-w-none ${className}`}
    />
  );
}
