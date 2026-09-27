import { mkdir, writeFile } from "node:fs/promises";

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting…</title>
    <link rel="canonical" href="../individuals/" />
    <meta http-equiv="refresh" content="0; url=../individuals/" />
    <script>location.replace("../individuals/")</script>
  </head>
  <body>
    <p><a href="../individuals/">Continue to Individuals</a></p>
  </body>
</html>
`;

for (const segment of ["personal", "family", "agri", "assisted"]) {
  await mkdir(`out/${segment}`, { recursive: true });
  await writeFile(`out/${segment}/index.html`, html);
}
