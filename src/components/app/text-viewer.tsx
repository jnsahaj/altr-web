import { BasicRecord } from "altr-wasm/pkg/altr_wasm";
import { Activity } from "lucide-react";
import React from "react";
import Highlighter from "./highlighter";

export type TextViewerProps = {
    text?: string;
    records?: BasicRecord[];
    // formatAsCode?: boolean;
    highlightClassName?: string;
};

export const TextViewer: React.FC<TextViewerProps> = ({
    text,
    records,
    // formatAsCode,
    highlightClassName
}) => {
    return (
        <div className="h-full bg-white border-gray-300 border rounded-sm overflow-auto p-2 leading-2">
            {!text && (
                <div className="flex h-full w-full justify-center items-center">
                    <Activity size={48} className="text-gray-200" />
                </div>
            )}
            <Highlighter
                as="code"
                className="whitespace-pre font-code leading-2"
                text={text}
                records={records}
                highlightClassName={highlightClassName}
            />
        </div>
    );
};
