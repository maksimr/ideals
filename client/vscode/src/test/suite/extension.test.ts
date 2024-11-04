import * as vscode from 'vscode';
import { IdealsClient } from '../../core/idealsClient';
import { State } from 'vscode-languageclient';

suite('Extension Test Suite', () => {
	const timeout = 60 * 1000;

	test('should start lsp', async () => {
		await waitUntil(() => {
			const lspClient: IdealsClient = getExtension()?.exports.lspClient;
			return lspClient?.state === State.Running;
		}, timeout, `lsp failed to start within ${timeout}ms`);
	}).timeout(timeout);

	function getExtension() {
		return vscode.extensions.getExtension(getExtensionId());
	}

	function getExtensionId() {
		return 'SuduIDE.ideals-vscode';
	}

	function waitUntil(predicate: () => boolean, timeout: number = 60 * 1000, message = 'Timeout') {
		return new Promise((resolve, reject) => {
			const timer = setInterval(() => {
				if (predicate()) {
					clearInterval(timer);
					resolve(true);
				}
			}, 10);

			setTimeout(() => {
				clearInterval(timer);
				reject(new Error(message));
			}, timeout);
		});
	}
});
