import React, { useState } from "react";
import init, { execute } from "altr-wasm";
import "./index.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const App: React.FC = () => {
    const [candidate, setCandidate] = useState("");
    const [rename, setRename] = useState("");
    const [buf, setBuf] = useState("");
    const [ans, setAns] = useState("");

    const handleSubmit = () => {
        init().then(() => {
            setAns(execute(candidate, rename, buf));
        });
    };

    return (
        <div className="p-12">
            <div className="mb-6">
                <Input name="candidate" onChange={(ev) => setCandidate(ev.target.value)} />
            </div>
            <div className="mb-6">
                <Input name="rename" onChange={(ev) => setRename(ev.target.value)} />
            </div>
            <div className="mb-6">
                <Input name="buf" onChange={(ev) => setBuf(ev.target.value)} />
            </div>

            <Button onClick={handleSubmit}>Submit</Button>
            <div>{ans}</div>
        </div>
    );
};
