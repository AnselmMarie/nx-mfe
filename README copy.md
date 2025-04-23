How to Use Nx Generators
Creating a custom Nx generator command (e.g., nx generate @pop/long:lib) in an Nx workspace allows you to automate and standardize how code is structured within your project. This can help maintain consistency and enforce best practices across your codebase.

Create the Nx Generator
By following the steps below, you will create a base Nx plugin that allows you to define and customize how your generator command works.

Step 1: Create the Plugin Project
Run the following command to generate the base plugin:

```
nx g @nx/plugin:plugin tools/${projectName}
```

This will create a plugin project inside the tools directory. The package name in package.json will define the first part of the generator command.

For example, if your package name is @test/template, then the final generator command will be:

```
nx generate @test/template:lib
```

Note: The projectName and the package name in package.json do not have to be the same.

Step 2: Create a Generator in the Plugin

Run the following command to create a generator inside the plugin:

```
nx generate @nx/plugin:generator tools/${projectName}/src/${generatorFolder}/${generator}
```

- ${generatorFolder} is the folder where your generator will be stored.
- ${generator} defines the name of the generator files and determines how the generator is invoked.
- For example, if you run:

```
nx generate @nx/plugin:generator tools/test-generator/src/app/appCreation
```

The final generator command will be:

```
nx generate @pop/test-generator:appCreation
```

Additional Notes

- You can create multiple generators inside a single plugin by organizing them into different folders.
- Example of multiple generators in the same plugin:sh

```
* nx generate @pop/test-generator:appCreation
* nx generate @pop/test-generator:libCreation
```

With this setup, you can now customize your generator to fit your team’s specific needs!

Customizing Nx Generator Options
Once you have created your Nx generator command, you may need to pass options to customize the project creation process. This section explains how to define and use options in your generator.

Example: Adding name and description Options
Suppose your generator requires a name and optionally accepts a description. The command would look like this:

```
nx generate @pop/test-generator:appCreation --name my-app --description "This is a test app"
```

To configure these options, you need to update the following files in your generator:

1. Define Options in schema.d.ts
   In the schema.d.ts file, define an interface to specify the required and optional options:

```
CopyEdit
export interface Schema {
  name: string; // Required
  description?: string; // Optional
}
```

This ensures TypeScript provides type safety when working with generator options.

2. Configure Options in schema.json
   In schema.json, define the properties for each option:

```
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "The name of the project",
      "x-prompt": "What is the name of the project?",
      "required": true
    },
    "description": {
      "type": "string",
      "description": "A short description of the project",
      "x-prompt": "Provide a brief description (optional)"
    }
  },
  "required": ["name"]
}
```

Explanation:

- name is required, so users must provide it in the command or respond to a prompt.
- description is optional. If omitted, the terminal will prompt the user for input.

3. Running the Generator with Options
   Once configured, users can execute the generator with any combination of options:

```
nx generate @pop/test-generator:appCreation --name test --description "This is the description"
nx generate @pop/test-generator:appCreation --name test
nx generate @pop/test-generator:appCreation
```

If an option is missing, Nx will prompt the user to enter the required values.

4. Using the Options in Generator Code
   Now that the options are defined, you can use them in your generator code to populate necessary files or configurations dynamically. For example, in your generator function:

```
import { generateFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { Schema } from './schema';

export default function generateApp(tree: Tree, options: Schema) {
  const templateOptions = {
    name: options.name,
    description: options.description || 'Default description',
  };

  generateFiles(tree, path.join(__dirname, 'files'), '.', templateOptions);
}
```

This ensures that when the generator runs, it injects the user-provided values into the necessary files.

Note: The “generateFiles” will be discussed more in the next section.

By following these steps, you can create flexible and user-friendly Nx generators that allow customization through options while maintaining a structured workflow. 🚀

Customizing the Nx Generator
By following the steps below, you can customize the output of your Nx generator command to better fit your project's needs.

There are three primary ways to customize an Nx generator:

1. libraryGenerators – Structured modification of an Nx workspace.
2. generateFiles – Copying and templating files into the project.
3. tree.runCommand – Executing shell commands within the generator.

4. Using libraryGenerators
   libraryGenerators is the preferred approach for modifying an Nx workspace in a structured way. It is ideal when you need to:

- Generate new projects (e.g., libraries, applications).
- Modify workspace configurations (e.g., updating nx.json or tsconfig.json).
- Scaffold files with predefined templates.
- Update dependencies while ensuring proper Nx integration.

✅ Pros:
✔ Ensures consistency by following Nx’s structured approach. ✔ Integrates well with Nx’s caching, dependency tracking, and testing mechanisms. ✔ Automatically handles updates to workspace configurations.

