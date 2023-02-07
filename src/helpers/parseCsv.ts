import Papa, { ParseResult } from "papaparse";

export const parseCsv = (file: File | undefined): Promise<ParseResult<any>> => {
  const demoUrl = "/data/Artikel.csv";
  return new Promise((resolve, reject) => {
    const onComplete = (result: ParseResult<any>) => {
      resolve(result);
    };
    const onError = (error: Error) => {
      reject(error);
    };

    const config = {
      header: true,
      skipEmptyLines: true,
      preview: 10000,
      dynamicTyping: true,
      complete: onComplete,
      error: onError,
    };

    if (!file) {
      Papa.parse(demoUrl, { ...config, download: true });
    } else {
      Papa.parse(file, config);
    }
  });
};
