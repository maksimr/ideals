import * as vscode from 'vscode';

export const waitUntil = async (predicate: () => boolean, timeout = 10000, message: string = "Timeout") => {
  const pollInterval = 10;

  return new Promise((resolve, reject) => {
    const timerId = setInterval(() => {
      if (predicate()) {
        clearInterval(timerId);
        clearTimeout(timeoutId);
        resolve(true);
      }
    }, pollInterval);

    const timeoutId = setTimeout(() => {
      clearInterval(timerId);
      clearTimeout(timeoutId);
      reject(new Error(message));
    }, timeout);
  });
};

export function getExtensionExports() {
  return getExtension()?.exports as ReturnType<typeof import('../extension')['activate']>;
}

export function getExtension() {
  return vscode.extensions.getExtension(getExtensionId());
}

export function getExtensionId() {
  return 'SuduIDE.ideals-vscode';
}