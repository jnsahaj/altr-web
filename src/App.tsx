import React, { useCallback, useEffect, useState } from "react";
import init, { AltrError, execute } from "altr-wasm";
import "./index.css";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";
import { AppTextarea } from "./components/app/app-textarea";
import { TextViewer } from "./components/app/text-viewer";
import { TermsInputDialog, TermsValue } from "./components/app/terms-input-dialog";

export const App: React.FC = () => {
    const [termsValue, setTermsValue] = useState<TermsValue>({
        candidate: "Dialog",
        rename: "Modal"
    });
    const [buf, setBuf] = useState("");
    const [ans, setAns] = useState("");
    const [err, setErr] = useState<AltrError | null>(null);
    const [records, setRecords] = useState([]);
    const [processedRecords, setProcessedRecords] = useState([]);

    const [disabled, setDisabled] = useState(true);

    const handleBufChange = (bufInner: string) => {
        setBuf(bufInner);
    };

    useEffect(() => {
        init().then(() => {
            setDisabled(false);
        });
    }, []);

    const handleTermsValueSave = (value: TermsValue) => {
        console.log(value);
        setTermsValue(value);
    };

    const { candidate, rename } = termsValue;

    const exec = useCallback(() => {
        try {
            const result = execute(candidate, rename, buf);
            setErr(null);
            return result;
        } catch (e) {
            const error = e as AltrError;
            switch (error) {
                case AltrError.CandidateCasing:
                case AltrError.RenameCasing:
                case AltrError.Generic:
                    setErr(error);
                    break;
                default:
                    setErr(AltrError.Generic);
                    break;
            }
        }
    }, [candidate, rename, buf]);

    useEffect(() => {
        if (!disabled) {
            const result = exec();
            setAns(result.processed_buf);
            setRecords(result.records);
            setProcessedRecords(result.processed_records);
        }
    }, [exec, disabled]);

    return (
        <div className="p-12">
            <h1 className="text-7xl font-extrabold leading-9">altr</h1>

            <TermsInputDialog
                value={termsValue}
                error={err}
                onSave={handleTermsValueSave}
                disabled={disabled}
            />

            <div className="mb-6">
                <div className="flex gap-8 h-[600px]">
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel className="pr-4">
                            <AppTextarea
                                value={buf}
                                onSave={(value) => handleBufChange(value)}
                                records={records}
                            />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel className="pl-4">
                            <div className="h-full overflow-auto">
                                <TextViewer
                                    text={ans}
                                    records={processedRecords}
                                    highlightClassName="bg-green-200"
                                />
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </div>
        </div>
    );
};
