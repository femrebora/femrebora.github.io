# Owner content still needed

Education, employment, research methods, tools, languages, email, and LinkedIn have been populated from the owner-supplied CV updated September 2026. A sanitized downloadable PDF is available, and `/cv/` renders the same data as a printable HTML CV. The code and layout support these remaining additions without redesigning the site.

| Item                                                                  | Where to add it                      | Current public behavior                                           |
| --------------------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| Approved articles                                                     | `src/content/writing/`               | Honest empty state; RSS exists with no items                      |
| Your original research notes                                          | `src/content/notes/`                 | No note or quotation is published                                 |
| Detailed research analyses, findings, publications, posters, datasets | research collection                  | CV-sourced context and methods; no invented outcomes              |
| Your precise contribution to the ECEGEN website                       | `src/content/projects/ecegen.md`     | Public-facing site features described; no sole-authorship claim   |

The English IELTS score appears under Languages.

The research spotlight states the thesis question and the documented analysis contribution, but candidate-level results, figures, and any outputs still need owner-supplied, validated material before they are added.

For CV updates, replace the sanitized PDF in `public/cv/` and update `src/data/profile.ts` together; `/cv/` will pick up the change. Keep telephone numbers, private addresses, IDs, signatures, private QR codes, and unnecessary personal information out of public assets. The supplied original remains outside the repository, unchanged.

Draft templates contain authoring examples, not publishable personal statements. Review and replace their full contents before publishing. Never add real sensitive content to a draft assuming Git protects it: a public source repository can expose draft files even though the generated website does not.
