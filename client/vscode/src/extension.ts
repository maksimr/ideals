import * as vscode from 'vscode';
import { JAR_CONTENT_SCHEME, ZIP_CONTENT_SCHEME } from './jar-content-provider/Jar';
import JarDocumentContentProvider from './jar-content-provider/JarDocumentContentProvider';

import { IdealsClient } from './core/idealsClient';

export function activate(context: vscode.ExtensionContext) {
	const provider = new JarDocumentContentProvider(context);
	const jarRegistration = vscode.workspace.registerTextDocumentContentProvider(JAR_CONTENT_SCHEME, provider);
	const zipRegistration = vscode.workspace.registerTextDocumentContentProvider(ZIP_CONTENT_SCHEME, provider);

	context.subscriptions.push(jarRegistration);
	context.subscriptions.push(zipRegistration);

	const lspClient = new IdealsClient();

	lspClient.setContext(context);
	lspClient.init().catch((error) => {
		console.log("Failed to activate RRI IdeaLS extension. " + (error));
	});

	context.subscriptions.push(lspClient);

	console.log('Congratulations, your extension "rri.ideals" is now active!');

	return {
		lspClient
	};
}

// this method is called when your extension is deactivated
export function deactivate() { }
