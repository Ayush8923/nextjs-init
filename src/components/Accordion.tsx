import React, { ReactNode, useId } from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { AccordionIcon } from "./icons";

type AccordionProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

const Accordion = ({
  title,
  children,
  defaultOpen = false,
}: AccordionProps) => {
  const uniqueId = useId();

  return (
    <RadixAccordion.Root
      type="single"
      collapsible
      defaultValue={defaultOpen ? uniqueId : undefined}
    >
      <RadixAccordion.Item value={uniqueId}>
        <RadixAccordion.Header>
          <RadixAccordion.Trigger className="group flex items-center justify-between w-full py-4 text-left">
            <span className="text-base font-medium">{title}</span>
            <AccordionIcon className="transition-transform duration-300 group-data-[state=open]:rotate-180" />
          </RadixAccordion.Trigger>
        </RadixAccordion.Header>
        <RadixAccordion.Content className="pb-4 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
          {children}
        </RadixAccordion.Content>
      </RadixAccordion.Item>
    </RadixAccordion.Root>
  );
};

export default Accordion;
