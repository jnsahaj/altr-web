import { cn } from "@/lib/utils";
import { validate, AltrError } from "altr-wasm";
import { ArrowRightIcon, EditIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

export type TermsValue = {
    candidate: string;
    rename: string;
};

export type TermsInputDialogProps = {
    value: TermsValue;
    onSave?: (value: TermsValue) => void;
    onChange?: (value: TermsValue) => void;
    disabled?: boolean;
};

export const TermsInputDialog: React.FC<TermsInputDialogProps> = ({ value, onSave, disabled }) => {
    const [inner, setInner] = useState<TermsValue>(value);
    const [error, setError] = useState<AltrError | null>(null);

    const handleCandidateChange = (candidate: string) => {
        try {
            validate(candidate, inner.rename);
            setError(null);
        } catch (err) {
            setError(err as AltrError | null);
        }

        setInner((i) => ({ ...i, candidate }));
    };

    const handleRenameChange = (rename: string) => {
        try {
            validate(inner.candidate, rename);
            setError(null);
        } catch (err) {
            setError(err as AltrError | null);
        }

        setInner((i) => ({ ...i, rename }));
    };

    const handleSaveClick = () => {
        onSave?.(inner);
    };

    const InputError = () => {
        return <div className="text-red-500 text-xs absolute mt-1">Invalid input</div>;
    };

    const { candidate, rename } = inner;

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button disabled={disabled} variant="outline" className="mb-4 py-8 px-4">
                        <div className="flex gap-4 items-center lg:text-2xl text-lg">
                            <div className="text-base text-muted-foreground self-end">from</div>
                            <div>{value.candidate}</div>
                            <div className="text-base text-muted-foreground self-end">to</div>
                            <div>{value.rename}</div>
                            <Separator className="self-stretch h-auto" orientation="vertical" />
                            <EditIcon />
                        </div>
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="mx-auto">Modify Terms</DialogTitle>
                        <DialogDescription>
                            Edit the terms you want to change between, while preserving casing. The
                            terms losely follow general variable naming conventions
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-4 py-4 items-center">
                        <div className="items-center gap-4">
                            <Input
                                name="candidate"
                                className={cn({
                                    "border-red-500": error === AltrError.CandidateCasing
                                })}
                                value={candidate}
                                onChange={(ev) => handleCandidateChange(ev.target.value)}
                            />
                            {error === AltrError.CandidateCasing && <InputError />}
                        </div>
                        <div>
                            <ArrowRightIcon />
                        </div>
                        <div className="items-center gap-4 relative">
                            <Input
                                name="rename"
                                className={cn({
                                    "border-red-500": error === AltrError.RenameCasing
                                })}
                                value={rename}
                                onChange={(ev) => handleRenameChange(ev.target.value)}
                            />
                            {error === AltrError.RenameCasing && <InputError />}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                disabled={error !== null}
                                type="submit"
                                onClick={handleSaveClick}
                            >
                                Save changes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
