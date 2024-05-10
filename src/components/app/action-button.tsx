import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { Button, ButtonProps } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export type ActionButtonProps = Partial<ButtonProps> & {
    onClick?: () => void;
    tooltip?: {
        description: string;
        shortcut?: string;
        key?: KeyboardEvent["key"];
    };
};

export const ActionButton: React.FC<ActionButtonProps> = ({
    className,
    children,
    tooltip,
    ...props
}) => {
    useEffect(() => {
        if (tooltip) {
            const shortcut = (ev: KeyboardEvent) => {
                if (ev.key === tooltip.key) {
                    props?.onClick?.();
                }
            };
            document.addEventListener("keyup", shortcut);
            return () => {
                document.removeEventListener("keyup", shortcut);
            };
        }
    }, [tooltip]);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className={cn(className)} {...props}>
                        {children}
                    </Button>
                </TooltipTrigger>
                {tooltip && (
                    <TooltipContent className="flex gap-2">
                        {tooltip.description}
                        {tooltip?.shortcut && (
                            <>
                                <Separator className="self-stretch h-auto" orientation="vertical" />
                                <div className="border border-gray-300 bg-gray-200 text-sm rounded-sm px-2">
                                    {tooltip.shortcut}
                                </div>
                            </>
                        )}
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    );
};
