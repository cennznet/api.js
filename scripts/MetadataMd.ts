// Copyright 2017-2020 @polkadot/typegen authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { MetadataLatest, SiLookupTypeId } from '@polkadot/types/interfaces';
import { Codec, DefinitionRpcParam } from '@polkadot/types/types';
import fs from 'fs';
import { Metadata } from '@polkadot/types/metadata';
import type { PortableRegistry } from '@polkadot/types/metadata';
import staticMetadata from "@cennznet/api/staticMetadata";
import { GenericCall as Call } from '@polkadot/types/generic';
import { unwrapStorageType } from '@polkadot/types/primitive/StorageKey';
import { TypeRegistry } from '@polkadot/types/create';
import { Vec } from '@polkadot/types/codec';
import * as substrateDefinitions from '@polkadot/types/interfaces/definitions';
import * as cennznetDefinitions from '@cennznet/types/interfaces/definitions';
import { Text } from '@polkadot/types/primitive';
import { stringCamelCase, stringLowerFirst } from '@polkadot/util';
const registry = new TypeRegistry();
interface Page {
    title: string;
    description: string;
    sections: {
        name: string;
        description?: string;
        items: {
            name: string;
            [bullet: string]: string | Vec<Text>;
        }[];
    }[];
}

interface ModulePage {
  title: string;
  description: string;
  sections: {
    name: string;
    description?: string;
      constant: {
        name: string;
        [bullet: string]: string | Vec<Text>;
      }[]
      storage: {
        name: string;
        [bullet: string]: string | Vec<Text>;
      }[]
    extrinsics: {
        name: string;
        [bullet: string]: string | Vec<Text>;
      }[]
    errors: {
      name: string;
      [bullet: string]: string | Vec<Text>;
    }[]
    events: {
      name: string;
      [bullet: string]: string | Vec<Text>;
    }[]
    rpc: {
      name: string;
      [bullet: string]: string | Vec<Text>;
    }[]
  }[];
  deriveQuery: boolean
}

const STATIC_TEXT = '\n\n(NOTE: These were generated from a static/snapshot view of a recent Substrate master node. Some items may not be available in older nodes, or in any customized implementations.)';

const DESC_CONSTANTS = `The following sections contain the module constants, also known as parameter types. These can only be changed as part of a runtime upgrade. On the api, these are exposed via \`api.consts.<module>.<method>\`. ${STATIC_TEXT}`;
const DESC_EXTRINSICS = `The following sections contain Extrinsics methods are part of the default Substrate runtime. On the api, these are exposed via \`api.tx.<module>.<method>\`. ${STATIC_TEXT}`;
const DESC_ERRORS = `This page lists the errors that can be encountered in the different modules. ${STATIC_TEXT}`;
const DESC_EVENTS = `Events are emitted for certain operations on the runtime. The following sections describe the events that are part of the default Substrate runtime. ${STATIC_TEXT}`;
const DESC_RPC = 'The following sections contain RPC methods that are Remote Calls available by default and allow you to interact with the actual node, query, and submit.';
const DESC_STORAGE = `The following sections contain Storage methods are part of the default Substrate runtime. On the api, these are exposed via \`api.query.<module>.<method>\`. ${STATIC_TEXT}`;
const DESC = `The following sections contain the module details. `;

