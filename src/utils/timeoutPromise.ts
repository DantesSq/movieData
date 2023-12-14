export const timeout = (ms: number) => {
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
};
