# Owner content still needed

Education, employment, research methods, tools, languages, email, and LinkedIn have been populated from the owner-supplied CV updated September 2026. A sanitized downloadable PDF is available. The code and layout support these remaining additions without redesigning the site.

| Item                                                                  | Where to add it                      | Current public behavior                                                                 |
| --------------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------- |
| Approved articles                                                     | `src/content/writing/`               | Honest empty state; RSS exists with no items                                            |
| Your original research notes                                          | `src/content/notes/`                 | No note or quotation is published                                                       |
| Certificates: exact titles, issuers, and dates                        | credentials in `src/data/profile.ts` | Availability notice; no certificate documents exposed                                   |
| Detailed research analyses, findings, publications, posters, datasets | research collection                  | CV-sourced context and methods; no invented outcomes                                    |
| Your precise contribution to the ECEGEN website                       | ECEGEN project entry                 | Repository implementation described; no sole-authorship or website-responsibility claim |

The CV mentions animal-model research certification without its title, institution, or date, so it has not been turned into a credential entry. The English IELTS score appears under Languages without an invented exam date or certificate link.

For CV updates, replace the sanitized PDF in `public/cv/` and update `src/data/profile.ts` together. Keep telephone numbers, private addresses, IDs, signatures, private QR codes, and unnecessary personal information out of public assets. The supplied original remains outside the repository, unchanged.

Draft templates contain authoring examples, not publishable personal statements. Review and replace their full contents before publishing. Never add real sensitive content to a draft assuming Git protects it: a public source repository can expose draft files even though the generated website does not.
