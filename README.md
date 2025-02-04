nx-testing % nx g @nx/react:application apps/host

nx-testing

nx-mfe

Create a Custom Nx Generator to generate a rslib with Jest

- https://www.youtube.com/watch?v=myqfGDWC2go&t=40s
- https://chatgpt.com/share/679d178f-2710-800c-a178-5322144436a7
- https://chatgpt.com/share/679d17ec-b2c0-800c-a2cd-871d090d0b5d (see the last question)

pnpm nx generate @nx-mfe/rslib-tem:rslib testing

Init the package

Step 1: Run a react lib generator
pnpm nx g @nx/react:lib packages/rslib-none

Step 2: Add package and rslib.config.js files

Step 3: Test a build to make sure it works

- You will need to:
  - Create a "pnpm-workspace.yaml” with the folders that can be shared with the root package/node module
  - Add a “workspaces” array in the root package.json that mirrors the folders the “pnpm-workspace.yaml” file
  -

pnpm nx generate @nx-mfe/rslib-tem:rslib testing

Questions:

- Can a package, component, etc be nested
- The ones that CAN’T be nested so have code to fail if the name is nested

Test Cases:

- Make sure the project.json is created
- The RsLib build is working correctly
- Allow the option to use storybook in the project
- Allow to name the project
- Dynamically add the scope of the root project in the project name
- The path in the tsconfig file is added based on the project created
- I can use the packages in a MFE with no issue
- I can install a package in the package with no issues

Step One - Create the plugin:
pnpm nx g @nx/plugin:plugin tools/rslib

Step Two - Create the generator for the plugin:
pnpm nx generate @nx/plugin:generator tools/rslib-tem/src/generators/rslib

Step Three - Customize the generator:
There are two ways to modify the generator.

1. Duplicating files after the generator command is called
2. Calling an nx command after the generator command is called

FYI: You can do both things in one generator if needed

Test

- Create a util in the “rslib-none” folder
- The util will use a node_module from the root package
- Make sure it works in the MFE code
- Build the code than using the dist make sure the code works in the MRE code

Links

Nx Console

https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console

https://plugins.jetbrains.com/plugin/21060-nx-console
