export function fileListToArray(fileList: FileList) {
    const fileArray = Array.from(fileList);
  
    const arrayWithRandomIndex = fileArray.map((file) => ({
      index: Math.random(),
      file: file,
    }));
  
    return arrayWithRandomIndex;
  }
  