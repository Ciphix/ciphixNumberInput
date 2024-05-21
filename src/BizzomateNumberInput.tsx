import { ReactElement, createElement, useEffect, useState, Fragment } from "react";
import { Big } from "big.js";
import { NumberFormatValues, NumericFormat, SourceInfo } from "react-number-format";
import { AllowedDecimalSeparatorsType, BizzomateNumberInputContainerProps } from "../typings/BizzomateNumberInputProps";
import { Alert } from "./components/Alert";

import "./ui/BizzomateNumberInput.css";

const getSeparatorOptions = (options: AllowedDecimalSeparatorsType[]): string[] => {
    const separatorOptions: string[] = [];
    options.forEach(option => {
        separatorOptions.push(option.allowedDecimalSeparator);
    });
    return separatorOptions;
};

export function BizzomateNumberInput({
    numberInput,
    inputType,
    placeholder,
    fixedDecimal,
    decimalScale,
    decimalSeparator,
    allowedDecimalSeparators,
    thousandSeparator,
    prefix,
    suffix,
    id,
    tabIndex,
    onChangeAction
}: BizzomateNumberInputContainerProps): ReactElement {
    const [numberValue, setNumberValue] = useState<string | number | undefined>();

    const [decimalSeparatorOptions, setDecimalSeparatorOptions] = useState<string[] | undefined>();
    const [placeholderValue, setPlaceholderValue] = useState<string | undefined>();
    const [decimalSeparatorValue, setDecimalSeparatorValue] = useState<string | undefined>();
    const [thousandSeparatorValue, setThousandSeparatorValue] = useState<string | undefined>();
    const [prefixValue, setPrefixValue] = useState<string | undefined>();
    const [suffixValue, setSuffixValue] = useState<string | undefined>();
    const [readOnly, setReadOnly] = useState<boolean>(false);

    // Set NumberInput value
    useEffect(() => {
        if (numberInput?.value) {
            setNumberValue(+numberInput.value.toString());
        } else {
            setNumberValue(undefined);
        }
    }, [numberInput.value]);

    // Set the decimal separator options
    useEffect(() => {
        if (allowedDecimalSeparators.length > 0) {
            setDecimalSeparatorOptions(getSeparatorOptions(allowedDecimalSeparators));
        } else {
            setDecimalSeparatorOptions(undefined);
        }
    }, [allowedDecimalSeparators]);

    // Get the placeholder
    useEffect(() => {
        if (placeholder?.value) {
            setPlaceholderValue(placeholder.value);
        } else {
            setPlaceholderValue(undefined);
        }
    }, [placeholder?.value]);

    // Get the decimal separator
    useEffect(() => {
        if (decimalSeparator?.value) {
            setDecimalSeparatorValue(decimalSeparator.value);
        } else {
            setDecimalSeparatorValue(undefined);
        }
    }, [decimalSeparator?.value]);

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

    // handle changes
    const handleChange = (values: NumberFormatValues, sourceInfo: SourceInfo): void => {
        if (!(sourceInfo.source === "event")) {
            return;
        }

        if (inputType === "decimal" || inputType === "integer") {
            if (values.floatValue) {
                if (inputType === "integer") {
                    numberInput.setValue(new Big(Math.round(values.floatValue)));
                } else {
                    numberInput.setValue(new Big(values.floatValue));
                }
            } else {
                numberInput.setValue(undefined);
            }
        } else if (inputType === "string") {
            if (values.formattedValue) {
                numberInput.setValue(values.formattedValue);
            } else {
                numberInput.setValue(undefined);
            }
        }

        if (onChangeAction && onChangeAction.canExecute && !onChangeAction.isExecuting) {
            onChangeAction.execute();
        }
    };

    // render
    return (
        <Fragment>
            <NumericFormat
                value={numberValue}
                onValueChange={handleChange}
                className="form-control"
                fixedDecimalScale={fixedDecimal}
                decimalScale={decimalScale}
                placeholder={placeholderValue}
                decimalSeparator={decimalSeparatorValue ? decimalSeparatorValue : undefined}
                allowedDecimalSeparators={decimalSeparatorOptions ? decimalSeparatorOptions : undefined}
                thousandSeparator={thousandSeparatorValue ? thousandSeparatorValue : undefined}
                prefix={prefixValue ? prefixValue : undefined}
                suffix={suffixValue ? suffixValue : undefined}
                displayType={readOnly ? "text" : "input"}
                id={id}
                tabIndex={tabIndex}
            />
            <Alert>{numberInput?.validation}</Alert>
        </Fragment>
    );
}
