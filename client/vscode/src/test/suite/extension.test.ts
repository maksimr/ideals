import { State } from 'vscode-languageclient';
import { getExtensionExports, waitUntil } from '../test-util';

suite('Extension Test Suite', () => {
  const startLSTimeout = 60 * 1000;

  test('should start language server', async () => {
    await waitUntil(() => {
      const lspClient = getExtensionExports().lspClient;
      return lspClient?.state === State.Running;
    }, startLSTimeout, `Language server failed to start within ${startLSTimeout}ms`);
  }).timeout(startLSTimeout);
});
