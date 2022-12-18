# @goodbetterbist/input-validators

InputNumberValidator prevents users from entering values based on input field attributes.

## Installation

To install this library, run:

```bash
npm i @goodbetterbist/input-validators
```

## Usage
#### TypeScript
Import the `InputValidatorsModule`:

```ts
import { InputValidatorsModule } from '@goodbetterbist/input-validators';

@NgModule({
  imports: [
     ...,
    InputValidatorsModule
  ],
    ...
})
export class AppModule { }
```
#### HTML
###### Use the `inputNumberValidator` directive in your input fields for numbers only.
```html
<input type="text" inputNumberValidator />
```
###### For `min` & `max` value 
```html
<!-- To input numbers between 1 & 100  -->
<input
type="text"
inputNumberValidator
placeholder="00"
[min]="1"
[max]="100"
/>
```

###### To disable copy and paste

```html
<input
type="text"
inputNumberValidator
placeholder="00"
[disableCopy] = 'true'
[disablePaste] = 'true'
/>
```
###### To limit decimal places

```html
<input
type="text"
inputNumberValidator
placeholder="00"
[limitDecimalPlaces]="2"
/>
<!-- limits the number of decimal places allowed in an input field -->
```
###### To allow negative numbers

```html
<input
type="text"
inputNumberValidator
placeholder="00"
[allowNegative]="true"
/>
```

## Attributes with usage

| Attribute|Usage| Description|
|--------------------------------|----------------|------------------------------------------------------------- |
| **`inputNumberValidator`** |  **`<input type="text" inputNumberValidator />`**  | **Allow to use numbers only**        |
| **`min`**                             |  **`<input type="text" inputNumberValidator [min]="2" />`**  | **Prevents from entering less than minimum**                                  |
| **`max`**                            |  **`<input type="text" inputNumberValidator [max]="100" />`**   |  **Prevents from entering more than maximum**                            |
| **`disableCopy`**                            |  **`<input type="text" inputNumberValidator [disableCopy]="true" />`**   |  **Prevents from copying input value**                            |
| **`disablePaste`**                            |  **`<input type="text" inputNumberValidator [disablePaste]="true" />`**   |  **Prevents from pasting value**                            |
| **`limitDecimalPlaces`**                            |  **`<input type="text" inputNumberValidator [limitDecimalPlaces]="2" />`**   |  **To limit decimal places**                            |
| **`allowNegative`**                            |  **`<input type="text" inputNumberValidator [allowNegative]="true" />`**   |  **To allow negative numbers**                            |
