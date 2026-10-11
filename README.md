# kumiyui_template
the template for the [kumiyui](https://github.com/kumiyuki/kumiyui) framework.

## userscript header
you can edit the userscript header, by editting the [./package.json](./package.json) file.\
please don't remove some of the permissions (from "kumiyui.headers.grant"), they are crucial for the framework to work.

## build
```sh
bun kumiyui build
```

## build (with minification)
```sh
bun kumiyui build --minify
```