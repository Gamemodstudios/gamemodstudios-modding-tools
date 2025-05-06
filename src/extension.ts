import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as newproject from './newproject';
import { exec } from 'child_process';

class ModdingToolsDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
        if (!element) {
            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders && workspaceFolders.length > 0) {
                const projectPath = workspaceFolders[0].uri.fsPath;
                const gmsFolderPath = path.join(projectPath, '.gms');

                if (fs.existsSync(gmsFolderPath)) {
                    // If the .gms folder exists, show a message or items
                    return Promise.resolve([new vscode.TreeItem("Modding Project Detected")]);
                } else {
                    // If the .gms folder doesn't exist, show a "Create New Mod" button
                    const createNewModItem = new vscode.TreeItem("Create New Mod", vscode.TreeItemCollapsibleState.None);
                    createNewModItem.command = {
                        command: 'gamemodstudios-modding-tools.createNewMod',
                        title: 'Create New Mod'
                    };
                    return Promise.resolve([createNewModItem]);
                }
            }
        }
        return Promise.resolve([]);
    }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('Gamemodstudios Modding Tools is now active!');

    const disposableHelloWorld = vscode.commands.registerCommand('gamemodstudios-modding-tools.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from Gamemodstudios Modding Tools!');
    });

    const disposableOpen = vscode.commands.registerCommand('gamemodstudios-modding-tools.openModdingTools', () => {
        vscode.window.showInformationMessage('Opening Gamemodstudios Modding Tools!');
    });

    const disposableCreateNewMod = vscode.commands.registerCommand('gamemodstudios-modding-tools.createNewMod', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {

            try {
				vscode.window.showInformationMessage('Creating new modding project...');
				vscode.window.showInformationMessage('Feature not implemented, please visit the documentation on how to manually setup a project');
				// For more information on what it is supposed to do, please visit the project plan on https://github.com/axelsson09/gamemodstudios-modding-tools or http://192.168.1.133:7323/project/vscode/modtool

				//await newproject.executeNewProjectScript(); 
            } catch (error) {
                const errorMessage = (error instanceof Error) ? error.message : String(error);
                vscode.window.showErrorMessage(`Failed to create modding project: ${errorMessage}`);
            }
        } else {
            vscode.window.showErrorMessage('No workspace folder is open.');
        }
    });

    const moddingToolsDataProvider = new ModdingToolsDataProvider();
    vscode.window.registerTreeDataProvider('gamemodstudios-modding-tools.view', moddingToolsDataProvider);

    context.subscriptions.push(disposableHelloWorld);
    context.subscriptions.push(disposableOpen);
    context.subscriptions.push(disposableCreateNewMod);
}

// This method is called when your extension is deactivated
export function deactivate() {}
