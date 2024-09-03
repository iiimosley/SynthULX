#!/usr/bin/env node
// extension of this gist: https://gist.github.com/maxlath/35c3a3bd06eb64e078397206cb86268e

import { readdir, readFile, writeFile } from 'fs';
import { extname, join, basename } from 'path';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

// Parse command-line arguments
const argv = yargs(hideBin(process.argv))
  .options({
    in: {
      alias: "i",
      type: "string",
      description: "Source directory",
      demandOption: true,
    },
    out: {
      alias: "o",
      type: "string",
      description: "Output directory",
      demandOption: true,
    },
  })
  .parseSync();

const helpersNames = new Set()

const keywords: { [key: string]: string } = {
  '#if': '#if ',
  '/if': '/if ',
  '/unless': '/if ',
  '#unless': '#if !',
  'else': ':else ',
  'this': 'THIS ',
  '>': 'PARTIAL ',
  '#each': '#each ADD_AS ',
  '/each': '/each ',
}

const parseObjectArgs = (args: string) => {
  args = args.trim();
  if (args.match(/\w+=/)) {
    return args
      .replace(/(\w+)=/g, ", $1: ")
      .replace(/ , /g, ", ")
      .replace(/^, /, "{ ")
      .replace(/$/, " }");
  } else {
    return args;
  }
};

const parseHelperFunction = (content: string) => {
  if (!content.match(/\s/)) return content

  let [, helperName, args] = content.match(/^(>?#?\/?\w*)(.*)$/) || [];

  if (keywords[helperName]) {
    helperName = keywords[helperName]
    let argsText = parseObjectArgs(args)
    if (argsText === '()') return helperName
    else return `${helperName}${parseObjectArgs(args)}`
  } else {
    helpersNames.add(helperName)
    return `${helperName}(${parseObjectArgs(args)})`
  }
}

const handlebars2svelte = (hbsText: string) => {
  const svelteText = hbsText
    .split('{{{')
    .map((part, i) => {
      if (i === 0) {
        return part
      } else {
        const [content, after] = part.split('}}}')
        return `{@html ${parseHelperFunction(content)}}${after}`
      }
    })
    .join('')
    .split('{{')
    .map((part, i) => {
      if (i === 0) {
        return part
      } else {
        const [content, after] = part.split('}}')
        return `{${parseHelperFunction(content).trim()}}${after}`
      }
    })
    .join('')

  const importText = `import { ${Array.from(helpersNames).join(', ')} } from './helpers_path'`

  return `<script>\n  ${importText}\n</script>\n\n${svelteText}`
}

readdir(argv.in, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (extname(file) === '.hbs') {
      const filePath = join(argv.in, file);
      readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        console.log("Processing HBS file", file);

        const convertedText = handlebars2svelte(data);
        const outputFilePath = join(argv.out, basename(file, '.hbs') + '.svelte');
        writeFile(outputFilePath, convertedText, 'utf8', err => {
          if (err) {
            console.error('Error writing file:', err);
            return;
          }
          console.log('File converted and saved:', outputFilePath);
        });
      });
    }
  });
});
