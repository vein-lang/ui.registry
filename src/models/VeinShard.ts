

export type PackageReference = {
    name: string;
    version: string;
}
export type Author = {
  name: string,
  github?: string
}

export type PackageUrls = {
  bugs?: string;
  homepage?: string;
  repository?: string;
  other?: any;
};



export type VeinShard = {
    name: string;
    version: string;
    description: string;
    authors: Author[];
    keywords: string[];
    categories: string[];
    icon: string;
    license: string;

    urls: PackageUrls;
    requireLicenseAcceptance: boolean;
    HasEmbeddedIcon: boolean;
    hasEmbbededReadme: boolean;

    isListed: boolean;
    preview: boolean;
    downloads: number;
    normalizedVersion?: string;
    originalVersion: string;

    published: string;

    dependencies: PackageReference[];
}
