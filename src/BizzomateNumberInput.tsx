import { ReactElement, createElement, useState, useRef, Fragment, KeyboardEvent } from "react";
import { Big } from "big.js";
import { NumberFormatValues, NumericFormat, SourceInfo } from "react-number-format";
import { BizzomateNumberInputContainerProps, InputTypeEnum } from "../typings/BizzomateNumberInputProps";
import { Alert } from "./components/Alert";
import useSettings from "./hooks/useSettings";

interface inputRef {
    isChanged: boolean;
    newValue: string | Big | undefined;
}

// Parse the NumericFormat-value to the correct value for the selected Mendix attribute
const getResult = (values: NumberFormatValues, inputType: InputTypeEnum): string | Big | undefined => {
    if (values.floatValue === undefined) {
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

export function BizzomateNumberInput(props: BizzomateNumberInputContainerProps): ReactElement {
    const widgetRef = useRef<inputRef>({ isChanged: false, newValue: undefined });
    const [timeOutId, setTimeOutId] = useState<number | undefined>();
    const {
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
        inputMode,
        disabled
    } = useSettings(props);

    // Handle user changes to the numeric value
    const handleValueChange = (values: NumberFormatValues, sourceInfo: SourceInfo): void => {
        if (!(sourceInfo.source === "event")) {
            return;
        }

        widgetRef.current = { isChanged: true, newValue: getResult(values, props.inputType) };

        if (props.onChangeBehaviour === "during") {
            clearTimeout(timeOutId);
            setTimeOutId(Number(setTimeout(processChange, props.onChangeAfter)));
        }
    };

    // Process changed values to Mendix
    const processChange = (): void => {
        numberInput.setValue(widgetRef.current.newValue);
        widgetRef.current = { isChanged: false, newValue: undefined };

        if (props.onChangeAction && props.onChangeAction.canExecute && !props.onChangeAction.isExecuting) {
            props.onChangeAction.execute();
        }
    };

    // Handle focus / on enter event
    const handleFocus = (): void => {
        if (props.onFocusAction && props.onFocusAction.canExecute && !props.onFocusAction.isExecuting) {
            props.onFocusAction.execute();
        }
    };

    // Hande blur / on leave event
    const handleBlur = (): void => {
        if (props.onBlurAction && props.onBlurAction.canExecute && !props.onBlurAction.isExecuting) {
            props.onBlurAction.execute();
        }
        if (props.onChangeBehaviour === "after" && widgetRef.current.isChanged === true) {
            processChange();
        }
    };

    // Handle onKeyDown for enter key
    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (
            e.key === "Enter" &&
            props.onEnterKeyAction &&
            props.onEnterKeyAction.canExecute &&
            !props.onEnterKeyAction.isExecuting
        ) {
            props.onEnterKeyAction.execute();
        }
    };

    // Render the NumericFormat input widget
    return (
        <Fragment>
            <NumericFormat
                value={numberValue}
                onValueChange={handleValueChange}
                onFocus={props.onFocusAction ? handleFocus : undefined}
                onKeyDown={props.onEnterKeyAction ? handleOnKeyDown : undefined}
                onBlur={handleBlur}
                className={className}
                fixedDecimalScale={fixedDecimalScale}
                decimalScale={decimalScale}
                placeholder={placeholderValue}
                decimalSeparator={decimalSeparatorValue}
                allowedDecimalSeparators={allowedDecimalSeparators}
                thousandSeparator={thousandSeparatorValue}
                prefix={prefixValue}
                suffix={suffixValue}
                displayType={displayType}
                id={props.id}
                tabIndex={props.tabIndex}
                inputMode={inputMode}
                disabled={disabled}
            />
            <Alert>{numberInput?.validation}</Alert>
        </Fragment>
    );
}
