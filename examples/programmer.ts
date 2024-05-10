import { Example } from ".";

export const programmer: Example = {
    candidate: "coder",
    rename: "rust_programmer",
    text: `const coder = new Coder(Adam);

function getCoderName(coder: Coder) {
    return coder.name;
}

// Updating the name for the CODER
function setCoderName(name: string) {
    coder.name = name; 
}`
};
