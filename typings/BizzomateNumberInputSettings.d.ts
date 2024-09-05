export type classNameEnum = "form-control" | "form-control-static";
export type displayTypeEnum = "input" | "text";
export type inputModeEnum = "numeric" | "decimal";

export interface BizzomateNumberInputSettings {
    numberInput: EditableValue;
    numberValue?: string | number;
    placeholderValue?: string;
    fixedDecimalScale?: boolean;
    decimalScale?: number;
    decimalSeparatorValue?: string;
    allowedDecimalSeparators?: string[];
    thousandSeparatorValue?: string;
    prefixValue?: string;
    suffixValue?: string;
    className?: classNameEnum;
    displayType?: displayTypeEnum;
    inputMode?: inputModeEnum;
}
