import { EditableValue } from "mendix";

export type displayTypeEnum = "input" | "text";
export type inputModeEnum = "numeric" | "decimal";

export interface CiphixNumberInputSettings {
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
    className?: string;
    displayType?: displayTypeEnum;
    inputMode?: inputModeEnum;
    disabled?: boolean;
    maxValue?: number;
    minValue?: number;
}

export interface sessionLocale {
    decimalSeparator: string;
    groupingSeparator: string;
    minusSign: string;
}
