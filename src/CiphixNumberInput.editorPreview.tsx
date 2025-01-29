import { ReactElement, createElement } from "react";
import { CiphixNumberInputPreviewProps } from "../typings/CiphixNumberInputProps";

export function preview(props: CiphixNumberInputPreviewProps): ReactElement {
    let valueString = "";

    if (props.prefix) {
        valueString = valueString + props.prefix + " ";
    }
    valueString =
        valueString +
        "[" +
        (props.inputType === "decimal"
            ? props.decimalInput
            : props.inputType === "integer"
            ? props.integerInput
            : props.stringInput) +
        "]";
    if (props.suffix) {
        valueString = valueString + " " + props.suffix;
    }

    return props.readOnly && props.readOnlyStle === "text" ? (
        <span className={"form-control"}>{valueString}</span>
    ) : (
        <input value={valueString} className="form-control" readOnly={props.readOnly} />
    );
}
