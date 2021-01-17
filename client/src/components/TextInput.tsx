import React, { useMemo } from 'react';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import COLOR from '../styles/color';
import Text from './Text';
import styled from 'styled-components';
// Current status icons are the two below
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';


const TextFieldColours = {
    default: {
        border: COLOR.OUTLINE.DARK,
        label: COLOR.TEXT.MEDIUM,
        icon: COLOR.TEXT.MEDIUM,
        filled: COLOR.PRIMARY.GREY[200],
        'filled-icon': COLOR.TEXT.DARK // Currently filled icon is the same no matter the state
    },
    focused: {
        border: COLOR.PRIMARY.BRAND[800],
        label: COLOR.PRIMARY.BRAND[800],
        icon: COLOR.PRIMARY.BRAND[900],
        filled: COLOR.PRIMARY.GREY[300],
    },
    typedIn: {
        border: COLOR.OUTLINE.BASE,
        label: COLOR.TEXT.DARK,
        icon: COLOR.TEXT.MEDIUM,
        filled: COLOR.PRIMARY.GREY[200],
    },
    error: {
        border: COLOR.SECONDARY.DANGER[700],
        label: COLOR.SECONDARY.DANGER[700],
        icon: COLOR.SECONDARY.DANGER[600],
        'status-text': COLOR.SECONDARY.DANGER[900],
        'status-icon': COLOR.SECONDARY.DANGER[700],
    },
    success: {
        border: COLOR.SECONDARY.SUCCESS[600],
        label: COLOR.SECONDARY.SUCCESS[600],
        icon: COLOR.SECONDARY.SUCCESS[600],
        'status-text': COLOR.SECONDARY.SUCCESS[800],
        'status-icon': COLOR.SECONDARY.SUCCESS[600],
    },
    text: COLOR.TEXT.DARK,
    disabled: COLOR.TEXT.DISABLED
}


const baseTextFieldSizeAndPosition = (isTypedIn: boolean) => (
    {
        "& label:not(.Mui-focused)": { // Label in center of TextInput
            marginTop: isTypedIn ? '0px' : '-8px',
        },
        "& label:.Mui-shrink": { // Label in center of TextInput
            marginTop: isTypedIn ? '0px' : '-8px',
        },
        "& .MuiOutlinedInput-adornedEnd, .MuiInputAdornment-root": { // Icon on right
            paddingRight: '0px',
            marginRight: '11px',
        },
        width: '328px',
        height: '40px'
    }
);


const baseMuiOutlineInputSizeAndPosition = {
    borderRadius: 8,
    width: '328px',
    height: '40px',
};


const useTextFieldStyles = (isTypedIn: boolean, isDisabled: boolean) => (
    makeStyles({
        default: {
            "& label:not(.Mui-focused), label:not(.Mui-disabled)": {
                color: isTypedIn ? TextFieldColours.typedIn.label : TextFieldColours.default.label
            },
            "& label.Mui-disabled": {
                color: TextFieldColours.disabled
            },
            "& label.Mui-focused": {
                color: TextFieldColours.focused.label
            },
            "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: isTypedIn ? TextFieldColours.typedIn.border : TextFieldColours.default.border, },// Default borders
                "&:hover fieldset": { borderColor: isTypedIn ? TextFieldColours.typedIn.border : TextFieldColours.default.border, }, // Hovered borders
                "&.Mui-focused fieldset": { borderColor: TextFieldColours.focused.border }, // Focused borders
                "&.Mui-disabled fieldset": { borderColor: TextFieldColours.disabled, }, // Disabled borders 
                "&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": { // Focused icon
                    color: TextFieldColours.focused.icon,
                },
                "& inputAdornment:not(.Mui-focused), .MuiInputAdornment-root .MuiSvgIcon-root": { // Unfocused icon
                    color: (isDisabled && TextFieldColours.disabled) ||
                        (isTypedIn && TextFieldColours.typedIn.icon) ||
                        TextFieldColours.default.icon,
                },
                ...baseMuiOutlineInputSizeAndPosition,
            },
            ...baseTextFieldSizeAndPosition(isTypedIn),
        },
        error: {
            "& label.Mui-focused, label:not(.Mui-focused)": { color: TextFieldColours.error.label },
            "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: TextFieldColours.error.border, },
                "&:hover fieldset": { borderColor: TextFieldColours.error.border, },
                "&.Mui-focused fieldset": { borderColor: TextFieldColours.error.border },
                "& .MuiInputAdornment-root .MuiSvgIcon-root": { color: TextFieldColours.error.icon },
                ...baseMuiOutlineInputSizeAndPosition,
            },
            ...baseTextFieldSizeAndPosition(isTypedIn),
        },
        success: {
            "& label.Mui-focused, label:not(.Mui-focused)": { color: TextFieldColours.success.label },
            "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: TextFieldColours.success.border, },
                "&:hover fieldset": { borderColor: TextFieldColours.success.border, },
                "&.Mui-focused fieldset": { borderColor: TextFieldColours.success.border },
                "& .MuiInputAdornment-root .MuiSvgIcon-root": { color: TextFieldColours.success.icon },
                ...baseMuiOutlineInputSizeAndPosition,
            },
            ...baseTextFieldSizeAndPosition(isTypedIn),
        },
        filled: {
            "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: TextFieldColours.default.filled, },
                "&:hover fieldset": { borderColor: TextFieldColours.default.filled, },
                "&.Mui-focused fieldset": { borderColor: TextFieldColours.focused.filled, },
                "&.Mui-focused": { background: TextFieldColours.focused.filled },
                "& .MuiInputAdornment-root .MuiSvgIcon-root": { color: TextFieldColours.default["filled-icon"] },
                background: isTypedIn ? TextFieldColours.typedIn.filled : TextFieldColours.default.filled,
                ...baseMuiOutlineInputSizeAndPosition,
            },
            ...baseTextFieldSizeAndPosition(isTypedIn),
        },
    })
);


