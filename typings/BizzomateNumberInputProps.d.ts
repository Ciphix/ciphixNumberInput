/**
 * This file was generated from BizzomateNumberInput.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ActionValue, DynamicValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type InputTypeEnum = "decimal" | "integer" | "string";

export interface AllowedDecimalSeparatorsType {
    allowedDecimalSeparator: string;
}

export interface AllowedDecimalSeparatorsPreviewType {
    allowedDecimalSeparator: string;
}

export interface BizzomateNumberInputContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    numberInput: EditableValue<Big | string>;
    inputType: InputTypeEnum;
    placeholder?: DynamicValue<string>;
    fixedDecimal: boolean;
    decimalScale: number;
    decimalSeparator?: DynamicValue<string>;
    allowedDecimalSeparators: AllowedDecimalSeparatorsType[];
    thousandSeparator?: DynamicValue<string>;
    prefix?: DynamicValue<string>;
    suffix?: DynamicValue<string>;
    onChangeAction?: ActionValue;
}

export interface BizzomateNumberInputPreviewProps {
    readOnly: boolean;
    numberInput: string;
    inputType: InputTypeEnum;
    placeholder: string;
    fixedDecimal: boolean;
    decimalScale: number | null;
    decimalSeparator: string;
    allowedDecimalSeparators: AllowedDecimalSeparatorsPreviewType[];
    thousandSeparator: string;
    prefix: string;
    suffix: string;
    onChangeAction: {} | null;
}
