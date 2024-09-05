import { useEffect, useState } from "react";
import { EditableValue } from "mendix";
import {
    AllowedDecimalSeparatorsType,
    BizzomateNumberInputContainerProps,
    InputTypeEnum
} from "../../typings/BizzomateNumberInputProps";

import {
    BizzomateNumberInputSettings,
    classNameEnum,
    displayTypeEnum,
    inputModeEnum
} from "../../typings/BizzomateNumberInputSettings";

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

const getSeparatorOptions = (options: AllowedDecimalSeparatorsType[]): string[] => {
    const separatorOptions: string[] = [];
    options.forEach(option => {
        separatorOptions.push(option.allowedDecimalSeparator);
    });
    return separatorOptions;
};

export default function useSettings(props: BizzomateNumberInputContainerProps): BizzomateNumberInputSettings {
    const [numberValue, setNumberValue] = useState<string | number>();
    const [placeholderValue, setPlaceholderValue] = useState<string>();
    const [decimalScale, setDecimalScale] = useState<number>();
    const [decimalSeparatorValue, setDecimalSeparatorValue] = useState<string>();
    const [thousandSeparatorValue, setThousandSeparatorValue] = useState<string>();
    const [prefixValue, setPrefixValue] = useState<string>();
    const [suffixValue, setSuffixValue] = useState<string>();
    const [className, setClassName] = useState<classNameEnum>();
    const [displayType, setDisplayType] = useState<displayTypeEnum>();

    // Set numberInput based on selected inputType, allows us to continue with a single variable from here on instead of looking at string/integer/decimal-input
    const numberInput: EditableValue =
        props.inputType === "string"
            ? props.stringInput
            : props.inputType === "integer"
            ? props.integerInput
            : props.decimalInput;

    // Set the list of allowed decimal separators, when applicable
    const allowedDecimalSeparators: string[] | undefined =
        props.inputType !== "integer" && props.allowedDecimalSeparators
            ? getSeparatorOptions(props.allowedDecimalSeparators)
            : undefined;

    // Set fixed decimal scale true/false based on inputType and decimalMode
    const fixedDecimalScale: boolean | undefined =
        props.inputType !== "integer" ? props.decimalMode === "fixed" : undefined;

    // What kind of keyboard suggestion to send to mobile device
    const inputMode: inputModeEnum =
        props.inputType === "integer" || props.decimalPrecision === 0 ? "numeric" : "decimal";

    // Set numberInput value
    useEffect(() => {
        setNumberValue(getNumberValue(numberInput, props.inputType));
    }, [numberInput, numberInput?.value, props.inputType]);

    // Get the placeholder
    useEffect(() => {
        if (props.placeholder?.value) {
            setPlaceholderValue(props.placeholder.value);
        } else {
            setPlaceholderValue(undefined);
        }
    }, [props.placeholder?.value]);

    // DecimalScale
    useEffect(() => {
        if (props.inputType !== "integer" && props.decimalMode === "fixed" && props.decimalPrecision) {
            setDecimalScale(props.decimalPrecision);
        } else {
            setDecimalScale(undefined);
        }
    }, [props.inputType, props.decimalMode, props.decimalPrecision]);

    // Get the decimal separator
    useEffect(() => {
        if (props.decimalSeparator?.value && props.inputType !== "integer") {
            setDecimalSeparatorValue(props.decimalSeparator.value);
        } else {
            setDecimalSeparatorValue(undefined);
        }
    }, [props.inputType, props.decimalSeparator?.value]);

    // Get the thousands separator
    useEffect(() => {
        if (props.thousandSeparator?.value) {
            setThousandSeparatorValue(props.thousandSeparator.value);
        } else {
            setThousandSeparatorValue(undefined);
        }
    }, [props.thousandSeparator?.value]);

    // Get the prefix
    useEffect(() => {
        if (props.prefix?.value) {
            setPrefixValue(props.prefix.value);
        } else {
            setPrefixValue(undefined);
        }
    }, [props.prefix?.value]);

    // Get the suffix
    useEffect(() => {
        if (props.suffix?.value) {
            setSuffixValue(props.suffix.value);
        } else {
            setSuffixValue(undefined);
        }
    }, [props.suffix?.value]);

    // Check if the item is editable and set classes and displayType accordingly
    useEffect(() => {
        if (!numberInput?.readOnly) {
            setClassName("form-control");
            setDisplayType("input");
        } else {
            setClassName("form-control-static");
            setDisplayType("text");
        }
    }, [numberInput?.readOnly]);

    return {
        numberInput,
        numberValue,
        placeholderValue,
        fixedDecimalScale,
        decimalScale,
        decimalSeparatorValue,
        allowedDecimalSeparators,
        thousandSeparatorValue,
        prefixValue,
        suffixValue,
        className,
        displayType,
        inputMode
    };
}
