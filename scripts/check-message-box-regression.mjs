import assert from "node:assert/strict";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const tempDir = new URL("../.tmp-message-box-test/", import.meta.url);
const pluginSourceUrl = new URL("../src/lib/plugin.ts", import.meta.url);
const iconPathSourceUrl = new URL("../src/lib/iconPath.ts", import.meta.url);

await rm(tempDir, { force: true, recursive: true });
await mkdir(tempDir);

const pluginSource = (await readFile(pluginSourceUrl, "utf8")).replace(
  'from "./iconPath"',
  'from "./iconPath.ts"',
);
const iconPathSource = await readFile(iconPathSourceUrl, "utf8");

await writeFile(new URL("plugin.ts", tempDir), pluginSource);
await writeFile(new URL("iconPath.ts", tempDir), iconPathSource);

const { remarkMessageBox, rehypeMessageBox } = await import(
  new URL(`plugin.ts?cacheBust=${Date.now()}`, tempDir)
);

const markdown = `:::note
**굵게** [링크](https://example.com)

- 항목
:::

:::: tip **인라인** [문법](https://example.com/inline)`;

const html = String(
  await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkDirective)
    .use(remarkMessageBox)
    .use(remarkRehype)
    .use(rehypeMessageBox)
    .use(rehypeStringify)
    .process(markdown),
);

assert.match(html, /<div class="message-box message-box-note" data-message-box-type="note">/);
assert.match(html, /<strong>굵게<\/strong>/);
assert.match(html, /<a href="https:\/\/example.com">링크<\/a>/);
assert.match(html, /<li>항목<\/li>/);
assert.match(html, /<p class="message-box message-box-tip">/);
assert.match(html, /<strong>인라인<\/strong>/);
assert.match(html, /<a href="https:\/\/example.com\/inline">문법<\/a>/);

await rm(tempDir, { force: true, recursive: true });
