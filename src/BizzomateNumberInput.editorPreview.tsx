import { ReactElement, createElement } from "react";
import { BizzomateNumberInputPreviewProps } from "../typings/BizzomateNumberInputProps";

export function preview(props: BizzomateNumberInputPreviewProps): ReactElement {
    let valueString = "";

    if (props.prefix) {
        valueString = valueString + props.prefix + " ";
    }
    valueString = valueString + "[" + props.numberInput + "]";
    if (props.suffix) {
        valueString = valueString + " " + props.suffix;
    }

    return <input value={valueString} className="form-control" readOnly={props.readOnly} />;
}

export function getPreviewCss(): string {
    return require("./ui/BizzomateNumberInput.css");
}
