import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// Example ask the user some questions about the mod, ex mod name, game name, etc
// then use the answers to create a new modding project






export async function executeNewProjectScript() {
    let modName: string | undefined;
    let authorName: string | undefined;
    let version: string | undefined;
    let gameName: string | undefined;
    let modDescription: string | undefined;
    let mod_dependencies: string[] | undefined; // not required, but can be used to specify the mod dependencies
    let supported_game_versions: string[] | undefined; // not required, but can be used to specify the game versions that the mod is compatible with

    modName = await vscode.window.showInputBox({ prompt: 'Enter the mod name' });
    authorName = await vscode.window.showInputBox({ prompt: 'Enter the author name' });
    gameName = await vscode.window.showInputBox({ prompt: 'Enter the game name' });
    version = await vscode.window.showInputBox({ prompt: 'Enter the mod version' });
    modDescription = await vscode.window.showInputBox({ prompt: 'Enter the mod description' });
    const modDependenciesInput = await vscode.window.showInputBox({ prompt: 'Enter the mod dependencies (comma separated) if any' });
    mod_dependencies = modDependenciesInput ? modDependenciesInput.split(',').map(dep => dep.trim()) : []; // ensure dependencies is an empty array if undefined
    const supportedGameVersionsInput = await vscode.window.showInputBox({ prompt: 'Enter the supported game versions (comma separated) if any' });
    supported_game_versions = supportedGameVersionsInput ? supportedGameVersionsInput.split(',').map(version => version.trim()) : []; // ensure supported versions is an empty array if undefined

    await createNewModdingProject(modName, gameName, authorName, version, modDescription, mod_dependencies, supported_game_versions);
}

export async function createNewModdingProject(modName: string | undefined, gameName: string | undefined, authorName: string | undefined, version: string | undefined, modDescription: string | undefined, mod_dependencies: string[] | undefined, supported_game_versions: string[] | undefined) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
        const projectPath = workspaceFolders[0].uri.fsPath;
        const gmsFolderPath = path.join(projectPath, '.gms');

        try {
            // Create the .gms folder and initialize a basic project structure
            await fs.promises.mkdir(gmsFolderPath, { recursive: true });
            await fs.promises.writeFile(path.join(gmsFolderPath, 'README.md'), `# ${modName} \n\nThis is a modding project created by Gamemodstudios Modding Tools.`);  // infuture pull from a online template
            await fs.promises.writeFile(
                path.join(projectPath, modName + '.gmsmod'),
                JSON.stringify(
                    {
                        Mod_name: modName,
                        Author: authorName,
                        Version: version || '0.0.1', // use the version from the user otherwise use the default version 0.0.1
                        Game: gameName,
                        Description: modDescription,
                        Dependencies: mod_dependencies || [], // ensure dependencies is an empty array if undefined
                        Supported_versions: supported_game_versions || [] // ensure supported versions is an empty array if undefined
                    },
                    null,
                    2
                )
            );
            // pull the template from the official Gamemodstudios modding template repository
            vscode.window.showInformationMessage('New modding project created successfully!');
        } catch (error) {
            if (error instanceof Error) {
                vscode.window.showErrorMessage(`Failed to create new modding project: ${error.message}`);
            } else {
                vscode.window.showErrorMessage('Failed to create new modding project due to an unknown error.');
            }
        }
    } else {
        vscode.window.showErrorMessage('No workspace folder found. Please open a folder to create a new modding project.');
    }
}