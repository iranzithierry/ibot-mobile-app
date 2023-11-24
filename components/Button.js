import React from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import { theme } from '../Theme/Index';

export default function Button({ onPress, children, backgroundColor, size = 'medium', borderRadius, classNameArg, disabled, showLoader, loaderClassName, loaderSize = 'small', loaderColor = 'white', loaderSide = 'right' }) {
    const buttonSize = {
        small: 'px-3 py-2',
        base: 'px-5 py-2.5',
        large: 'px-5 py-3',
        xlarge: 'px-6 py-3.5'
    }[size] || 'px-5 py-2.5';

    return (
        <Pressable
            style={{
                backgroundColor: disabled
                    ? theme.bgPrimary.disabled
                    : backgroundColor || theme.bgPrimary.primary,
            }}
            disabled={disabled || false}
            className={`flex flex-row items-center my-2 
                    ${showLoader ? 'justify-evenly' : 'justify-center'}
                    ${buttonSize} 
                    ${borderRadius || 'rounded-md'} 
                    ${classNameArg || ''}`
            }
            onPress={onPress}
        >
            <React.Fragment>
                {showLoader && loaderSide === 'left' && disabled == false && (
                    <ActivityIndicator
                        size={loaderSize}
                        color={loaderColor}
                        className={`inline mr-2 ${loaderClassName || ''}`}
                    />
                )}
            </React.Fragment>
            {children}
            <React.Fragment>
                {showLoader && loaderSide === 'right' && disabled == false && (
                    <ActivityIndicator
                        size={loaderSize}
                        color={loaderColor}
                        className={`inline mr-2 ${loaderClassName || ''}`}
                    />
                )}
            </React.Fragment>
        </Pressable>
    );
}
