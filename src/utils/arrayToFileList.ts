export function arrayToFileList(filesArray: any) {
    const dataTransfer = new DataTransfer();
  
    for (let i = 0; i < filesArray.length; i++) {
      dataTransfer.items.add(filesArray[i]);
    }
  
    return dataTransfer.files;
  }