const useInputStyle = makeStyles({
    input: {
        '&::placeholder': {
            color: 'blue' // Doesn't do anything yet
        },
        color: TextFieldColours.text,
    },
});


export enum EvalState {
    error = 'error',
    default = 'default',
    success = 'success',
};


interface CustomTextInputProps {
    currInput: string,
    setCurrInput: React.Dispatch<React.SetStateAction<string>>,
    id?: string,
    label?: string,
    placeholder?: string,
    evalState?: EvalState, // if isDisabled=true, then evalState is ignored
    evalMessage?: string // if evalState is default, then evalMessage is ignored
    isDisabled?: boolean,
    isFilled?: boolean,
    isPassword?: boolean,
}


const TextInput = (props: CustomTextInputProps) => {
    const {
        currInput,
        setCurrInput,
        id,
        label,
        placeholder,
        evalState = EvalState.default,
        evalMessage,
        isDisabled = false,
        isFilled,
        isPassword
    } = props;

    const inputStyle = useInputStyle();

    const textFieldStyles = useTextFieldStyles(currInput !== "", isDisabled);
    const textFieldStyleDefault = textFieldStyles().default;
    const textFieldStyleFilled = textFieldStyles().filled;
    const textFieldStyleEval = textFieldStyles()[evalState];
    const textFieldStyle = useMemo(() => {
        if (isDisabled) return textFieldStyleDefault;
        if (isFilled) return textFieldStyleFilled;
        return textFieldStyleEval;
    }, [isDisabled, isFilled, textFieldStyleDefault, textFieldStyleFilled, textFieldStyleEval]);

    const handleChange = (event: any) => {
        setCurrInput(event.target.value);
    };

    return (
        <Wrapper>
            <TextField
                classes={{ root: textFieldStyle, }}
                label={!isFilled && label} // Filled textfields don't use labels
                placeholder={placeholder}
                variant="outlined"
                id={id}
                disabled={isDisabled}
                type={isPassword ? 'password' : ''}
                defaultValue={currInput}
                onChange={handleChange}
            />
            {evalState !== EvalState.default && <Status evalState={evalState} evalMessage={evalMessage} />}
        </Wrapper>
    );
}


export default TextInput;

const Wrapper = styled.div``;


interface StatusProps {
    evalState: EvalState;
    evalMessage?: string;
}


const Status = ({ evalState, evalMessage }: StatusProps) => {
    const ICON_SIZE = '16px';
    const isError = evalState === EvalState.error;
    const fontColor = isError ? TextFieldColours.error["status-text"] : TextFieldColours.success["status-text"];
    const iconColor = isError ? TextFieldColours.error["status-icon"] : TextFieldColours.success["status-icon"];
    const iconStyle = { fontSize: ICON_SIZE, color: iconColor, weight: '100', };
    return (
        <StatusRow>
            {isError ?
                <CancelOutlinedIcon style={iconStyle} /> :
                <CheckCircleOutlineRoundedIcon style={iconStyle} />
            }
            <EvalText fontColor={fontColor} size='H300_CAPTION'>
                {evalMessage}
            </EvalText>
        </StatusRow>
    );
};


const StatusRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    margin-top: 4px;
    padding-left: 8px;
`;


const EvalText = styled(Text)`
    margin-left: 5px;
`;
