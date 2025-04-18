// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import { promisify } from 'util'; // Import promisify

const exec = promisify(cp.exec); // Promisify cp.exec

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "run-in-browser" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('run-in-browser.openFile', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found.');
			return; // No open text editor
		}

		const document = editor.document;
		const filePath = document.fileName;
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);

		if (!workspaceFolder) {
			vscode.window.showErrorMessage('File is not part of a workspace.');
			return;
		}

		const config = vscode.workspace.getConfiguration('run-in-browser');
		const browserPath = config.get<string>('browserPath');
		const baseUrl = config.get<string>('baseUrl');
		const documentRoot = config.get<string>('documentRoot'); // Get the document root setting

		// Determine the base path for relative calculation
		const basePath = documentRoot ? documentRoot : workspaceFolder.uri.fsPath;

		// Calculate relative path based on the determined base path
		const relativePath = path.relative(basePath, filePath).replace(/\\/g, '/');

		if (!browserPath) {
			vscode.window.showErrorMessage('Browser path is not configured. Please set \'run-in-browser.browserPath\' in your settings.');
			return;
		}

		if (!baseUrl) {
			vscode.window.showErrorMessage('Base URL is not configured. Please set \'run-in-browser.baseUrl\' in your settings.');
			return;
		}

		const urlToOpen = `${baseUrl}/${relativePath}`;

		// Use shell execution to handle paths with spaces, especially on Windows
		// Enclose browser path and URL in quotes
		const command = `"${browserPath}" "${urlToOpen}"`;

		try {
			// Await the promisified exec and handle results/errors
			const { stdout, stderr } = await exec(command);
			if (stderr) {
				console.error(`stderr: ${stderr}`);
				// Don't necessarily show an error message for stderr, as some browsers output harmless messages
			}
			console.log(`stdout: ${stdout}`);
			vscode.window.setStatusBarMessage(`Opened ${relativePath} in browser`, 5000); // Show for 5 seconds
		} catch (error: any) { // Catch errors from the exec promise
			console.error(`exec error: ${error}`);
			vscode.window.showErrorMessage(`Failed to open in browser: ${error.message}`);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