/** @internal */
function documentationVecToMarkdown (docLines: Vec<Text>, indent = 0): string {
    const md = docLines
        .map((docLine) => docLine && docLine.substring(0)) // trim the leading space
        .reduce((md, docLine): string => // generate paragraphs
                !docLine.trim().length
                    ? `${md}\n\n` // empty line
                    : /^[*-]/.test(docLine.trimStart()) && !md.endsWith('\n\n')
                    ? `${md}\n\n${docLine}` // line calling for a preceding linebreak
                    : `${md}${docLine.replace(/^#{1,3} /, '#### ')} `
            , '')
        .replace(/#### <weight>/g, '<weight>')
        .replace(/<weight>(.|\n)*?<\/weight>/g, '')
        .replace(/#### Weight:/g, 'Weight:');

    // prefix each line with indentation
    return md && md.split('\n\n').map((line) => `${' '.repeat(indent)}${line}`).join('\n\n');
}

function renderPage (page: Page): string {
    let md = `---\ntitle: ${page.title}\n---\n\n`;

    if (page.description) {
        md += `${page.description}\n\n`;
    }

    // index
    page.sections.forEach((section) => {
        if (section.name) {
            md += `- **[${stringCamelCase(section.name)}](#${stringCamelCase(section.name).toLowerCase()})**\n\n`;
        }
    });

    // contents
    page.sections.forEach((section) => {
        md += `\n___\n\n\n## ${section.name}\n`;

        if (section.description) {
            md += `\n_${section.description}_\n`;
        }

        section.items && section.items.forEach((item) => {
            md += ` \n### ${item.name}`;

            Object.keys(item).filter((i) => i !== 'name').forEach((bullet) => {
                md += `\n- **${bullet}**: ${
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    item[bullet] instanceof Vec
                        ? documentationVecToMarkdown(item[bullet] as Vec<Text>, 2).toString()
                        : item[bullet]
                }`;
            });

            md += '\n';
        });
    });

    return md;
}


function extractData(data: {
  name: string;
  [bullet: string]: string | Vec<Text>;
}[], md: string) {
  data && data.forEach((item) => {
    md += ` \n### ${item.name}`;

    Object.keys(item).filter((i) => i !== 'name').forEach((bullet) => {
      md += `\n- **${bullet}**: ${
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        item[bullet] instanceof Vec
          ? documentationVecToMarkdown(item[bullet] as Vec<Text>, 2).toString()
          : item[bullet]
      }`;
    });

    md += '\n';
  });
  return md;
}

function renderModulePage (page: ModulePage): string {
  let md = `---\n ${page.title}\n---\n\n`;

  if (page.description) {
    md += `${page.description}\n\n`;
  }

  // contents
  page.sections.forEach((section) => {

    if (section.constant && section.constant.length > 0) {
      md += `- **[Constant](#Constant)**\n\n`;
    }
    md += `- **[Storage](#Storage)**\n\n`;
    md += `- **[Extrinsic](#Extrinsic)**\n\n`;
    md += `- **[Errors](#Error)**\n\n`;
    md += `- **[Events](#Events)**\n\n`;
    if (section.rpc && section.rpc.length > 0) {
      md += `- **[RPC](#RPC)**\n\n`;
    }
    if (page.deriveQuery) {
      md += `- **[Derive queries](#derive-queries)**\n\n`;
    }

    if (section.constant && section.constant.length > 0) {
      md += ' \n# Constant\n';
    }

    md = extractData(section.constant, md);

    md +=' \n# Storage\n';
    md = extractData(section.storage, md);

    md +=' \n# Extrinsic\n';
    md = extractData(section.extrinsics, md);

    md +=' \n# Error\n';
    md = extractData(section.errors, md);

    md +=' \n# Events\n';
    md = extractData(section.events, md);

    md +=' \n# RPC\n';
    md = extractData(section.rpc, md);

  });

  return md;
}

function sortByName<T extends { name: Codec | string }> (a: T, b: T): number {
    // case insensitive (all-uppercase) sorting
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    return a.name.toString().toUpperCase().localeCompare(b.name.toString().toUpperCase());
}

/** @internal */
function addRpc (): string {
    const definitions = {...substrateDefinitions, ...cennznetDefinitions};
    const sections = Object
        .keys(definitions)
        .filter((key) => Object.keys(definitions[key as 'babe'].rpc || {}).length !== 0);

    return renderPage({
        description: DESC_RPC,
        sections: sections
            .sort()
            .map((sectionName) => {
                const section = definitions[sectionName as 'babe'];

                return {
                    // description: section.description,
                    items: Object.keys(section.rpc)
                        .sort()
                        .map((methodName) => {
                            const method = section.rpc[methodName];
                            const args = method.params.map(({ isOptional, name, type }: DefinitionRpcParam): string => {
                                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                                return name + (isOptional ? '?' : '') + ': `' + type + '`';
                            }).join(', ');
                            const type = '`' + method.type + '`';

                            return {
                                interface: '`' + `api.rpc.${sectionName}.${methodName}` + '`',
                                jsonrpc: '`' + (method.endpoint || `${sectionName}_${methodName}`) + '`',
                                name: `${methodName}(${args}): ${type}`,
                                ...(method.description && { summary: method.description })
                            };
                        }),
                    name: sectionName
                };
            }),
        title: 'JSON-RPC'
    });
}

function spliceArrayFor(startText, endText: string | number, deriveModulesSection: string[]) {
  const index = typeof startText === "number" ? startText : deriveModulesSection.findIndex(text => text === startText);
  const index2 = typeof endText === "number" ? endText + index : deriveModulesSection.findIndex(text => text === endText);
  deriveModulesSection.splice(index, index2 - index);
}

function addModule(metadata: MetadataLatest, name, displayName): string {
  const definitions = {...substrateDefinitions, ...cennznetDefinitions};
  const basePath = 'deriveDocs';
  const deriveModules = fs.readFileSync(`${basePath}/modules.md`, 'utf8');
  const deriveModuleList = deriveModules.split('\n');
  const filterDeriveList = deriveModuleList.filter(list => list.includes(name.toLowerCase()));
  const { lookup } = metadata;
  let moduleContent = renderModulePage({
    description: DESC,
    sections: metadata.pallets
      .sort(sortByName)
      .filter((moduleMetadata) => moduleMetadata.name.toString() === name)
      .map((moduleMetadata) => {
        const sectionName = stringLowerFirst(moduleMetadata.name);
        const section = definitions[sectionName];

        return {
          constant: moduleMetadata.constants
            .sort(sortByName)
            .map((func) => {
              const methodName = stringCamelCase(func.name);
              if (!moduleMetadata.constants.isEmpty) {
                 return  {
                  interface: '`' + `api.consts.${sectionName}.${methodName}` + '`',
                  name: `${methodName}: ` + '`' + func.type.toString() + '`',
                  ...(func.docs.length && {summary: func.docs})
                };
              }

            }),
          storage: moduleMetadata.storage.unwrap().items
              .sort(sortByName)
              .map((func) => {
                  let arg = '';

                  if (func.type.isMap) {
                      const {hashers, key} = func.type.asMap;

                      arg = '`' + (
                          hashers.length === 1
                              ? getSiName(lookup, key)
                              : lookup.getSiType(key).def.asTuple.map((t) => getSiName(lookup, t)).join(', ')
                      ) + '`';
                  }

                  const methodName = stringLowerFirst(func.name);
                  const outputType = unwrapStorageType(registry, func.type, func.modifier.isOptional);

                  return {
                      interface: '`' + `api.query.${sectionName}.${methodName}` + '`',
                      name: `${methodName}(${arg}): ` + '`' + outputType + '`',
                      ...(func.docs.length && {summary: func.docs})
                  };
              }),

          extrinsics: lookup.getSiType(moduleMetadata.calls.unwrap().type).def.asVariant.variants
            .sort(sortByName)
            .map(({ docs, fields, name }, index) => {
                  const methodName = stringCamelCase(name);
                  const args = fields.map(({ name, type }) =>
                      `${name.isSome ? name.toString() : `param${index}`}: ` + '`' + getSiName(lookup, type) + '`'
                  ).join(', ');

                  return {
                      interface: '`' + `api.tx.${sectionName}.${methodName}` + '`',
                      name: `${methodName}(${args})`,
                      ...(docs.length && { summary: docs })
                  };
          }),
          errors: moduleMetadata.errors.isSome ? lookup.getSiType(moduleMetadata.errors.unwrap().type).def.asVariant.variants
                .sort(sortByName)
                .map((error) => ({
                    interface: '`' + `api.errors.${stringCamelCase(moduleMetadata.name)}.${error.name.toString()}` + '`',
                    name: error.name.toString(),
                    ...(error.docs.length && { summary: error.docs })
                })) : [],

          events: lookup.getSiType(moduleMetadata.events.unwrap().type).def.asVariant.variants
              .sort(sortByName)
              .map(({ docs, fields, name }) => {
                  const methodName = name.toString();
                  const args = fields.map(({ type }) =>
                      '`' + getSiName(lookup, type) + '`'
                  ).join(', ');

                  return {
                      interface: '`' + `api.events.${stringCamelCase(moduleMetadata.name)}.${methodName}` + '`',
                      name: `${methodName}(${args})`,
                      ...(docs.length && { summary: docs })
                  };
              }),
            rpc: section && section.rpc ? Object.keys(section.rpc)
              .sort()
              .map((methodName) => {
                const method = section.rpc[methodName];
                const args = method.params.map(({ isOptional, name, type }: DefinitionRpcParam): string => {
                  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                  return name + (isOptional ? '?' : '') + ': `' + type + '`';
                }).join(', ');
                const type = '`' + method.type + '`';

                return {
                  interface: '`' + `api.rpc.${sectionName}.${methodName}` + '`',
                  jsonrpc: '`' + (method.endpoint || `${sectionName}_${methodName}`) + '`',
                  name: `${methodName}(${args}): ${type}`,
                  ...(method.description && { summary: method.description })
                };
              }) : null,
          name: sectionName
        };
      }),
    title: displayName,
    deriveQuery: filterDeriveList.length > 0
  });

  if (filterDeriveList.length > 0) {
    moduleContent += ' \n# Derive queries\n';
    moduleContent += `\n- **interface**: api.derive.${stringCamelCase(name)}.function_name`;
  }
  // Add the content from derive queries in the Module specific markdown file
  filterDeriveList.map( list => {
    const regExp = /\(([^)]+)\)/;
    const fileName = regExp.exec(list);
    let deriveModulesSection = fs.readFileSync(`${basePath}/${fileName[1]}`, 'utf8').toString().split('\n');
    deriveModulesSection.shift(); // remove the the first element from array
    // Remove unwanted stuff
    spliceArrayFor('### Functions', '## Functions', deriveModulesSection);
    let countOccurence = 0;
    deriveModulesSection = deriveModulesSection
      .filter(text => text !== '## Table of contents')
      .map((line, index) => {
        if (line.includes('`instanceId`, `api`')) {
          line = line.replace('(`instanceId`, `api`): ','');
          countOccurence++;
        }
        return line;
    });
    for (let i =0; i <= countOccurence; i++) {
      const idx = deriveModulesSection.findIndex(text => text.includes('| `api` | `ApiInterfaceRx` |'));
      if (idx !== -1) {
        /*Remove
         #### Parameters

            | Name | Type |
            | :------ | :------ |
            | `instanceId` | `string` |
            | `api` | `ApiInterfaceRx` |
        */
        spliceArrayFor(idx - 5, 14, deriveModulesSection);
      }
    }
    const deriveData = deriveModulesSection.join('\n'); // convert array back to string
    moduleContent += deriveData;
  })

  return moduleContent;
}

/** @internal */
function addConstants ({ lookup, pallets }: MetadataLatest): string {
    return renderPage({
        description: DESC_CONSTANTS,
        sections: pallets
            .sort(sortByName)
            .filter((moduleMetadata) => !moduleMetadata.constants.isEmpty)
            .map((moduleMetadata) => {
                const sectionName = stringLowerFirst(moduleMetadata.name);

                return {
                    items: moduleMetadata.constants
                        .sort(sortByName)
                        .map((func) => {
                            const methodName = stringCamelCase(func.name);

                            return {
                                interface: '`' + `api.consts.${sectionName}.${methodName}` + '`',
                                name: `${methodName}: ` + '`' + getSiName(lookup, func.type) + '`',
                                ...(func.docs.length && { summary: func.docs })
                            };
                        }),
                    name: sectionName
                };
            }),
        title: 'Constants'
    });
}

/** @internal */
function addStorage ({ lookup, pallets, registry }: MetadataLatest): string {
    const moduleSections = pallets
        .sort(sortByName)
        .filter((moduleMetadata) => !moduleMetadata.storage.isNone)
        .map((moduleMetadata) => {
            const sectionName = stringLowerFirst(moduleMetadata.name);

            return {
                items: moduleMetadata.storage.unwrap().items
                    .sort(sortByName)
                    .map((func) => {
                        let arg = '';

                        if (func.type.isMap) {
                            const {hashers, key} = func.type.asMap;

                            arg = '`' + (
                                hashers.length === 1
                                    ? getSiName(lookup, key)
                                    : lookup.getSiType(key).def.asTuple.map((t) => getSiName(lookup, t)).join(', ')
                            ) + '`';
                        }

                        const methodName = stringLowerFirst(func.name);
                        const outputType = unwrapStorageType(registry, func.type, func.modifier.isOptional);

                        return {
                            interface: '`' + `api.query.${sectionName}.${methodName}` + '`',
                            name: `${methodName}(${arg}): ` + '`' + outputType + '`',
                            ...(func.docs.length && {summary: func.docs})
                        };
                    }),
                name: sectionName
            };
        });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const knownSection: any = JSON.parse(fs.readFileSync('docs/cennznet/storage-known-section.json', 'utf8'));

    return renderPage({
        description: DESC_STORAGE,
        sections: moduleSections.concat([knownSection]),
        title: 'Storage'
    });
}

/** @internal */
function addExtrinsics ({ lookup, pallets }: MetadataLatest): string {
    return renderPage({
        description: DESC_EXTRINSICS,
        sections: pallets
            .sort(sortByName)
            .filter(({ calls }) => calls.isSome)
            .map(({ calls, name }) => {
                const sectionName = stringCamelCase(name);

                return {
                    items: lookup.getSiType(calls.unwrap().type).def.asVariant.variants
                        .sort(sortByName)
                        .map(({ docs, fields, name }, index) => {
                            const methodName = stringCamelCase(name);
                            const args = fields.map(({ name, type }) =>
                                `${name.isSome ? name.toString() : `param${index}`}: ` + '`' + getSiName(lookup, type) + '`'
                            ).join(', ');

                            return {
                                interface: '`' + `api.tx.${sectionName}.${methodName}` + '`',
                                name: `${methodName}(${args})`,
                                ...(docs.length && { summary: docs })
                            };
                        }),
                    name: sectionName
                };
            }),
        title: 'Extrinsics'
    });
}

function getSiName (lookup: PortableRegistry, type: SiLookupTypeId): string {
    const typeDef = lookup.getTypeDef(type);

    return typeDef.lookupName || typeDef.type;
}


/** @internal */
function addEvents ({ lookup, pallets }: MetadataLatest): string {
    return renderPage({
        description: DESC_EVENTS,
        sections: pallets
            .sort(sortByName)
            .filter(({ events }) => events.isSome)
            .map((meta) => ({
                items: lookup.getSiType(meta.events.unwrap().type).def.asVariant.variants
                    .sort(sortByName)
                    .map(({ docs, fields, name }) => {
                        const methodName = name.toString();
                        const args = fields.map(({ type }) =>
                            '`' + getSiName(lookup, type) + '`'
                        ).join(', ');

                        return {
                            interface: '`' + `api.events.${stringCamelCase(meta.name)}.${methodName}` + '`',
                            name: `${methodName}(${args})`,
                            ...(docs.length && { summary: docs })
                        };
                    }),
                name: stringCamelCase(meta.name)
            })),
        title: 'Events'
    });
}

/** @internal */
function addErrors ({ lookup, pallets }: MetadataLatest): string {
    return renderPage({
        description: DESC_ERRORS,
        sections: pallets
            .sort(sortByName)
            .filter(({ errors }) => errors.isSome)
            .map((moduleMetadata) => ({
                items: lookup.getSiType(moduleMetadata.errors.unwrap().type).def.asVariant.variants
                    .sort(sortByName)
                    .map((error) => ({
                        interface: '`' + `api.errors.${stringCamelCase(moduleMetadata.name)}.${error.name.toString()}` + '`',
                        name: error.name.toString(),
                        ...(error.docs.length && { summary: error.docs })
                    })),
                name: stringLowerFirst(moduleMetadata.name)
            })),
        title: 'Errors'
    });
}

/** @internal */
function writeFile (name: string, ...chunks: any[]): void {
    const writeStream = fs.createWriteStream(name, { encoding: 'utf8', flags: 'w' });

    writeStream.on('finish', (): void => {
        console.log(`Completed writing ${name}`);
    });

    chunks.forEach((chunk): void => {
        writeStream.write(chunk);
    });

    writeStream.end();
}

function main (): void {
    // use the latest runtime metadata we know about
    const [key, meta] = Object.entries(staticMetadata).pop();

    console.log();
    console.log(`Generating docs for: ${key}`);
    console.log();

    const metadata = new Metadata(registry, meta);
    registry.setMetadata(metadata);

    const latest = metadata.asLatest;
    writeFile('docs/cennznet/attestation.md', addModule(latest, 'Attestation', 'Attestation'));
    writeFile('docs/cennznet/genericAsset.md', addModule(latest, 'GenericAsset', 'Generic Asset'));
    writeFile('docs/cennznet/cennzx.md', addModule(latest, 'Cennzx', 'CENNZX'));
    writeFile('docs/cennznet/staking.md', addModule(latest, 'Staking', 'Staking'));
    writeFile('docs/cennznet/governance.md', addModule(latest, 'Governance', 'Governance'));
    writeFile('docs/cennznet/ethBridge.md', addModule(latest, 'EthBridge', 'Eth Bridge'));
    writeFile('docs/cennznet/eth20Peg.md', addModule(latest, 'Erc20Peg', 'Erc20 Peg'));
    writeFile('docs/cennznet/nft.md', addModule(latest, 'Nft', 'Nft'));
    writeFile('docs/cennznet/rpc.md', addRpc());
    writeFile('docs/cennznet/constants.md', addConstants(latest));
    writeFile('docs/cennznet/storage.md', addStorage(latest));
    writeFile('docs/cennznet/extrinsics.md', addExtrinsics(latest));
    writeFile('docs/cennznet/events.md', addEvents(latest));
    writeFile('docs/cennznet/errors.md', addErrors(latest));
};

main();
