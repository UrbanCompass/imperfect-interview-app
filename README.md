# Imperfect Interview App

This application is fake. It is meant to mimic an app that can be found in our codebase, but it is not real working code. Do not try to actually perform development with the instructions below.

## Local Development

To run the app locally, from this directory, run the following:

1. `./pnpm i` which installs dependencies locally. Wait until this is finished.
2. `./pnpm run dev` which starts the local dev server and watches server and client files using nodemon. Note that client file changes requires refresh browser. Alternatively, you can run `./pnpm run dev:hotreload` to only watch client file changes and do hotreloading.

### Module alias and resolution

To prevent excessive usage of relative directory lookups we use module alias. You need to configure it in three places:
1. `tsconfig.json`: This helps VSCode's IntelliSence to resolve file lookup, and typechecking in source code.
2. `test/tsconfig.json`: This helps VSCode's IntelliSence to resolve file lookup, and typechecking in test code.
3. `jest.config.js`: This helps jest to resolve module.
4. `webpack.config.js`: This help for building app.

### Naming convention and Test Coverage

We use component name as file name instead of `index` to reduce development confusions. `index.ts` is only used for exporting to avoid 'component/component' directory lookup. Test are set to ignore any `index.ts` files so we don't waste effort to test trivia files. You can use this pattern to skip test coverages too, like `server/index.ts` and `server/app/intex.ts` since they almost are just using middlewares.

### Import and export convention

1. Try to use `@/` alias to import as often as possible. Relative path should only be used within the same component.
2. For `api` and `types`, we want to enforce a single source for all imports. So when using them in `components`, they should always come from `@/api` and `@/types`.
