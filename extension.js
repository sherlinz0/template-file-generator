// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const fs = require('fs');
const templateConfig = require('./src');


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "template-file-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('template-file-generator.createTemplateFile', function (args) {
		// The code you place here will be executed every time your command is executed
		
		createTemplateFile(args)
			.then(() => vscode.window.showInformationMessage('成功创建模板文件!'))
			.catch((e) => console.error(e));

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from template-file-generator!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

const createTemplateFile = (args) => {
	return new Promise((resolve, reject) => {
		try {
			const fatherPath = args.fsPath || '.';
			const filePath = fatherPath + '\\template.jsx';
	
			if(!fs.existsSync(filePath)) {
				fs.writeFileSync(filePath, templateConfig.react_memo_template);
			} else {
				vscode.window.showErrorMessage('当前目录下已经存在 template.jsx 文件!');

				reject('template file has already existed!');
			}
	
			resolve('template file has been created successfully!');
		} catch(e) {
			reject(new Error(e));
		}
	});
}

module.exports = {
	activate,
	deactivate
}
