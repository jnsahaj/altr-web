import { BasicRecord } from "altr-wasm/pkg/altr_wasm";
import { CircleCheck, PenBox } from "lucide-react";
import React, { PropsWithChildren, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
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
    const [edit, setEdit] = useState(true);
    const [inner, setInner] = useState(value);

    const EditButton = () => {
        return (
            <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => setEdit(true)}
            >
                <PenBox className="text-gray-800" />
            </Button>
        );
    };

    const DoneButton = () => {
        return (
            <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => {
                    setEdit(false);
                    onSave?.(inner);
                }}
            >
                <CircleCheck className="text-sky-400" />
            </Button>
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
                    <div className="h-full overflow-auto">
                        <EditButton />
                        <TextViewer
                            text={value}
                            records={records}
                            highlightClassName="bg-red-200"
                        />
                    </div>
                </Container>
            )}
        </>
    );
};
