# kumiyui_template
the template for the [kumiyui](https://github.com/kumiyuki/kumiyui) framework.\
this framework only for [Bun](https://bun.sh), so please use bun!

## userscript header
you can edit the userscript header, by editting the [./package.json](./package.json) file.\
please don't remove some of the permissions (from "kumiyui.headers.grant"), they are crucial for the framework to work.

# install
```sh
bun install
```

## build
you can use either
```sh
bun run build-no-minify
```
or
```sh
bun kumiyui build
```

## build (with minification)
you can use either
```sh
bun run build
```
or
```sh
bun kumiyui build --minify
```