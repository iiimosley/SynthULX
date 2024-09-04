#!/usr/bin/env node
// extension of this gist: https://gist.github.com/maxlath/35c3a3bd06eb64e078397206cb86268e

import { readdir, readFile, writeFile } from "fs";
import { extname, join, basename } from "path";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

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

const helperNames = new Set();

const keywords: { [key: string]: string } = {
  "#if": "#if ",
  "/if": "/if ",
  "/unless": "/if ",
  "#unless": "#if !",
  else: ":else ",
  this: "THIS ",
  ">": "PARTIAL ",
  "#each": "#each ADD_AS ",
  "/each": "/each ",
};

const parseObjectArgs = (args: string) => {
  args = args.trim();
  return args.match(/\w+=/)
    ? args
        .replace(/(\w+)=/g, ", $1: ")
        .replace(/ , /g, ", ")
        .replace(/^, /, "{ ")
        .replace(/$/, " }")
    : args;
};

const parseHelperFunction = (content: string) => {
  if (!content.match(/\s/)) return content;

  const [, helperName, args] = content.match(/^(>?#?\/?\w*)(.*)$/) || [];
  const keywordHelper = keywords[helperName];

  console.log("-- args", args);
  console.log("-- helperName", helperName);
  console.log("-- keywordHelper", keywordHelper);

  if (keywordHelper) {
    let argsText = parseObjectArgs(args);
    return argsText === "()" ? keywordHelper : `${keywordHelper}${parseObjectArgs(args)}`;
  } else {
    helperNames.add(helperName);
    return `${helperName}(${parseObjectArgs(args)})`;
  }
};

const handlebars2svelte = (hbsText: string) => {
  const svelteText = hbsText
    .split("{{{")
    .map((part, i) => {
      if (i === 0) {
        return part;
      } else {
        const [content, after] = part.split("}}}");
        return `{@html ${parseHelperFunction(content)}}${after}`;
      }
    })
    .join("")
    .split("{{")
    .map((part, i) => {
      if (i === 0) {
        return part;
      } else {
        const [content, after] = part.split("}}");
        return `{${parseHelperFunction(content).trim()}}${after}`;
      }
    })
    .join("");

  const helperScript = `<script>\n  import { ${Array.from(helperNames).join(
    ", "
  )} } from './helpers_path'\n</script>\n\n`;

  return `${helperNames.size === 0 ? "" : helperScript}${svelteText}`;
};

readdir(argv.in, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    if (extname(file) === ".hbs") {
      const filePath = join(argv.in, file);
      readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return;
        }

        console.log("Processing HBS file", file);

        const convertedText = handlebars2svelte(data);
        
        const outputFilePath = join(
          argv.out,
          basename(file, ".hbs") + ".svelte"
        );
        
        writeFile(outputFilePath, convertedText, "utf8", (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return;
          }
          console.log("File converted and saved:", outputFilePath);
        });
      });
    }
  });
});
