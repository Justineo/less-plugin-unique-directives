less-plugin-unique-directive
============================

A Less plugin to eliminate redundant @-rules such as duplicate `@keyframes` in CSS output.

## Usage

```bash
~ npm install -g less-plugin-unique-directives
~ lessc styles.less --unique-directives
```

*Only work on `@keyframes` for now.*
