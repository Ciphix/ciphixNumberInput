import { ReactElement, createElement, useEffect, useState, useRef, Fragment } from "react";
import { Big } from "big.js";
import { NumberFormatValues, NumericFormat, SourceInfo } from "react-number-format";
import {
    AllowedDecimalSeparatorsType,
    BizzomateNumberInputContainerProps,
    InputTypeEnum
} from "../typings/BizzomateNumberInputProps";
import { Alert } from "./components/Alert";
import { EditableValue } from "mendix";

import "./ui/BizzomateNumberInput.css";

const getSeparatorOptions = (options: AllowedDecimalSeparatorsType[]): string[] => {
    const separatorOptions: string[] = [];
    options.forEach(option => {
        separatorOptions.push(option.allowedDecimalSeparator);
    });
    return separatorOptions;
};

// Parse the Mendix attribute value to the correct value for the NumbericFormat input
const getNumberValue = (input: EditableValue, inputType: InputTypeEnum): string | number => {
    if (!input || !input.value) {
        return ""; // Return an empty string instead of undefined because of a bug in NumbericFormat not re-rendering when value becomes empty
    }

    if (inputType === "string") {
        return input.displayValue;
    }

    return Number(input.value);
};

// Parse the NumericFormat-value to the correct value for the selected Mendix attribute
const getResult = (values: NumberFormatValues, inputType: InputTypeEnum): string | Big | undefined => {
    if (!values.floatValue) {
        return undefined;
    }

    if (inputType === "decimal") {
        return new Big(values.floatValue);
    } else if (inputType === "integer") {
        return new Big(Math.round(values.floatValue));
    } else {
        return values.formattedValue;
    }
};

export function BizzomateNumberInput({
    decimalInput,
    integerInput,
    stringInput,
    inputType,
    placeholder,
    decimalMode,
    decimalPrecision,
    decimalSeparator,
    allowedDecimalSeparators,
    groupDigits,
    thousandSeparator,
    prefix,
    suffix,
    id,
    tabIndex,
    onChangeAction,
    onBlurAction,
    onFocusAction,
    onChangeBehaviour,
    onChangeAfter
}: BizzomateNumberInputContainerProps): ReactElement {
    const [numberValue, setNumberValue] = useState<string | number | undefined>();
    const storedValue = useRef<string | Big | undefined>();
    const isChanged = useRef<boolean>(false);
    const [timeOutId, setTimeOutId] = useState<number | undefined>();
    const [placeholderValue, setPlaceholderValue] = useState<string | undefined>();
    const [decimalScale, setDecimalScale] = useState<number | undefined>();
    const [decimalSeparatorValue, setDecimalSeparatorValue] = useState<string | undefined>();
    const [thousandSeparatorValue, setThousandSeparatorValue] = useState<string | undefined>();
    const [prefixValue, setPrefixValue] = useState<string | undefined>();
    const [suffixValue, setSuffixValue] = useState<string | undefined>();
    const [readOnly, setReadOnly] = useState<boolean>(false);

    // Set numberInput based on selected inputType, allows us to continue with a single variable from here on instead of looking at string/integer/decimal-input
    const numberInput: EditableValue =
        inputType === "string" ? stringInput : inputType === "integer" ? integerInput : decimalInput;

    // Set numberInput value
    useEffect(() => {
        setNumberValue(getNumberValue(numberInput, inputType));
    }, [numberInput, numberInput?.value, inputType]);

    // Get the placeholder
    useEffect(() => {
        if (placeholder?.value) {
            setPlaceholderValue(placeholder.value);
        } else {
            setPlaceholderValue(undefined);
        }
    }, [placeholder?.value]);

    // DecimalScale
    useEffect(() => {
        if (inputType !== "integer" && decimalMode === "fixed" && decimalPrecision) {
            setDecimalScale(decimalPrecision);
        } else {
            setDecimalScale(undefined);
        }
    }, [inputType, decimalMode, decimalPrecision]);

    // Get the decimal separator
    useEffect(() => {
        if (decimalSeparator?.value && inputType !== "integer") {
            setDecimalSeparatorValue(decimalSeparator.value);
        } else {
            setDecimalSeparatorValue(undefined);
        }
    }, [inputType, decimalSeparator?.value]);

    // Get the thousands separator
    useEffect(() => {
        if (thousandSeparator?.value) {
            setThousandSeparatorValue(thousandSeparator.value);
        } else {
            setThousandSeparatorValue(undefined);
        }
    }, [thousandSeparator?.value]);

    // Get the prefix
    useEffect(() => {
        if (prefix?.value) {
            setPrefixValue(prefix.value);
        } else {
            setPrefixValue(undefined);
        }
    }, [prefix?.value]);

    // Get the suffix
    useEffect(() => {
        if (suffix?.value) {
            setSuffixValue(suffix.value);
        } else {
            setSuffixValue(undefined);
        }
    }, [suffix?.value]);

    // Check if the item is editable
    useEffect(() => {
        setReadOnly(!!numberInput?.readOnly);
    }, [numberInput?.readOnly]);

    // Handle user changes to the numeric value
    const handleValueChange = (values: NumberFormatValues, sourceInfo: SourceInfo): void => {
        if (!(sourceInfo.source === "event")) {
            return;
        }

        storedValue.current = getResult(values, inputType);
        isChanged.current = true;

        if (onChangeBehaviour === "during") {
            clearTimeout(timeOutId);
            setTimeOutId(Number(setTimeout(processChange, onChangeAfter)));
        }
    };

    // Process changed values to Mendix
    const processChange = (): void => {
        numberInput.setValue(storedValue.current);
        isChanged.current = false;

        if (onChangeAction && onChangeAction.canExecute && !onChangeAction.isExecuting) {
            onChangeAction.execute();
        }
    };

    // Handle focus / on enter event
    const handleFocus = (): void => {
        if (onFocusAction && onFocusAction.canExecute && !onFocusAction.isExecuting) {
            onFocusAction.execute();
        }
    };

    // Hande blur / on leave event
    const handleBlur = (): void => {
        if (onBlurAction && onBlurAction.canExecute && !onBlurAction.isExecuting) {
            onBlurAction.execute();
        }
        if (onChangeBehaviour === "after" && isChanged.current === true) {
            processChange();
        }
    };

    // Render the NumericFormat input widget
    return (
        <Fragment>
            <NumericFormat
                value={numberValue}
                onValueChange={handleValueChange}
                onFocus={onFocusAction ? handleFocus : undefined}
                onBlur={handleBlur}
                className={readOnly ? "form-control-static" : "form-control"}
                fixedDecimalScale={inputType !== "integer" ? decimalMode === "fixed" : undefined}
                decimalScale={decimalScale}
                placeholder={placeholderValue}
                decimalSeparator={decimalSeparatorValue}
                allowedDecimalSeparators={
                    inputType !== "integer" && allowedDecimalSeparators
                        ? getSeparatorOptions(allowedDecimalSeparators)
                        : undefined
                }
                thousandSeparator={groupDigits ? thousandSeparatorValue : undefined}
                prefix={prefixValue}
                suffix={suffixValue}
                displayType={readOnly ? "text" : "input"}
                id={id}
                tabIndex={tabIndex}
                inputMode={inputType === "integer" || decimalPrecision === 0 ? "numeric" : "decimal"}
            />
            <Alert>{numberInput?.validation}</Alert>
        </Fragment>
    );
}
