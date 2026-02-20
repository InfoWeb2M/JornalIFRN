export interface News {
  id: string;
  title: string;
  summary?: string | null;
  body: string;
  author?: string | null;
  created_at: Date;
  newstype?: string | null;
  curtidas: number;

  arquivos: {
    id: string;
    image1?: string | null;
    image2?: string | null;
    image3?: string | null;
    image4?: string | null;
    image5?: string | null;
  }[];
}
