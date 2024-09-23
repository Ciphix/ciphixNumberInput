import { EditableValue } from "mendix";

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
    className?: string;
    displayType?: displayTypeEnum;
    inputMode?: inputModeEnum;
    disabled?: boolean;
}

export interface sessionLocale {
    decimalSeparator: string;
    groupingSeparator: string;
    minusSign: string;
}
