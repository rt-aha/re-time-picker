import { AllowedComponentProps } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { DefineComponent } from 'vue';
import { VNodeProps } from 'vue';

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare type ApmColumnPlacement = 'first' | 'last';

declare type CusTimeListRange = Array<[number, number] | number>;

declare type CustomText = {
    [key in CustomTextUnion]: string;
};

declare type CustomTextUnion = 'apm' | 'am' | 'pm' | 'hour' | 'min' | 'sec';

declare const _default: __VLS_WithTemplateSlots<DefineComponent<{
    apmColumnPlacement: {
        type: globalThis.PropType<ApmColumnPlacement>;
        default: string;
    };
    customText: {
        type: globalThis.PropType<Partial<CustomText>>;
        default: () => {};
    };
    showHeader: {
        type: globalThis.PropType<boolean>;
        default: boolean;
    };
    hourRange: {
        type: globalThis.PropType<CusTimeListRange>;
        default: () => never[];
    };
    minRange: {
        type: globalThis.PropType<CusTimeListRange>;
        default: () => never[];
    };
    secRange: {
        type: globalThis.PropType<CusTimeListRange>;
        default: () => never[];
    };
    hourInterval: {
        type: globalThis.PropType<number>;
        required: true;
        default: number;
    };
    minInterval: {
        type: globalThis.PropType<number>;
        required: true;
        default: number;
    };
    secInterval: {
        type: globalThis.PropType<number>;
        required: true;
        default: number;
    };
    disabled: {
        type: globalThis.PropType<boolean>;
        default: boolean;
    };
    placeholder: {
        type: globalThis.PropType<string>;
        default: string;
    };
    modelValue: {
        type: globalThis.PropType<string>;
        required: true;
        default: string;
    };
    format: {
        type: globalThis.PropType<string>;
        default: () => "HH:mm:ss A";
    };
    showIcon: {
        type: globalThis.PropType<boolean>;
        default: boolean;
    };
}, {}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    open: (...args: any[]) => void;
    close: (...args: any[]) => void;
    change: (...args: any[]) => void;
}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<globalThis.ExtractPropTypes<{
    apmColumnPlacement: {
        type: globalThis.PropType<ApmColumnPlacement>;
        default: string;
    };
    customText: {
        type: globalThis.PropType<Partial<CustomText>>;
        default: () => {};
    };
    showHeader: {
        type: globalThis.PropType<boolean>;
        default: boolean;
    };
    hourRange: {
        type: globalThis.PropType<CusTimeListRange>;
        default: () => never[];
    };
    minRange: {
        type: globalThis.PropType<CusTimeListRange>;
        default: () => never[];
    };
    secRange: {
        type: globalThis.PropType<CusTimeListRange>;
        default: () => never[];
    };
    hourInterval: {
        type: globalThis.PropType<number>;
        required: true;
        default: number;
    };
    minInterval: {
        type: globalThis.PropType<number>;
        required: true;
        default: number;
    };
    secInterval: {
        type: globalThis.PropType<number>;
        required: true;
        default: number;
    };
    disabled: {
        type: globalThis.PropType<boolean>;
        default: boolean;
    };
    placeholder: {
        type: globalThis.PropType<string>;
        default: string;
    };
    modelValue: {
        type: globalThis.PropType<string>;
        required: true;
        default: string;
    };
    format: {
        type: globalThis.PropType<string>;
        default: () => "HH:mm:ss A";
    };
    showIcon: {
        type: globalThis.PropType<boolean>;
        default: boolean;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    apmColumnPlacement: ApmColumnPlacement;
    customText: Partial<CustomText>;
    showHeader: boolean;
    hourRange: CusTimeListRange;
    minRange: CusTimeListRange;
    secRange: CusTimeListRange;
    hourInterval: number;
    minInterval: number;
    secInterval: number;
    disabled: boolean;
    placeholder: string;
    modelValue: string;
    format: string;
    showIcon: boolean;
}, {}>, {
    prefix?(_: {}): any;
    suffix?(_: {}): any;
    upper?(_: {}): any;
}>;
export default _default;

export { }
