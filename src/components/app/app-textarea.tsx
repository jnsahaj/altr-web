import { BasicRecord } from "altr-wasm/pkg/altr_wasm";
import { CheckIcon, PenLine } from "lucide-react";
import React, { PropsWithChildren, useState } from "react";
import { Textarea } from "../ui/textarea";
import { ActionButton } from "./action-button";
import { TextViewer } from "./text-viewer";

export type AppTextareaProps = {
    value?: string;
    records?: BasicRecord[];
    onChange?: (value: string) => void;
    onSave?: (value: string) => void;
};

const Container: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className="relative h-full">{children}</div>;
};

export const AppTextarea: React.FC<AppTextareaProps> = ({ value, onSave, records }) => {
    const [edit, setEdit] = useState(false);
    const [inner, setInner] = useState(value);

    const EditButton = () => {
        return (
            <ActionButton className="absolute right-2 top-2" onClick={() => setEdit(true)}>
                <PenLine className="text-gray-800 h-4 w-4" />
            </ActionButton>
        );
    };

    const DoneButton = () => {
        return (
            <ActionButton
                className="absolute right-2 top-2"
                onClick={() => {
                    setEdit(false);
                    onSave?.(inner);
                }}
            >
                <CheckIcon className="text-green-400 h-4 w-4" />
            </ActionButton>
        );
    };

    return (
        <>
            {edit && (
                <Container>
                    <DoneButton />
                    <Textarea
                        placeholder="Start typing or paste your text here..."
                        className="h-full"
                        value={inner}
                        onChange={(ev) => setInner(ev.target.value)}
                    />
                </Container>
            )}
            {!edit && (
                <Container>
                    <EditButton />
                    <TextViewer text={value} records={records} highlightClassName="bg-red-200" />
                </Container>
            )}
        </>
    );
};
