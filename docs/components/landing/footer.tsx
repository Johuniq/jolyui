import Image from "next/image";

export const Footer = () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center pt-8 pb-10">
        <a href="https://vercel.com/oss">
          <Image
            alt="Vercel OSS Program"
            src="https://vercel.com/oss/program-badge.svg"
            width={100}
            height={50}
          />
        </a>
      </div>

      <div className="mx-auto h-16 max-w-7xl">
        <div className="prose prose-sm flex size-full items-center justify-center px-4 text-muted-foreground text-sm md:px-6">
          <p className="truncate text-center">
            Built by{" "}
            <a
              href="https://x.com/johuniq"
              rel="noopener noreferrer"
              target="_blank"
            >
              Johuniq
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/johuniq/jolyui"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
