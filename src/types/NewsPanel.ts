
export interface News {
  id: string;
  newstype: 'noticia' | 'cronica' | 'poema' | 'tirinha';
  title: string;
  summary: string;
  author: string;
  body: string;
  curtidas: number;
  arquivos: Array<{
    id?: string,
    image1: string,
    image2?: string,
    image3?: string,
    image4?: string,
    image5?: string,  
  }>
}

export interface CreateNewsData {
  newsType: string;
  title: string;
  summary: string;
  author: string;
  body: string;
  images: File[];
}

export interface UpdateNewsData {
  newstype: string;
  summary: string;
  author: string;
  body: string;
}