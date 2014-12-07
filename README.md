less-plugin-unique-directive
============================

A Less plugin to eliminate redundant @-rules such as `@keyframes` in the output CSS.

## Usage

```bash
~ npm install -g less-plugin-unique-directives
~ lessc styles.less --unique-directives
```

*Only work on `@keyframes` for now.*
