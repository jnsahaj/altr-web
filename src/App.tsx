import React, { useState } from "react";
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
    DialogTitle
} from "./components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ArrowRight, Pencil } from "lucide-react";

export const App: React.FC = () => {
    const [candidate, setCandidate] = useState("user");
    const [rename, setRename] = useState("new_user_18");
    const [buf, setBuf] = useState("");
    const [ans, setAns] = useState("");

    const handleSubmit = () => {
        init().then(() => {
            setAns(execute(candidate, rename, buf));
        });
    };

    return (
        <div className="p-12">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="mb-12 p-8">
                        <div className="flex gap-4 items-center text-2xl">
                            <div>{candidate}</div>
                            <div>
                                <ArrowRight />
                            </div>
                            <div>{rename}</div>
                            <Pencil />
                        </div>
                    </Button>
                </DialogTrigger>
                <div className="mb-6">
                    <Input name="buf" onChange={(ev) => setBuf(ev.target.value)} />
                </div>

                <Button onClick={handleSubmit}>Submit</Button>
                <div>{ans}</div>

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
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
