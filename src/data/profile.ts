export const profile = {
  name: 'F. Emre Bora',
  fullName: 'Furkan Emre Bora',
  fields: 'Genetics · Bioinformatics · Computational Biology',
  tagline: 'Bioinformatics · Computational biology',
  description:
    'Research and writing in genetics, bioinformatics, computational biology, and scientific software.',
  introduction:
    'I work with genomic data and build tools for research and clinical genomics.',
  writingIntroduction:
    'A place for notes and essays on biology, computation, and the practice of research.',
  biography: [
    'I work as a Bioinformatician at Ecegen Genetic Diseases Assessment Center, supporting NGS analysis, variant interpretation, and reproducible Linux-based genomic workflows.',
    'I completed my MSc in Biotechnology at Bezmialem Vakif University in July 2026. In Cingoz Lab, my graduate research investigated TRAIL resistance in glioblastoma through pooled CRISPR/Cas9 screening, candidate gene prioritization, and integration of transcriptomic and metabolomic data.',
    'My background also includes bioinformatics and genetics at Kadir Has University, an Erasmus exchange at Universidad de A Coruña, computational drug design, and experimental molecular biology.',
  ],
  github: 'https://github.com/femrebora',
  linkedin: 'https://linkedin.com/in/femre-bora',
  medium: 'https://medium.com/@furkanemrebora',
  email: 'furkanemrebora@gmail.com',
  cv: '/cv/furkan-emre-bora-cv.pdf',
  cvPage: '/cv/',
  rss: '/rss.xml',
};

export const interests = [
  {
    number: '01',
    title: 'Genomes & computation',
    description:
      'Computational genomics, bioinformatics, and the analysis of sequencing data.',
    topics: ['Computational genomics', 'NGS analysis', 'Clinical genomics'],
  },
  {
    number: '02',
    title: 'Cancer & functional genetics',
    description:
      'Questions around cancer biology, metabolic genes, and responses to perturbation.',
    topics: ['Glioblastoma', 'CRISPR screens', 'Cancer metabolism'],
  },
  {
    number: '03',
    title: 'Research & its tools',
    description:
      'Scientific computing and the practical systems that make research easier to follow.',
    topics: [
      'Reproducible research',
      'Scientific computing',
      'Open-source software',
    ],
  },
];

export type TrackId = 'education' | 'exchange' | 'research' | 'work';
export interface TimelineEntry {
  id: string;
  /** Compact name used on the timeline track. */
  short: string;
  label: string;
  title: string;
  description: string;
  period: string;
  /** Inclusive months as YYYY-MM, mirroring `period`; omit `end` while ongoing. */
  start: string;
  end?: string;
  track: TrackId;
  institution?: string;
  href?: string;
}

