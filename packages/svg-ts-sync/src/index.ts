#!/usr/bin/env node

import { transform } from '@svgr/core';
import fs from 'fs';
import path from 'path';
import { argv } from 'process';

const transformToTsx = (
  filePath: string,
  newFilePath: string,
  newName: string,
) => {
  const f = fs.readFileSync(filePath, 'utf-8').toString();
  const newContent = fillStrokeToCurrentColor(
    transform.sync(f, {
      typescript: true,
      exportType: 'named',
      namedExport: newName,
    }),
  );
  fs.writeFileSync(newFilePath, newContent);
};

const fillStrokeToCurrentColor = (str: string) =>
  str.replace(/(stroke|fill)\="(?!none)([^"]*)"/gm, '$1="currentColor"');

const bseCwd = path.join('..', '..');
const camelCased = (str: string) =>
  str[0].toUpperCase().concat(
    str.slice(1).replace(/[-\s]([a-z\d+])/g, function (g) {
      return g[1].toUpperCase();
    }),
  );

const readTree = (folderPath: string, newFolderPath: string) => {
  const dirs = fs.readdirSync(folderPath);
  dirs.forEach((d) => {
    if (d.match(/.svg$/)) {
      const fname = path.join(folderPath, d);
      transformToTsx(
        fname,
        path.join(newFolderPath, camelCased(d).replace('.svg', '.tsx')),
        camelCased(d).replace('.svg', ''),
      );
    }
  });
};

readTree(path.join(bseCwd, argv[2]), path.join(bseCwd, argv[3]));
