import React, { useEffect, useState } from "react";
import init, { execute } from "altr-wasm";

export const App: React.FC = () => {
    const [ans, setAns] = useState("");
    useEffect(() => {
        init().then(() => {
            setAns(
                execute(
                    "function",
                    "myNewFunc",
                    `
fucntion this is the new thing
and 
wow function and FUNCTION
			`
                )
            );
        });
    }, []);

    return <div>{ans}</div>;
};