// Source: owner-supplied CV, updated September 2026. Exchange study is not a separate degree.
export const experience: TimelineEntry[] = [
  {
    id: 'ecegen',
    short: 'Ecegen',
    start: '2026-01',
    track: 'work',
    label: 'Clinical bioinformatics',
    title: 'Bioinformatician',
    institution: 'Ecegen Genetic Diseases Assessment Center',
    period: 'Jan 2026 to present',
    description:
      'Genomic data analysis and variant interpretation for clinical and research-oriented genetic testing. NGS quality control, alignment, annotation, filtering, and prioritization, alongside reproducible Linux workflows and pipeline automation.',
  },
  {
    id: 'graduate-research',
    short: 'Cingoz Lab',
    start: '2024-09',
    end: '2026-06',
    track: 'research',
    label: 'Graduate research',
    title: 'Project Assistant / Graduate Researcher',
    institution:
      'Bezmialem Vakif University · Life Science and Biotechnology Institute · Cingoz Lab',
    period: 'Sept 2024 to June 2026',
    description:
      'Research supported by the TÜBİTAK 3501 Career Development Support Program. Pooled CRISPR/Cas9 screen analysis with MAGeCK RRA, pathway analysis, and integration with transcriptomics, metabolomics, and TCGA-GBM data. Laboratory work included mammalian cell culture, viability assays, and metabolomics sample preparation.',
    href: '/research/trail-resistance/',
  },
  {
    id: 'istinye-internship',
    short: 'Istinye',
    start: '2022-06',
    end: '2022-09',
    track: 'work',
    label: 'Clinical genetics internship',
    title: 'Intern',
    institution: 'Istinye University Genetic Diseases Diagnostic Center',
    period: 'June 2022 to Sept 2022',
    description:
      'Clinical genetics and cytogenetic workflows under laboratory specialist supervision. Review of VCF, BAM, and BED datasets, genomic annotation assessment, and mutation detection and microsatellite instability analysis using SeqScape.',
  },
  {
    id: 'biofarma-internship',
    short: 'Biofarma',
    start: '2020-06',
    end: '2020-08',
    track: 'work',
    label: 'Pharmaceutical internship',
    title: 'Intern',
    institution: 'Biofarma Pharmaceutical Company',
    period: 'June 2020 to Aug 2020',
    description:
      'Scientific literature review related to pharmaceutical research and therapeutic discovery, with exposure to research, regulatory, development, and testing workflows.',
  },
];
export const education: TimelineEntry[] = [
  {
    id: 'msc',
    short: 'MSc',
    start: '2024-09',
    end: '2026-07',
    track: 'education',
    label: 'Master’s degree',
    title: 'MSc · Biotechnology',
    institution: 'Bezmialem Vakif University',
    period: 'Sept 2024 to July 2026',
    description:
      'Full scholarship; GPA 3.92/4.00. Thesis: Bioinformatic Analysis of a CRISPR/Cas9-Based Metabolic Gene Screen to Investigate TRAIL Resistance in Glioblastoma.',
    href: '/research/trail-resistance/',
  },
  {
    id: 'bsc',
    short: 'BSc',
    start: '2017-09',
    end: '2023-06',
    track: 'education',
    label: 'Bachelor’s degree',
    title: 'BSc · Bioinformatics and Genetics',
    institution: 'Kadir Has University',
    period: 'Sept 2017 to June 2023',
    description:
      'English-taught program. Project: Computational and in Vitro Analysis of GAT-3 Structure and Function as a Potential Therapeutic Target. Coursework included bioinformatics, computational drug design, and molecular modeling and simulations.',
  },
  {
    id: 'erasmus',
    short: 'Erasmus',
    start: '2020-09',
    end: '2021-06',
    track: 'exchange',
    label: 'Erasmus exchange',
    title: 'Biology · Exchange study',
    institution: 'Universidad de A Coruña',
    period: 'Sept 2020 to June 2021',
    description:
      'Erasmus coursework in molecular techniques, genomic analysis, and statistics, with instruction in Spanish. Project: Computational Analysis of Viral Mutations.',
  },
];
export const capabilities = [
  {
    domain: 'NGS & clinical genomics',
    items: [
      'FastQC · fastp · Trimmomatic · BWA · HISAT2',
      'GATK · SAMtools · bcftools · IGV',
      'Ensembl VEP · SnpEff · ANNOVAR',
      'ClinVar · dbNSFP · variant prioritization',
    ],
  },
  {
    domain: 'Functional genomics & multi-omics',
    items: [
      'Pooled CRISPR/Cas9 screens · MAGeCK RRA',
      'TCGA · GO · KEGG · Reactome',
      'DESeq2 · fgsea · clusterProfiler · msigdbr',
      'Transcriptomics · metabolomics integration',
    ],
  },
  {
    domain: 'Programming & scientific computing',
    items: [
      'Python · R · Bash · SQL',
      'Pandas · NumPy · Biopython · Bioconductor',
      'Matplotlib · ggplot2 · scientific visualization',
      'Linux · Git · Docker · Conda / Mamba',
      'Nextflow · nf-core · reproducible workflows',
    ],
  },
  {
    domain: 'Molecular modeling & laboratory work',
    items: [
      'AutoDock · AutoDock Vina · molecular docking',
      'NAMD · PyMOL · VMD',
      'Mammalian cell culture · MTT viability assays',
      'DNA / RNA handling · gel electrophoresis',
      'Metabolomics sample preparation',
    ],
  },
];

export const languages = [
  { name: 'Turkish', description: 'Native' },
  { name: 'English', description: 'IELTS Academic: 6.0/9.0' },
  { name: 'Spanish', description: 'Limited working proficiency' },
];

// Certificates, training, and awards live in the `credentials` content
// collection (src/content/credentials/). Add one file per credential; leave
// the collection without published entries until owner-supplied material
// exists. Empty output omits the section on the CV and About page.
