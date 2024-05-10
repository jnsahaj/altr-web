import { AltrError } from "altr-wasm";
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
    error?: AltrError;
};

export const TermsInputDialog: React.FC<TermsInputDialogProps> = ({
    value,
    onSave,
    disabled,
    error
}) => {
    const [inner, setInner] = useState<TermsValue>(value);

    const handleCandidateChange = (candidate: string) => {
        setInner((i) => ({ ...i, candidate }));
    };

    const handleRenameChange = (rename: string) => {
        setInner((i) => ({ ...i, rename }));
    };

    const handleSaveClick = () => {
        onSave?.(inner);
    };

    const { candidate, rename } = inner;

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button disabled={disabled} variant="outline" className="mb-4 py-8 px-4">
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
                                value={candidate}
                                onChange={(ev) => handleCandidateChange(ev.target.value)}
                            />
                            {error === AltrError.CandidateCasing && <>Invalid input</>}
                        </div>
                        <div>
                            <ArrowRightIcon />
                        </div>
                        <div className="items-center gap-4">
                            <Input
                                name="rename"
                                value={rename}
                                onChange={(ev) => handleRenameChange(ev.target.value)}
                            />
                            {error === AltrError.RenameCasing && <>Invalid input</>}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" onClick={handleSaveClick}>
                                Save changes
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
