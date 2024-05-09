import React from "react";
import { BasicRecord } from "altr-wasm/pkg/altr_wasm";

export type HighlightProps = {
    as?: keyof HTMLElementTagNameMap | React.FC<any>;
    text?: string;
    records?: BasicRecord[];
    highlightClassName?: string;
    className?: string;
};

export const Highlighter: React.FC<HighlightProps> = ({
    as = "span",
    text,
    records,
    highlightClassName = "bg-yellow-300",
    className
}) => {
    const Component = as;
    const parts = React.useMemo(() => {
        const result: React.ReactNode[] = [];
        let current = 0;

        records?.forEach((highlight) => {
            const pre = text.substring(current, highlight.pos);
            if (pre) {
                result.push(pre);
            }
            result.push(
                <span key={highlight.pos} className={highlightClassName}>
                    {text.substring(highlight.pos, highlight.pos + highlight.len)}
                </span>
            );
            current = highlight.pos + highlight.len;
        });

        const post = text.substring(current);
        if (post) {
            result.push(post);
        }

        return result;
    }, [text, records]);

    return <Component className={className}>{parts}</Component>;
};

export default Highlighter;
