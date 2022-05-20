import { FormatTypes, FormatField } from 'farrow-schema/formatter';
import { ApiEntries } from './api';
export declare type FormatApi = {
    type: 'Api';
    description?: string;
    deprecated?: string;
    input: FormatField;
    output: FormatField;
};
export declare type FormatEntries = {
    type: 'Entries';
    entries: {
        [key: string]: FormatApi | FormatEntries;
    };
};
export declare type FormatResult = {
    protocol: 'Farrow-API';
    types: FormatTypes;
    entries: FormatEntries;
};
export declare const toJSON: (apiEntries: ApiEntries) => FormatResult;
