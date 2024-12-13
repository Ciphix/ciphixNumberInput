/**
 * This file was generated from BizzomateNumberInput.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ActionValue, DynamicValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type InputTypeEnum = "decimal" | "integer" | "string";

export type ReadOnlyStleEnum = "control" | "text";

export type DecimalModeEnum = "fixed" | "auto";

export type DecimalSeparatorBehaviorEnum = "strict" | "lax" | "custom";

export interface AllowedDecimalSeparatorsType {
    allowedDecimalSeparator: string;
}

export type OnChangeBehaviourEnum = "after" | "during";

export interface AllowedDecimalSeparatorsPreviewType {
    allowedDecimalSeparator: string;
}

export interface BizzomateNumberInputContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    inputType: InputTypeEnum;
    integerInput: EditableValue<Big>;
    decimalInput: EditableValue<Big>;
    stringInput: EditableValue<string>;
    placeholder?: DynamicValue<string>;
    readOnlyStle: ReadOnlyStleEnum;
    prefix?: DynamicValue<string>;
    suffix?: DynamicValue<string>;
    customSeparators: boolean;
    decimalMode: DecimalModeEnum;
    decimalPrecision: number;
    decimalSeparator: DynamicValue<string>;
    decimalSeparatorBehavior: DecimalSeparatorBehaviorEnum;
    allowedDecimalSeparators: AllowedDecimalSeparatorsType[];
    groupDigits: boolean;
    thousandSeparator: DynamicValue<string>;
    onChangeAction?: ActionValue;
    onFocusAction?: ActionValue;
    onBlurAction?: ActionValue;
    onEnterKeyAction?: ActionValue;
    onChangeBehaviour: OnChangeBehaviourEnum;
    onChangeAfter: number;
}

export interface BizzomateNumberInputPreviewProps {
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    inputType: InputTypeEnum;
    integerInput: string;
    decimalInput: string;
    stringInput: string;
    placeholder: string;
    readOnlyStle: ReadOnlyStleEnum;
    prefix: string;
    suffix: string;
    customSeparators: boolean;
    decimalMode: DecimalModeEnum;
    decimalPrecision: number | null;
    decimalSeparator: string;
    decimalSeparatorBehavior: DecimalSeparatorBehaviorEnum;
    allowedDecimalSeparators: AllowedDecimalSeparatorsPreviewType[];
    groupDigits: boolean;
    thousandSeparator: string;
    onChangeAction: {} | null;
    onFocusAction: {} | null;
    onBlurAction: {} | null;
    onEnterKeyAction: {} | null;
    onChangeBehaviour: OnChangeBehaviourEnum;
    onChangeAfter: number | null;
}
