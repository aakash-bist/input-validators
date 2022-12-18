import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';

@Directive({
    selector: '[inputNumberValidator]',
})
export class InputNumberDirective implements OnChanges {
    // allow decimal numbers with up to 2 decimal places
    private decimalRegex: RegExp = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
    // Allow key codes for special events. Reflect :
    // Backspace, tab, end, home
    private specialKeys: Array<string> = ['Backspace', 'Tab', 'Escape', 'End', 'Enter', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete', 'Clear', 'Copy', 'Paste', '-'];
    @Input() limitDecimalPlaces = 0;
    @Input() disableCopy = false;
    @Input() disablePaste = false;
    @Input() allowNegative = false;
    @Input() min = -Infinity;
    @Input() max = Infinity;
    @Input() pattern?: string | RegExp;
    private regex: RegExp | null = null;
    inputElement: HTMLInputElement;

    constructor(public el: ElementRef) {
        this.inputElement = el.nativeElement;
    }

    /**
     * If the min or max input changes, then set the min or max property to the new value, or to -Infinity
     * or Infinity if the new value is not a number
     * @param {SimpleChanges} changes - SimpleChanges
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['min']) {
            this.min = isNaN(Number(this.min)) ? -Infinity : Number(this.min);
        }

        if (changes['max']) {
            this.max = isNaN(Number(this.max)) ? Infinity : Number(this.max);
        }
    }

    /* Preventing the user from entering anything other than a number. */
    @HostListener('beforeinput', ['$event'])
    onBeforeInput(event: InputEvent): any {
        if (isNaN(Number(event.data))) {
            /* This is to allow the user to enter a decimal point. */
            if ((Boolean(this.limitDecimalPlaces) && event.data === '.') || (Boolean(this.allowNegative) && event.data === '-')) return;
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /* Allowing the user to use the keyboard to navigate the input field. */
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): any {
        // Allow Backspace, tab, end, and home keys
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        let current: string = this.el.nativeElement.value;
        let next: string = current.concat(event.key);

        /* This is to prevent the user from entering a number that is greater than the max or less than the min. */
        if (next && Boolean(this.limitDecimalPlaces) && !String(next).match(this.decimalRegex)) {
            event.preventDefault();
        }
        const newNumber = Number(next);
        /* Preventing the user from entering a number that is greater than the max or less than the min. */
        if (newNumber > this.max || newNumber < this.min) {
            event.preventDefault();
        }
    }

    /* Preventing the user from copying the input value. */
    @HostListener('copy', ['$event'])
    onCopy(event: any) {
        if (Boolean(this.disableCopy)) event.preventDefault();
    }

    /* Preventing the user from pasting the input value. */
    @HostListener('paste', ['$event'])
    onPaste(event: any) {
        if (Boolean(this.disablePaste)) event.preventDefault();
    }

    /* Limiting the number of decimal places. */
    @HostListener('input', ['$event'])
    onInput(event: any) {
        const input = event.target;
        const value = input.value;

        // If the value contains more decimal places than allowed, truncate it
        if (Boolean(this.limitDecimalPlaces) && value.indexOf('.') !== -1 && value.split('.')[1].length > this.limitDecimalPlaces) {
            input.value = value.substring(0, value.indexOf('.') + this.limitDecimalPlaces + 1);
        }
        /* This is to prevent the user from entering more than one negative sign. */
        if (Boolean(this.allowNegative) && value.indexOf('-') !== -1 && value.split('-').length !== 2) {
            input.value = value.substring(0, 1);
        }
    }
}
