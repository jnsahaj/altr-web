import React from "react";
import { Button } from "../ui/button";

const FaqItem: React.FC<{ heading: React.ReactNode; content: React.ReactNode }> = ({
    heading,
    content
}) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="text-2xl font-bold">{heading}</div>
            <div className="text-base text-muted-foreground">{content}</div>
        </div>
    );
};

export const Faqs: React.FC = () => {
    const faqs = [
        {
            heading: "What is altr?",
            content: (
                <>
                    Altr is a smart refactoring tool that helps you effortlessly rename variables,
                    functions, and other code elements while maintaining your preferred casing
                    conventions <br /> Altr is also available as a CLI tool and a standalone Rust
                    crate{" "}
                    <Button className="p-0" variant="link" asChild>
                        <a className="text-blue-800 h-auto" href="https://crates.io/crates/altr">
                            link
                        </a>
                    </Button>{" "}
                </>
            )
        },
        {
            heading: "What are the benefits of using altr?",
            content: (
                <ul className="list-decimal pl-4">
                    <li> Saves time and effort on repetitive refactoring tasks</li>
                    <li>Ensures consistent code style throughout your project</li>
                    <li>Reduces the risk of errors by making automated replacements</li>
                </ul>
            )
        }
    ];

    return (
        <>
            {faqs.map(({ heading, content }, index) => {
                return (
                    <div key={index} className="mb-6 md:mb-10">
                        <FaqItem heading={heading} content={content} />
                    </div>
                );
            })}
        </>
    );
};
