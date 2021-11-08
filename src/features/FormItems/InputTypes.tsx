import React, { ReactChild } from 'react'

export type DraggableInputUpload = {
    name: string,
    title: string,
    titleSize: number,
    required: boolean,
    requiredMessage?: string,
    dragIcon?: ReactChild,
    uploadText: string,
    uploadHint?: string,
    type: string,
}

export type simpleInput = {
    name: string,
    title: string,
    titleSize: number,
    buttonWithName?: ReactChild,
    inputPlaceholder: string,
    required: boolean,
    requiredMessage?: string,
    prefix?: ReactChild | null,
    type: string,
    defaultValue?: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
} 

export type SelectOption = {
    value: string,
    disabled: boolean,
}

export type SelectInputType = {
    name: string,
    title: string,
    titleSize: number, 
    placeholder?: string,
    defaultValue?: string,
    options: SelectOption[] | [],
    disabled: boolean,
    type: string,
    onChange: (e: string) => void
}

// export type 


export type GeneralInputTypes = (DraggableInputUpload | simpleInput);