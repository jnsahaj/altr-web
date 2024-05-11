import React, { useCallback, useEffect, useState } from "react";
import init, { AltrError, execute } from "altr-wasm";
import "./index.css";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";
import { AppTextarea } from "./components/app/app-textarea";
import { TextViewer } from "./components/app/text-viewer";
import { TermsInputDialog, TermsValue } from "./components/app/terms-input-dialog";
import { ActionButton } from "./components/app/action-button";
import { copyTextToClipboard } from "./lib/utils";
import { CheckCheck, CopyIcon, Github } from "lucide-react";
import { programmer } from "../examples";
import { useToast } from "./components/ui/use-toast";
import { Button } from "./components/ui/button";

export const App: React.FC = () => {
    const [termsValue, setTermsValue] = useState<TermsValue>({
        candidate: programmer.candidate,
        rename: programmer.rename
    });
    const [buf, setBuf] = useState(programmer.text);
    const [ans, setAns] = useState("");
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
        setTermsValue(value);
    };

    const { candidate, rename } = termsValue;

    const { toast } = useToast();

    const exec = useCallback(() => {
        try {
            const result = execute(candidate, rename, buf);
            return result;
        } catch (e) {
            const error = e as AltrError;
            switch (error) {
                case AltrError.Generic:
                default:
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong",
                        description: "An error occurred while processing the data"
                    });
                    break;
            }
        }
    }, [candidate, rename, buf, toast]);

    useEffect(() => {
        if (!disabled) {
            const result = exec();
            if (result) {
                setAns(result.processed_buf);
                setRecords(result.records);
                setProcessedRecords(result.processed_records);
            }
        }
    }, [exec, disabled]);

    const CopyAnswerButton = () => {
        const [copied, setCopied] = useState(false);

        return (
            <ActionButton
                tooltip={{ description: "Copy" }}
                className="absolute right-2 top-2"
                onClick={async () => {
                    await copyTextToClipboard(ans);
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 2000);
                }}
            >
                {!copied && <CopyIcon className="text-blue-500 h-4 w-4" />}
                {copied && <CheckCheck className="text-green-400 h-4 w-4" />}
            </ActionButton>
        );
    };

    const TextareaPanel = () => (
        <AppTextarea value={buf} onSave={(value) => handleBufChange(value)} records={records} />
    );

    const TextViewerPanel = () => (
        <div className="relative h-full">
            <CopyAnswerButton />
            <TextViewer text={ans} records={processedRecords} highlightClassName="bg-green-200" />
        </div>
    );

    return (
        <div className="md:p-12 p-4">
            <h1 className="text-7xl font-extrabold leading-9">altr</h1>

            <div className="md:mb-8 mb-4 flex justify-between md:flex-row flex-col">
                <TermsInputDialog
                    value={termsValue}
                    onSave={handleTermsValueSave}
                    disabled={disabled}
                />
                <div className="flex gap-1 items-center self-end mt-2 md:mt-0">
                    <div className="text-sm text-muted-foreground">Powered by Rust</div>
                    <Button size="icon" className="rounded-xl" variant="ghost" asChild>
                        <a className="cursor-pointer" href="https://github.com/jnsahaj/altr-web">
                            <Github size={16} />
                        </a>
                    </Button>
                </div>
            </div>

            <div className="mb-6 hidden md:block">
                <div className="flex gap-8 h-[600px]">
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel>
                            <TextareaPanel />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel>
                            <TextViewerPanel />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </div>

            <div className="mb-6 md:hidden">
                <div className="flex gap-8 h-[600px]">
                    <ResizablePanelGroup direction="vertical">
                        <ResizablePanel>
                            <TextareaPanel />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel>
                            <TextViewerPanel />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </div>
        </div>
    );
};
