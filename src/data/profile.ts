export const profile = {
  name: 'F. Emre Bora',
  fullName: 'Furkan Emre Bora',
  fields: 'Genetics · Bioinformatics · Computational Biology',
  description:
    'Research, writing, and selected work at the intersection of genetics, bioinformatics, computational biology, and software.',
  introduction:
    'I am a bioinformatician working across clinical genomics, cancer functional genomics, and computational biology. My work connects genomic data analysis, reproducible workflows, and the software that supports them.',
  biography: [
    'I work as a Bioinformatician at Ecegen Genetic Diseases Assessment Center, supporting NGS analysis, variant interpretation, and reproducible Linux-based genomic workflows.',
    'I completed my MSc in Biotechnology at Bezmialem Vakif University in July 2026. In Cingoz Lab, my graduate research investigated TRAIL resistance in glioblastoma through pooled CRISPR/Cas9 screening, candidate gene prioritization, and integration of transcriptomic and metabolomic data.',
    'My background also includes bioinformatics and genetics at Kadir Has University, an Erasmus exchange at Universidad de A Coruña, computational drug design, and experimental molecular biology.',
  ],
  github: 'https://github.com/femrebora',
  linkedin: 'https://linkedin.com/in/femre-bora',
  email: 'furkanemrebora@gmail.com',
  cv: '/cv/furkan-emre-bora-cv.pdf',
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

export interface TimelineEntry {
  label: string;
  title: string;
  description: string;
  period?: string;
  institution?: string;
  href?: string;
}

// Source: owner-supplied CV, updated September 2026. Exchange study is not a separate degree.
export const researchExperience: TimelineEntry[] = [
  {
    label: 'Graduate research',
    title: 'Functional genetics in glioblastoma',
    period: 'Sept 2024 – June 2026',
    institution: 'Bezmialem Vakif University · Cingoz Lab',
    description:
      'Bioinformatic analysis of a CRISPR/Cas9-based metabolic gene screen investigating TRAIL resistance.',
    href: '/research/trail-resistance/',
  },
];
export const experience: TimelineEntry[] = [
  {
    label: 'Clinical bioinformatics',
    title: 'Bioinformatician',
    institution: 'Ecegen Genetic Diseases Assessment Center',
    period: 'Jan 2026 – present',
    description:
      'Genomic data analysis and variant interpretation for clinical and research-oriented genetic testing. NGS quality control, alignment, annotation, filtering, and prioritization, alongside reproducible Linux workflows and pipeline automation.',
  },
  {
    label: 'Graduate research',
    title: 'Project Assistant / Graduate Researcher',
    institution:
      'Bezmialem Vakif University · Life Science and Biotechnology Institute · Cingoz Lab',
    period: 'Sept 2024 – June 2026',
    description:
      'Research supported by the TÜBİTAK 3501 Career Development Support Program. Pooled CRISPR/Cas9 screen analysis with MAGeCK RRA, pathway analysis, and integration with transcriptomics, metabolomics, and TCGA-GBM data. Laboratory work included mammalian cell culture, viability assays, and metabolomics sample preparation.',
    href: '/research/trail-resistance/',
  },
  {
    label: 'Clinical genetics internship',
    title: 'Intern',
    institution: 'Istinye University Genetic Diseases Diagnostic Center',
    period: 'June 2022 – Sept 2022',
    description:
      'Clinical genetics and cytogenetic workflows under laboratory specialist supervision. Review of VCF, BAM, and BED datasets, genomic annotation assessment, and mutation detection and microsatellite instability analysis using SeqScape.',
  },
  {
    label: 'Pharmaceutical internship',
    title: 'Intern',
    institution: 'Biofarma Pharmaceutical Company',
    period: 'June 2020 – Aug 2020',
    description:
      'Scientific literature review related to pharmaceutical research and therapeutic discovery, with exposure to research, regulatory, development, and testing workflows.',
  },
];
export const education: TimelineEntry[] = [
  {
    label: 'Master’s degree',
    title: 'MSc · Biotechnology',
    institution: 'Bezmialem Vakif University',
    period: 'Sept 2024 – July 2026',
    description:
      'Full scholarship; GPA 3.92/4.00. Thesis: Bioinformatic Analysis of a CRISPR/Cas9-Based Metabolic Gene Screen to Investigate TRAIL Resistance in Glioblastoma.',
    href: '/research/trail-resistance/',
  },
  {
    label: 'Bachelor’s degree',
    title: 'BSc · Bioinformatics and Genetics',
    institution: 'Kadir Has University',
    period: 'Sept 2017 – June 2023',
    description:
      'English-taught program. Project: Computational and in Vitro Analysis of GAT-3 Structure and Function as a Potential Therapeutic Target. Coursework included bioinformatics, computational drug design, and molecular modeling and simulations.',
  },
  {
    label: 'Erasmus exchange',
    title: 'Biology · Exchange study',
    institution: 'Universidad de A Coruña',
    period: 'Sept 2020 – June 2021',
    description:
      'Erasmus coursework in molecular techniques, genomic analysis, and statistics, with instruction in Spanish. Project: Computational Analysis of Viral Mutations.',
  },
];
export const backgroundPreview: TimelineEntry[] = [
  {
    ...experience[0]!,
    description:
      'Clinical genomic analysis, variant interpretation, and reproducible NGS workflows.',
  },
  researchExperience[0]!,
  {
    ...education[0]!,
    description:
      'Graduate study in biotechnology, with thesis research in functional cancer genomics.',
  },
];
export const selectedWork: TimelineEntry[] = [
  {
    label: 'Selected technical work',
    title: 'ECEGEN website',
    description:
      'A public-facing website for a genetic diseases evaluation center.',
    href: '/work/ecegen/',
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

export interface Credential {
  title: string;
  institution: string;
  date: string;
  description: string;
  credentialURL?: string;
  preview?: { src: string; alt: string };
}
// TODO: Add verified credentials and only sanitized, approved previews.
export const credentials: Credential[] = [];
