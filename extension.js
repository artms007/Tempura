
/*
VSCode の拡張は activate(context) と deactivate() を export する必要がある。
activate() は拡張の起動時に呼ばれ、deactivate() は拡張の終了時に呼ばれる。
今回はここで vscode-languageclient の起動と終了を行なっている。
*/

"use strict";
const vscode = require("vscode");
const languageclient = require("vscode-languageclient");

let client;

function activate(context) {
    try {
        // Language Server の起動コマンド
        const serverOptions = {
            command: "node",
            args: [
                context.extensionPath + "/soregashi.js",
                "--language-server"
            ]
        };

        // Language Client へのオプション
        // soregashi言語のファイル用にLanguageServer(soregashi.js)を使用する
        const clientOptions = {
            documentSelector: [
                {
                    scheme: "file",
                    language: "soregashi",
                }
            ],
        };
        
        client = new languageclient.LanguageClient("soregashi-mode", serverOptions, clientOptions);
        context.subscriptions.push(client.start());
    } catch (e) {
        vscode.window.showErrorMessage("soregashi-mode couldn't be started.");
    }
}

function deactivate() {
    if (client) return client.stop();
}

module.exports = { activate, deactivate }