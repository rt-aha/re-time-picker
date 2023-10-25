
# Style

## custom style

This feature let you has minimum control of the component with setting css variables! 

The default setting is following:

```css
:root {
  // shared
  --rtp-c-main: #1a237e;
  --rtp-c-black: #000000;
  --rtp-c-white: #ffffff;
  --rtp-c-assist: #cccccc;
  --rtp-bw: 1px;
  --rtp-br: 4px;
  // specific - color
  --rtp-c-header-bg: #cccccc50;
  --rtp-c-header-text: var(--rtp-c-main);
  --rtp-c-field-value: var(--rtp-c-black);
  --rtp-c-field-bg: var(--rtp-c-white);
  --rtp-c-field-border: var(--rtp-c-assist);
  --rtp-c-field-border--hover: var(--rtp-c-main);
  --rtp-c-dropdown-border: var(--rtp-c-assist);
  --rtp-c-dropdown-bg: var(--rtp-c-white);
  --rtp-c-value-line: var(--rtp-c-assist);
  --rtp-c-range-item: var(--rtp-c-black);
  --rtp-c-divide-line: var(--rtp-c-assist);
  // specific - border-width
  --rtp-bw-field: var(--rtp-bw);
  // specific - border-radius
  --rtp-br-field: var(--rtp-br);
  --rtp-br-dropdown: var(--rtp-br);
}
```


e.g. a field with border-bottom only.

```css
:root {
  --rtp-bw-field: 0 0 1px 0;
  --rtp-br-field: 0;
}
```