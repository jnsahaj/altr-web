import { cn } from "@/lib/utils";
import React from "react";
import { Button, ButtonProps } from "../ui/button";

export type ActionButtonProps = Partial<ButtonProps>;

export const ActionButton: React.FC<ActionButtonProps> = ({ className, children, ...props }) => {
    return (
        <Button variant="outline" size="icon" className={cn(className)} {...props}>
            {children}
        </Button>
    );
};
