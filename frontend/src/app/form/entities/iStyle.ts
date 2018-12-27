import { FormControl } from '@angular/forms';

export interface IStyle {
    type: types;
    name?: string;
    cols?: number;
    rows?: number;
    /** Only type image */
    width?: number;
    /** Only type image */
    height?: number;
    prefix?: string | pre_suf_fix;
    suffix?: string | pre_suf_fix;
    /** Submit the form when the input changes */
    submitOnChanges?: boolean;
    /** Only type number and slider and files */
    min?: number;
    /** Only type number and slider and files */
    max?: number;
    /** Only type radiobutton and slider */
    row?: boolean;
    /** Only type number and slider */
    step?: number;
    touchUi?: boolean;
    placeholder?: string;
    label?: string;
    /** By default outline */
    appearance?: string;
    /** Only type select */
    multiple?: boolean;
    /** If array,first left, second right place */
    info?: string | [string, string];
    /** Only type select, radiobutton and autocomplete type */
    options?: options[] | {
        optionGroup: {
            label: string;
            options: options[];
        }
    }[];
}

interface pre_suf_fix {
    icon: string;
}

interface options {
    value: string;
    label: string;
}

type types = 'text' | 'select' | 'sliderToggle' | 'textarea' | 'color' | 'date' | 'datetime-local'
    | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'checkbox' | 'time' | 'week'
    | 'url' | 'divider' | 'slider' | 'radio' | 'image' | 'file' | 'chips' | 'geoname' | 'autocomplete'
    | 'iban' | 'icon' | 'swift';
