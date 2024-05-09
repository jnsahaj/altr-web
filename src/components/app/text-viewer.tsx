import { BasicRecord } from "altr-wasm/pkg/altr_wasm";
import React from "react";
import Highlighter from "./highlighter";

export type TextViewerProps = {
    text?: string;
    records?: BasicRecord[];
    formatAsCode?: boolean;
    highlightClassName?: string;
};

export const TextViewer: React.FC<TextViewerProps> = ({
    text,
    records,
    formatAsCode,
    highlightClassName
}) => {
    return (
        <>
            <Highlighter
                as="code"
                className="whitespace-pre"
                text={text}
                records={records}
                highlightClassName={highlightClassName}
            />
        </>
    );
};
