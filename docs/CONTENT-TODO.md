# Owner content still needed

Education, employment, research methods, tools, languages, email, and LinkedIn have been populated from the owner-supplied CV updated September 2026. A sanitized downloadable PDF is available, and `/cv/` renders the same data as a printable HTML CV. The code and layout support these remaining additions without redesigning the site.

| Item                                                                  | Where to add it                  | Current public behavior                                                                                                                     |
| --------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Approved articles                                                     | `src/content/writing/`           | Honest empty state; RSS exists with no items                                                                                                |
| Your original research notes                                          | `src/content/notes/`             | No note or quotation is published                                                                                                           |
| Certificates: exact titles, issuers, and dates                        | `src/content/credentials/`       | `/credentials/` shows a neutral empty message. CV and About omit the section until an entry exists                                          |
| Detailed research analyses, findings, publications, posters, datasets | research collection              | CV-sourced context and methods; no invented outcomes                                                                                        |
| Which ECEGEN website components were personally written               | `src/content/projects/ecegen.md` | The page says the public website was supported alongside the bioinformatician role. It does not itemize components or claim sole authorship |

The CV mentions animal-model research certification without its title, institution, or date, so it has not been turned into a credential entry. The English IELTS score appears under Languages without an invented exam date or certificate link.

The research spotlight states the thesis question and the documented analysis contribution, but candidate-level results, figures, and any outputs still need owner-supplied, validated material before they are added.

Checked against the public PDF on 4 October 2026, without changing either file. Dates for the MSc (Sept 2024 – July 2026), BSc (Sept 2017 – June 2023), Erasmus period (Sept 2020 – June 2021), ECEGEN role (Jan 2026 – present), Cingoz Lab (Sept 2024 – June 2026), and the two internships match the site. The PDF still titles the A Coruña period as a B.Sc. line; the site keeps it as exchange study, not a second degree. The PDF also includes a BSc GPA of 2.68, an English level of “Proficient,” and screen details (2,981 genes, 10 sgRNAs per gene, plus named pathways) that are not on the public research page. Confirm those before adding them. The PDF was not regenerated.

For CV updates, replace the sanitized PDF in `public/cv/` and update `src/data/profile.ts` together; `/cv/` will pick up the change. Keep telephone numbers, private addresses, IDs, signatures, private QR codes, and unnecessary personal information out of public assets. The supplied original remains outside the repository, unchanged.

Draft templates contain authoring examples, not publishable personal statements. Review and replace their full contents before publishing. Never add real sensitive content to a draft assuming Git protects it: a public source repository can expose draft files even though the generated website does not.
