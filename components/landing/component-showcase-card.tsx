import Alert04 from "@/components/jolyui/alert/alert-04";
import Btn12 from "@/components/jolyui/button/btn-12";
import Btn13 from "@/components/jolyui/button/btn-13";
import Input_08 from "@/components/jolyui/input/input-08";
import Input_10 from "@/components/jolyui/input/input-10";

interface ComponentShowcaseCardProps {
  className: string;
}

export function ComponentShowcaseCard({
  className,
}: ComponentShowcaseCardProps) {
  return (
    <div className={className}>
      <div className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-zinc-700 to-zinc-400 dark:from-zinc-100 dark:to-zinc-400">
        Buttons, Inputs & More
      </div>

      <div className="space-y-12">
        <div className="space-y-20 mt-8">
          {[
            { component: <Input_10 />, label: "Input 10" },
            { component: <Alert04 />, label: "Alert 04" },
            {
              component: (
                <div className="w-full flex justify-center gap-4">
                  <Btn13 className="w-full" label="Welcome" />
                  <Btn12 className="w-full" label="Button" />
                </div>
              ),
              label: "Welcome",
            },
          ].map((btn, index) => (
            <div key={index} className="flex flex-col items-center gap-8">
              <div className="h-16 flex items-center gap-8">
                {btn.component}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center pt-8">
          <Input_08 label="" />
        </div>
      </div>

      <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mt-4">
        + more available
      </p>
    </div>
  );
}
