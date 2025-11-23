
import {
  TabsContent as TabsContentPrimitive,
  TabsContents as TabsContentsPrimitive,
  TabsHighlightItem as TabsHighlightItemPrimitive,
  TabsHighlight as TabsHighlightPrimitive,
  TabsList as TabsListPrimitive,
  Tabs as TabsPrimitive,
  TabsTrigger as TabsTriggerPrimitive,
  type TabsContentProps as TabsContentPrimitiveProps,
  type TabsContentsProps as TabsContentsPrimitiveProps,
  type TabsListProps as TabsListPrimitiveProps,
  type TabsProps as TabsPrimitiveProps,
  type TabsTriggerProps as TabsTriggerPrimitiveProps,
} from '@/components/radix-tabs';
import { cn } from '@/lib/utils';

type TabsProps = TabsPrimitiveProps;

function Tabs({ className, ...props }: TabsProps) {
  return (
    <TabsPrimitive
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

type TabsListProps = TabsListPrimitiveProps;

function TabsList({ className, ...props }: TabsListProps) {
  return (
    <TabsHighlightPrimitive className="absolute z-0 inset-0 border border-transparent rounded-lg bg-accent">
      <TabsListPrimitive
        className={cn(
          'text-muted-foreground inline-flex h-9 w-fit items-center justify-center',
          className,
        )}
        {...props}
      />
    </TabsHighlightPrimitive>
  );
}

type TabsTriggerProps = TabsTriggerPrimitiveProps;

function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsHighlightItemPrimitive
      value={props.value}
      className="flex-1 size-full"
    >
      <TabsTriggerPrimitive
        className={cn(
          "data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md w-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-500 ease-in-out focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        {...props}
      />
    </TabsHighlightItemPrimitive>
  );
}

type TabsContentsProps = TabsContentsPrimitiveProps;

function TabsContents(props: TabsContentsProps) {
  return <TabsContentsPrimitive {...props} />;
}

type TabsContentProps = TabsContentPrimitiveProps;

function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsContentPrimitive
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export {
  Tabs, TabsContent, TabsContents, TabsList,
  TabsTrigger, type TabsContentProps, type TabsContentsProps, type TabsListProps, type TabsProps, type TabsTriggerProps
};

