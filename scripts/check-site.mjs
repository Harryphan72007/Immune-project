import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredPages = ["index.html", "product.html", "guide.html", "digital.html", "contact.html"];
const htmlFiles = (await readdir(root)).filter((file) => file.endsWith(".html")).sort();
const errors = [];
let checkedReferences = 0;

for (const requiredPage of requiredPages) {
  if (!htmlFiles.includes(requiredPage)) {
    errors.push(`missing required page: ${requiredPage}`);
  }
}

for (const htmlFile of htmlFiles) {
  const filePath = path.join(root, htmlFile);
  const html = await readFile(filePath, "utf8");

  if (!/^<!doctype html>/i.test(html.trimStart())) {
    errors.push(`${htmlFile}: missing HTML doctype`);
  }
  if (!/<html\b[^>]*\blang=["'][^"']+["']/i.test(html)) {
    errors.push(`${htmlFile}: missing document language`);
  }
  if (!/<title>[^<]+<\/title>/i.test(html)) {
    errors.push(`${htmlFile}: missing page title`);
  }

  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  for (const duplicateId of new Set(duplicateIds)) {
    errors.push(`${htmlFile}: duplicate id "${duplicateId}"`);
  }

  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const reference = match[1].trim();
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)) continue;

    if (reference.startsWith("#")) {
      const fragment = decodeURIComponent(reference.slice(1));
      if (fragment && !ids.includes(fragment)) {
        errors.push(`${htmlFile}: missing fragment target ${reference}`);
      }
      continue;
    }

    const cleanReference = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
    if (!cleanReference) continue;
    const resolved = cleanReference.startsWith("/")
      ? path.resolve(root, cleanReference.slice(1))
      : path.resolve(path.dirname(filePath), cleanReference);
    const relative = path.relative(root, resolved);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      errors.push(`${htmlFile}: reference escapes repository root: ${reference}`);
      continue;
    }

    checkedReferences += 1;
    try {
      await access(resolved);
    } catch {
      errors.push(`${htmlFile}: missing local reference ${reference}`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${htmlFiles.length} HTML pages and ${checkedReferences} local references.`);
}
