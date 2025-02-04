import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  Tree,
  readJson,
  updateJson,
} from '@nx/devkit';
import * as path from 'path';
import { RslibGeneratorSchema } from './schema';

export async function rslibGenerator(
  tree: Tree,
  options: RslibGeneratorSchema
) {
  const scopeName = readJson(tree, 'package.json').name;
  const resolvedOptions = {
    ...options,
    name: names(options.name).fileName,
    scope: scopeName,
  };

  const rootPath = 'packages';
  const projectRoot = `${rootPath}/${resolvedOptions.name}`;
  const packageName = `${scopeName}/${options.name}`;

  // const libraryRoot = options.directory
  //   ? `libs/${options.directory}/${options.name}`
  //   : `libs/${options.name}`;

  // const importPath = options.directory
  //   ? `@${options.directory}/${options.name}`
  //   : `@${options.name}`;

  addProjectConfiguration(tree, resolvedOptions.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    projectRoot,
    resolvedOptions
  );

  updateJson(tree, 'tsconfig.base.json', (json) => {
    json.compilerOptions.paths = json.compilerOptions.paths || {};
    json.compilerOptions.paths[packageName] = [`${projectRoot}/src/index.ts`];

    return json;
  });

  await formatFiles(tree);
}

export default rslibGenerator;