❌ Cons:
✖ Requires understanding of Nx's internal APIs and workspace structure. ✖ Less flexible if you need to perform highly custom tasks outside Nx's built-in generators.

2. Using generateFiles
   generateFiles copies predefined files from a files directory into the generated project. This is useful when Nx cannot automatically create or configure the necessary files, or when you need to override default files generated by Nx.

Additionally, you can use templates in the files directory and dynamically inject user-provided options after the generator has run. This allows developers to customize the generated output based on their selections.

📂 Folder Structure:

```
${projectName}
 ├── src
 │   ├── ${generatorFolder}
 │   │   ├── files  <-- This is where template files are stored
```

📂 Template Structure:

```
${projectName}
 ├── src
 │   ├── ${generatorFolder}
 │   │   ├── files
 │   │    │   ├── example.tsx.template

```

📂 Template Option:

```
Copy the code in the template.tsx file

```

✅ Pros:
✔ Allows for easy file templating and dynamic replacements. ✔ Great for adding custom files that Nx does not generate by default. ✔ Can override existing files generated by Nx.

❌ Cons:
✖ Does not provide built-in dependency tracking like libraryGenerators. ✖ Must manually handle workspace configuration updates if needed.

3. Using tree.runCommand
   tree.runCommand executes shell commands from within the generator. This is useful for:

- Running external scripts.
- Triggering other CLI commands (e.g., installing dependencies).
- Performing system-level operations.

✅ Pros:
✔ Allows executing any command, providing maximum flexibility. ✔ Useful when integrating with external tools or scripts.

❌ Cons:
✖ Can introduce inconsistencies since Nx does not track external commands. ✖ Less efficient than built-in Nx utilities due to lack of caching and dependency tracking. ✖ Platform-dependent (e.g., Windows vs. Unix shell differences).

Choosing the Right Approach
Method Best For Pros Cons
libraryGenerators Generating projects and modifying workspace settings Nx-aware, structured, tracks dependencies Requires knowledge of Nx APIs
generateFiles Copying or templating custom files Simple, flexible, overrides default files No dependency tracking
tree.runCommand Running shell commands or scripts Maximum flexibility, integrates with external tools No caching, platform-dependent
By selecting the right approach based on your use case, you can create efficient and maintainable Nx generators tailored to your project’s needs. 🚀

References

- You will need to:
  - Create a "pnpm-workspace.yaml” with the folders that can be shared with the root package/node module
  - Add a “workspaces” array in the root package.json that mirrors the folders the “pnpm-workspace.yaml” file
  -

pnpm nx generate @nx-mfe/rslib-tem:rslib testing

Questions:

- Can a package, component, etc be nested
- The ones that CAN’T be nested so have code to fail if the name is nested

Step One - Create the plugin:
nx g @nx/plugin:plugin tools/rslib

Step Two - Create the generator for the plugin:
nx generate @nx/plugin:generator tools/rslib-tem/src/generators/rslib

Step Three - Customize the generator:
There are two ways to modify the generator.

1. Duplicating files after the generator command is called
2. Calling an nx command after the generator command is called
3.

Test Cases:

- Make sure the project.json is created
- The RsLib build is working correctly
- Allow the option to use storybook in the project
- Allow to name the project
- Dynamically add the scope of the root project in the project name
- The path in the tsconfig file is added based on the project created
- I can use the packages in a MFE with no issue
- I can install a package in the package with no issues

FYI: You can do both things in one generator if needed


-------------

TanStack Form

Ex:
http://stackblitz.com/github/TanStack/form/tree/main/examples/react/large-form 

Notes:
https://tanstack.com/form/latest/docs/framework/react/guides/form-composition#a-note-on-performance 



Positives
- React and React Native
- Typing is inferred — no need to type it out
    - Extreme type safety 
- Can be easily written with Zod
- No dependencies
- Flexibility in Validation
    - Validate per form, field, or subset of fields
- Async validation
    - + you can have async for onBlur, onChange, etc per field
    - + By default it uses AbortSignal cancellation 
- Has a hook version so it can be easily adding to design system
- Has React Server Action functionality
- Debounce is built in for validation
- It has the same amount of issues / pull request


Negatives
- V1 just came out so it’s not battle tested by the public



React Query

Ex:
https://medium.com/@abdurshd/a-step-by-step-guide-to-building-reusable-components-with-react-hook-form-70f5e77c9037 


Positives
- React and React Native
- Can be easily written with Zod
- No dependencies
- Async validation
    - Only onBlur for field 
    - + could use onWatch for custom debounce/async validation on change
- Has a hook version so it can be easily adding to design system
- Debounce is not built in for validation but can be used by creating custom logic with watch
- It’s been battle tested by the public for years
- It has the same amount of issues / pull request


Negatives
- Typing needs to be written



