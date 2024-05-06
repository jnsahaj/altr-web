import React, { useEffect, useState } from "react";
import init, { execute } from "altr-wasm";
import "./index.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "./components/ui/dialog";
import { PenLine as EditIcon } from "lucide-react";
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";

export const App: React.FC = () => {
    const [candidate, setCandidate] = useState("Dialog");
    const [rename, setRename] = useState("Modal");
    const [buf, setBuf] = useState("");
    const [ans, setAns] = useState("");

    const handleBufChange = (bufInner: string) => {
        setBuf(() => bufInner);
    };

    useEffect(() => {
        init().then(() => {
            setAns(execute(candidate, rename, buf));
        });
    }, [candidate, rename, buf]);

    return (
        <div className="p-12">
            <h1 className="text-7xl font-extrabold leading-9">altr</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="mb-4 py-8 px-4">
                        <div className="flex gap-4 items-center lg:text-2xl text-lg">
                            <div className="text-base text-muted-foreground self-end">from</div>
                            <div>{candidate}</div>
                            <div className="text-base text-muted-foreground self-end">to</div>
                            <div>{rename}</div>
                            <Separator className="self-stretch h-auto" orientation="vertical" />
                            <EditIcon />
                        </div>
                    </Button>
                </DialogTrigger>
                <div className="mb-6">
                    <div className="flex gap-8 h-[600px]">
                        <ResizablePanelGroup direction="horizontal">
                            <ResizablePanel className="pr-4">
                                <Textarea
                                    className="h-full"
                                    placeholder="Paste your text here..."
                                    name="buf"
                                    onChange={(ev) => handleBufChange(ev.target.value)}
                                />
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel className="pl-4">
                                <div className="overflow-auto">
                                    <code className="whitespace-pre-wrap text-sm">{ans}</code>
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </div>
                </div>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-4 py-4">
                        <div className="items-center gap-4">
                            <Input
                                name="candidate"
                                value={candidate}
                                onChange={(ev) => setCandidate(ev.target.value)}
                            />
                        </div>
                        <div className="items-center gap-4">
                            <Input
                                name="rename"
                                value={rename}
                                onChange={(ev) => setRename(ev.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit">Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
