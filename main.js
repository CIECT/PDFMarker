/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const electron_1 = __webpack_require__(/*! electron */ "electron");
const electron_updater_1 = __webpack_require__(/*! electron-updater */ "electron-updater");
const path = __importStar(__webpack_require__(/*! path */ "path"));
const assignment_handler_1 = __webpack_require__(/*! ./src-electron/ipc/assignment.handler */ "./src-electron/ipc/assignment.handler.ts");
const rubric_handler_1 = __webpack_require__(/*! ./src-electron/ipc/rubric.handler */ "./src-electron/ipc/rubric.handler.ts");
const utils_1 = __webpack_require__(/*! ./src-electron/utils */ "./src-electron/utils.ts");
const import_handler_1 = __webpack_require__(/*! ./src-electron/ipc/import.handler */ "./src-electron/ipc/import.handler.ts");
const workspace_handler_1 = __webpack_require__(/*! ./src-electron/ipc/workspace.handler */ "./src-electron/ipc/workspace.handler.ts");
const comment_handler_1 = __webpack_require__(/*! ./src-electron/ipc/comment.handler */ "./src-electron/ipc/comment.handler.ts");
const config_handler_1 = __webpack_require__(/*! ./src-electron/ipc/config.handler */ "./src-electron/ipc/config.handler.ts");
const application_handler_1 = __webpack_require__(/*! ./src-electron/ipc/application.handler */ "./src-electron/ipc/application.handler.ts");
const update_handler_1 = __webpack_require__(/*! ./src-electron/ipc/update.handler */ "./src-electron/ipc/update.handler.ts");
// tslint:disable-next-line:one-variable-per-declaration
let mainWindow, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
const logger = __webpack_require__(/*! electron-log */ "electron-log");
// Only auto download for full (non pre-releases)
electron_updater_1.autoUpdater.autoDownload = !electron_updater_1.autoUpdater.allowPrerelease;
function createWindow() {
    const size = electron_1.screen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    const menu = electron_1.Menu.buildFromTemplate(MENU_TEMPLATE);
    electron_1.Menu.setApplicationMenu(menu);
    if (serve) {
        // require('electron-reload')(__dirname, {
        //   electron: require(`${__dirname}/node_modules/electron`)
        // });
        mainWindow.loadURL('http://localhost:4200').then(() => {
            mainWindow.webContents.openDevTools();
        });
    }
    else {
        mainWindow.loadFile(path.join(__dirname, 'dist/browser/index.html'));
    }
    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    mainWindow.webContents.setWindowOpenHandler((details) => {
        // For now we assume all links are external
        electron_1.shell.openExternal(details.url);
        return {
            action: 'deny'
        };
    });
}
const MENU_TEMPLATE = [{
        label: 'File',
        submenu: [{
                role: 'quit'
            }]
    }, {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.reload();
                    }
                }
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.webContents.toggleDevTools();
                    }
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    }, {
        label: 'Window',
        submenu: [
            {
                role: 'minimize'
            },
            {
                role: 'close'
            }
        ]
    }];
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.whenReady().then(() => {
        if (process.platform === 'win32') {
            electron_1.app.setAppUserModelId('za.ac.uwc.PDF-Marker'); // set appId from package.json or electron-builder.yml?
        }
        createWindow();
        // Assignment API
        electron_1.ipcMain.handle('assignments:get', (0, utils_1.toIpcResponse)(assignment_handler_1.getAssignments));
        electron_1.ipcMain.handle('assignments:update', (0, utils_1.toIpcResponse)(assignment_handler_1.updateAssignment));
        electron_1.ipcMain.handle('assignments:create', (0, utils_1.toIpcResponse)(assignment_handler_1.createAssignment));
        electron_1.ipcMain.handle('assignments:saveMarks', (0, utils_1.toIpcResponse)(assignment_handler_1.saveMarks));
        electron_1.ipcMain.handle('assignments:finalizeAssignment', (0, utils_1.toIpcResponse)(assignment_handler_1.finalizeAssignment));
        electron_1.ipcMain.handle('assignments:finalizeAssignmentRubric', (0, utils_1.toIpcResponse)(assignment_handler_1.finalizeAssignmentRubric));
        electron_1.ipcMain.handle('assignments:getAssignmentSettings', (0, utils_1.toIpcResponse)(assignment_handler_1.getAssignmentSettings));
        electron_1.ipcMain.handle('assignments:getAssignmentGlobalSettings', (0, utils_1.toIpcResponse)(assignment_handler_1.getAssignmentGlobalSettings));
        electron_1.ipcMain.handle('assignments:updateAssignmentSettings', (0, utils_1.toIpcResponse)(assignment_handler_1.updateAssignmentSettings));
        electron_1.ipcMain.handle('assignments:shareExport', (0, utils_1.toIpcResponse)(assignment_handler_1.shareExport));
        electron_1.ipcMain.handle('assignments:getMarks', (0, utils_1.toIpcResponse)(assignment_handler_1.getMarks));
        electron_1.ipcMain.handle('assignments:getGrades', (0, utils_1.toIpcResponse)(assignment_handler_1.getGrades));
        electron_1.ipcMain.handle('assignments:updateAssignmentRubric', (0, utils_1.toIpcResponse)(assignment_handler_1.updateAssignmentRubric));
        electron_1.ipcMain.handle('assignments:getPdfFile', (0, utils_1.toIpcResponse)(assignment_handler_1.getPdfFile));
        // Rubric API
        electron_1.ipcMain.handle('rubrics:selectRubricFile', (0, utils_1.toIpcResponse)(rubric_handler_1.selectRubricFile));
        electron_1.ipcMain.handle('rubrics:rubricUpload', (0, utils_1.toIpcResponse)(rubric_handler_1.rubricUpload));
        electron_1.ipcMain.handle('rubrics:getRubricNames', (0, utils_1.toIpcResponse)(rubric_handler_1.getRubricNames));
        electron_1.ipcMain.handle('rubrics:deleteRubricCheck', (0, utils_1.toIpcResponse)(rubric_handler_1.deleteRubricCheck));
        electron_1.ipcMain.handle('rubrics:deleteRubric', (0, utils_1.toIpcResponse)(rubric_handler_1.deleteRubric));
        electron_1.ipcMain.handle('rubrics:getRubric', (0, utils_1.toIpcResponse)(rubric_handler_1.getRubric));
        electron_1.ipcMain.handle('rubrics:getRubrics', (0, utils_1.toIpcResponse)(rubric_handler_1.getRubrics));
        // Import API
        electron_1.ipcMain.handle('import:importZip', (0, utils_1.toIpcResponse)(import_handler_1.importZip));
        electron_1.ipcMain.handle('import:validateZipFile', (0, utils_1.toIpcResponse)(import_handler_1.validateZipFile));
        electron_1.ipcMain.handle('import:getZipEntries', (0, utils_1.toIpcResponse)(import_handler_1.getZipEntries));
        // Workspace API
        electron_1.ipcMain.handle('workspace:moveWorkspaceAssignments', (0, utils_1.toIpcResponse)(workspace_handler_1.moveWorkspaceAssignments));
        electron_1.ipcMain.handle('workspace:updateWorkspaceName', (0, utils_1.toIpcResponse)(workspace_handler_1.updateWorkspaceName));
        electron_1.ipcMain.handle('workspace:createWorkingFolder', (0, utils_1.toIpcResponse)(workspace_handler_1.createWorkingFolder));
        electron_1.ipcMain.handle('workspace:getWorkspaces', (0, utils_1.toIpcResponse)(workspace_handler_1.getWorkspaces));
        electron_1.ipcMain.handle('workspace:deleteWorkspace', (0, utils_1.toIpcResponse)(workspace_handler_1.deleteWorkspace));
        electron_1.ipcMain.handle('workspace:deleteWorkspaceCheck', (0, utils_1.toIpcResponse)(workspace_handler_1.deleteWorkspaceCheck));
        // Comments API
        electron_1.ipcMain.handle('comments:getComments', (0, utils_1.toIpcResponse)(comment_handler_1.getComments));
        electron_1.ipcMain.handle('comments:deleteComment', (0, utils_1.toIpcResponse)(comment_handler_1.deleteComment));
        electron_1.ipcMain.handle('comments:addComment', (0, utils_1.toIpcResponse)(comment_handler_1.addComment));
        // Config API
        electron_1.ipcMain.handle('config:getConfig', (0, utils_1.toIpcResponse)(config_handler_1.getConfig));
        electron_1.ipcMain.handle('config:updateConfig', (0, utils_1.toIpcResponse)(config_handler_1.updateConfig));
        // Application API
        electron_1.ipcMain.handle('app:saveFile', (0, utils_1.toIpcResponse)(application_handler_1.saveFile));
        electron_1.ipcMain.handle('app:version', (0, utils_1.toIpcResponse)(application_handler_1.getVersion));
        electron_1.ipcMain.handle('app:getFolder', (0, utils_1.toIpcResponse)(application_handler_1.getFolder));
        electron_1.ipcMain.handle('app:getFile', (0, utils_1.toIpcResponse)(application_handler_1.getFile));
        electron_1.ipcMain.handle('app:openExternalLink', (0, utils_1.toIpcResponse)(application_handler_1.openExternalLink));
        // Update API
        electron_1.ipcMain.handle('update:check', (0, utils_1.toIpcResponse)(update_handler_1.checkForUpdates));
        electron_1.ipcMain.handle('update:download', (0, utils_1.toIpcResponse)(update_handler_1.downloadUpdate));
        electron_1.ipcMain.on('update:restart', () => {
            electron_updater_1.autoUpdater.quitAndInstall();
        });
    });
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) {
            createWindow();
        }
    });
    electron_updater_1.autoUpdater.on('error', err => {
        logger.error('AutoUpdater error');
        logger.error(err);
    });
}
catch (e) {
    console.error(e);
    // Catch Error
    // throw e;
}


/***/ }),

/***/ "./src-electron/constants.ts":
/*!***********************************!*\
  !*** ./src-electron/constants.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STUDENT_DIRECTORY_NO_NAME_REGEX = exports.STUDENT_DIRECTORY_REGEX = exports.STUDENT_DIRECTORY_ID_REGEX = exports.HIGHLIGHT_HEIGHT = exports.NOT_PROVIDED_COMMENT = exports.COULD_NOT_READ_COMMENT_LIST = exports.INVALID_STUDENT_FOLDER = exports.EXTRACTED_ZIP_BUT_FAILED_TO_WRITE_TO_RUBRIC = exports.EXTRACTED_ZIP = exports.NOT_CONFIGURED_CONFIG_DIRECTORY = exports.COULD_NOT_CREATE_CONFIG_DIRECTORY = exports.NOT_PROVIDED_RUBRIC = exports.COULD_NOT_READ_RUBRIC_LIST = exports.COULD_NOT_CREATE_RUBRIC_FILE = exports.INVALID_RUBRIC_JSON_FILE = exports.COMMENTS_FILE = exports.CONFIG_DIR = exports.APP_DATA_DIR = exports.RUBRICS_FILE = exports.CONFIG_FILE = void 0;
const path_1 = __webpack_require__(/*! path */ "path");
exports.CONFIG_FILE = 'config.json';
exports.RUBRICS_FILE = 'rubrics.json';
exports.APP_DATA_DIR = process.env.APPDATA || (process.platform === 'darwin' ? process.env.HOME +
    '/Library/Preferences' : process.env.HOME + '/.local/share');
exports.CONFIG_DIR = exports.APP_DATA_DIR + path_1.sep + 'pdf-config' + path_1.sep;
exports.COMMENTS_FILE = 'comments.json';
/*COMMON MESSAGES*/
exports.INVALID_RUBRIC_JSON_FILE = 'Rubric file is not a valid JSON file!';
exports.COULD_NOT_CREATE_RUBRIC_FILE = 'Failed to read rubric file!';
exports.COULD_NOT_READ_RUBRIC_LIST = 'Could not read list of rubrics!';
exports.NOT_PROVIDED_RUBRIC = 'Rubric must be provided!';
exports.COULD_NOT_CREATE_CONFIG_DIRECTORY = 'Failed to create configuration directory!';
exports.NOT_CONFIGURED_CONFIG_DIRECTORY = 'Configure default location to extract files to on the settings page!';
exports.EXTRACTED_ZIP = 'Successfully extracted assignment to selected workspace!';
exports.EXTRACTED_ZIP_BUT_FAILED_TO_WRITE_TO_RUBRIC = 'Successfully extracted assignment to selected workspace! ' +
    'But Failed to write to rubrics file!';
exports.INVALID_STUDENT_FOLDER = 'Invalid student folder';
exports.COULD_NOT_READ_COMMENT_LIST = 'Could not read list of comments!';
exports.NOT_PROVIDED_COMMENT = 'Comment must be provided!';
exports.HIGHLIGHT_HEIGHT = 20;
exports.STUDENT_DIRECTORY_ID_REGEX = /.*\((.+)\)/;
exports.STUDENT_DIRECTORY_REGEX = /(.*), (.*)\((.+)\)/;
exports.STUDENT_DIRECTORY_NO_NAME_REGEX = /(.*),\((.+)\)/;


/***/ }),

/***/ "./src-electron/ipc/application.handler.ts":
/*!*************************************************!*\
  !*** ./src-electron/ipc/application.handler.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getVersion = exports.openExternalLink = exports.getFile = exports.getFolder = exports.saveFile = void 0;
const promises_1 = __webpack_require__(/*! fs/promises */ "fs/promises");
const electron_1 = __webpack_require__(/*! electron */ "electron");
const path_1 = __webpack_require__(/*! path */ "path");
const fs_1 = __webpack_require__(/*! fs */ "fs");
function saveFile(event, filter) {
    return electron_1.dialog.showSaveDialog(electron_1.BrowserWindow.getFocusedWindow(), {
        defaultPath: filter.filename,
        title: 'Save',
        filters: [
            { name: filter.name, extensions: filter.extension }
        ]
    }).then(({ filePath }) => {
        if (filePath) {
            try {
                return (0, promises_1.writeFile)(filePath, new Buffer(filter.buffer))
                    .then(() => {
                    return { selectedPath: filePath };
                });
            }
            catch (e) {
                return Promise.reject(e.message);
            }
        }
        else {
            return { selectedPath: null };
        }
    });
}
exports.saveFile = saveFile;
function getFolder() {
    return electron_1.dialog.showOpenDialog(electron_1.BrowserWindow.getFocusedWindow(), {
        title: 'Select Folder',
        properties: ['openDirectory', 'promptToCreate']
    }).then((data) => {
        if (data.canceled) {
            return { selectedPath: null };
        }
        else {
            return { selectedPath: data.filePaths[0] };
        }
    }, (reason) => {
        return Promise.reject(reason);
    });
}
exports.getFolder = getFolder;
function getFile(event, filter) {
    return electron_1.dialog.showOpenDialog(electron_1.BrowserWindow.getFocusedWindow(), {
        title: 'Select File',
        filters: [
            { name: filter.name, extensions: filter.extension }
        ],
        properties: ['openFile']
    }).then((data) => {
        if (data.canceled) {
            return { selectedPath: null };
        }
        else {
            return {
                selectedPath: data.filePaths[0],
                fileName: (0, path_1.basename)(data.filePaths[0], (0, path_1.extname)(data.filePaths[0])),
                ext: (0, path_1.extname)(data.filePaths[0]),
                basename: (0, path_1.basename)(data.filePaths[0]),
                info: (0, fs_1.statSync)(data.filePaths[0])
            };
        }
    }, (reason => {
        return Promise.reject(reason);
    }));
}
exports.getFile = getFile;
function openExternalLink(event, resource) {
    return electron_1.shell.openExternal(resource).then(() => {
        return { results: true };
    }, (reason) => {
        return Promise.reject(reason);
    });
}
exports.openExternalLink = openExternalLink;
function getVersion() {
    return Promise.resolve({ version: electron_1.app.getVersion() });
}
exports.getVersion = getVersion;


/***/ }),

/***/ "./src-electron/ipc/assignment.handler.ts":
/*!************************************************!*\
  !*** ./src-electron/ipc/assignment.handler.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.workspaceRelativePathToAbsolute = exports.getPdfFile = exports.updateAssignmentRubric = exports.shareExport = exports.finalizeAssignmentRubric = exports.finalizeAssignment = exports.getAssignmentGlobalSettings = exports.getAssignmentSettings = exports.getGrades = exports.createAssignment = exports.updateAssignment = exports.updateAssignmentSettings = exports.getMarks = exports.loadMarksAt = exports.loadMarks = exports.saveMarks = exports.getAssignments = void 0;
const fs_1 = __webpack_require__(/*! fs */ "fs");
const glob = __importStar(__webpack_require__(/*! glob */ "glob"));
const config_handler_1 = __webpack_require__(/*! ./config.handler */ "./src-electron/ipc/config.handler.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src-electron/utils.ts");
const constants_1 = __webpack_require__(/*! ../constants */ "./src-electron/constants.ts");
const path = __importStar(__webpack_require__(/*! path */ "path"));
const path_1 = __webpack_require__(/*! path */ "path");
const json_2_csv_1 = __webpack_require__(/*! json-2-csv */ "json-2-csv");
const promises_1 = __webpack_require__(/*! fs/promises */ "fs/promises");
const lodash_1 = __webpack_require__(/*! lodash */ "lodash");
const pdf_lib_1 = __webpack_require__(/*! pdf-lib */ "pdf-lib");
const marking_annotations_1 = __webpack_require__(/*! ../pdf/marking-annotations */ "./src-electron/pdf/marking-annotations.ts");
const rubric_annotations_1 = __webpack_require__(/*! ../pdf/rubric-annotations */ "./src-electron/pdf/rubric-annotations.ts");
const os = __importStar(__webpack_require__(/*! os */ "os"));
const fs_extra_1 = __webpack_require__(/*! fs-extra */ "fs-extra");
const workspace_handler_1 = __webpack_require__(/*! ./workspace.handler */ "./src-electron/ipc/workspace.handler.ts");
const workspace_1 = __webpack_require__(/*! @shared/info-objects/workspace */ "./src/shared/info-objects/workspace.ts");
const constants_2 = __webpack_require__(/*! @shared/constants/constants */ "./src/shared/constants/constants.ts");
const submission_info_1 = __webpack_require__(/*! @shared/info-objects/submission.info */ "./src/shared/info-objects/submission.info.ts");
const comment_handler_1 = __webpack_require__(/*! ./comment.handler */ "./src-electron/ipc/comment.handler.ts");
const rubric_handler_1 = __webpack_require__(/*! ./rubric.handler */ "./src-electron/ipc/rubric.handler.ts");
const zipDir = __webpack_require__(/*! zip-dir */ "zip-dir");
const csvtojson = __webpack_require__(/*! csvtojson */ "csvtojson");
function getAssignments() {
    return loadWorkspaces();
}
exports.getAssignments = getAssignments;
function loadFiles(directory, parent) {
    return (0, fs_extra_1.readdir)(directory).then(files => {
        const workspaceFiles = [];
        const promises = (0, lodash_1.map)(files, (file) => {
            return (0, promises_1.stat)(directory + path_1.sep + file).then(fileStat => {
                if (fileStat.isFile()) {
                    workspaceFiles.push({
                        type: workspace_1.TreeNodeType.FILE,
                        dateModified: fileStat.mtime,
                        name: file,
                        children: [],
                        parent
                    });
                }
            });
        });
        return Promise.all(promises).then(() => workspaceFiles);
    });
}
function loadAssignmentContents(directoryFullPath, parent) {
    const assignment = {
        type: workspace_1.TreeNodeType.ASSIGNMENT,
        dateModified: null,
        name: (0, path_1.basename)(directoryFullPath),
        children: [],
        parent
    };
    return (0, fs_extra_1.readdir)(directoryFullPath).then((files) => {
        const promises = (0, lodash_1.map)(files, (file) => {
            const fullPath = directoryFullPath + path_1.sep + file;
            return (0, promises_1.stat)(fullPath).then((fileStats) => {
                if (fileStats.isFile()) {
                    assignment.children.push({
                        type: workspace_1.TreeNodeType.FILE,
                        name: file,
                        dateModified: fileStats.mtime,
                        children: [],
                        parent: assignment
                    });
                }
                else {
                    // It must be a submission
                    let studentId;
                    let studentName;
                    let studentSurname;
                    let matches = constants_1.STUDENT_DIRECTORY_REGEX.exec(file);
                    if (matches !== null) {
                        studentId = matches[3];
                        studentName = matches[2];
                        studentSurname = matches[1];
                    }
                    else {
                        matches = constants_1.STUDENT_DIRECTORY_NO_NAME_REGEX.exec(file);
                        if (matches !== null) {
                            studentId = matches[2];
                            studentSurname = matches[1];
                        }
                    }
                    if (matches === null) {
                        return Promise.reject(`Student directory not in expected format '${file}'`);
                    }
                    const submission = {
                        dateModified: null,
                        type: workspace_1.TreeNodeType.SUBMISSION,
                        name: file,
                        studentId,
                        studentName,
                        studentSurname,
                        children: [],
                        parent: assignment
                    };
                    assignment.children.push(submission);
                    const feedbackNode = {
                        name: constants_2.FEEDBACK_FOLDER,
                        type: workspace_1.TreeNodeType.FEEDBACK_DIRECTORY,
                        children: [],
                        dateModified: null,
                        parent: submission
                    };
                    submission.children.push(feedbackNode);
                    const submissionAttachments = {
                        name: constants_2.SUBMISSION_FOLDER,
                        type: workspace_1.TreeNodeType.SUBMISSIONS_DIRECTORY,
                        children: [],
                        dateModified: null,
                        parent: submission
                    };
                    submission.children.push(submissionAttachments);
                    return Promise.all([
                        loadFiles(fullPath, submission).then(nodes => submission.children.push(...nodes)),
                        loadFiles(fullPath + path_1.sep + constants_2.FEEDBACK_FOLDER, feedbackNode).then(nodes => feedbackNode.children = nodes),
                        loadFiles(fullPath + path_1.sep + constants_2.SUBMISSION_FOLDER, submissionAttachments).then(nodes => submissionAttachments.children = nodes),
                    ]).then(() => {
                        submission.children.sort(constants_2.PDFM_FILE_SORT);
                        return submission;
                    });
                }
            });
        });
        return Promise.all(promises);
    }).then(() => {
        assignment.children.sort(constants_2.PDFM_FILE_SORT);
        return assignment;
    });
}
function loadWorkspaceContents(directoryFullPath) {
    // This directory is a workspace
    const workspace = {
        type: workspace_1.TreeNodeType.WORKSPACE,
        dateModified: null,
        name: (0, path_1.basename)(directoryFullPath),
        children: [],
        parent: null
    };
    return (0, fs_extra_1.readdir)(directoryFullPath).then((assignments) => {
        const promises = (0, lodash_1.map)(assignments, assignment => {
            return loadAssignmentContents(directoryFullPath + path_1.sep + assignment, workspace)
                .then(a => workspace.children.push(a));
        });
        return Promise.all(promises)
            .then(() => {
            workspace.children.sort(constants_2.PDFM_FILE_SORT);
            return workspace;
        });
    });
}
function loadWorkspaces() {
    return (0, config_handler_1.getConfig)().then((config) => {
        const defaultWorkspace = {
            type: workspace_1.TreeNodeType.WORKSPACE,
            name: constants_2.DEFAULT_WORKSPACE,
            dateModified: null,
            children: [],
            parent: null
        };
        const workspaceFolders = config.folders || [];
        const workspaces = [defaultWorkspace];
        return (0, fs_extra_1.readdir)(config.defaultPath).then((foundDirectories) => {
            const promises = (0, lodash_1.map)(foundDirectories, (directory) => {
                const fullPath = config.defaultPath + path_1.sep + directory;
                // Check if the directory is a working directory
                if (workspaceFolders.includes(fullPath)) {
                    return loadWorkspaceContents(fullPath)
                        .then(workspace => workspaces.push(workspace));
                }
                else {
                    return loadAssignmentContents(fullPath, defaultWorkspace)
                        .then(a => defaultWorkspace.children.push(a));
                }
            });
            return Promise.all(promises).then(() => {
                return (0, lodash_1.sortBy)(workspaces, 'name');
            }, (error) => {
                console.error(error);
                return Promise.reject(error);
            });
        });
    });
}
function saveMarks(event, location, submissionInfo) {
    if (submissionInfo.type === submission_info_1.SubmissionType.MARK) {
        const marksPerPage = submissionInfo.marks;
        return (0, comment_handler_1.getComments)().then((comments) => {
            let updateComments = false;
            let totalMark = 0;
            marksPerPage.forEach((pageMarks) => {
                if (Array.isArray(pageMarks)) {
                    for (let i = 0; i < pageMarks.length; i++) {
                        totalMark += (pageMarks[i] && pageMarks[i].totalMark) ? pageMarks[i].totalMark : 0;
                        comments.forEach(comment => {
                            // Try and mark a comment as in use
                            if (pageMarks[i].comment && pageMarks[i].comment.includes(comment.title) && !comment.inUse) {
                                updateComments = true;
                                comment.inUse = true;
                            }
                        });
                    }
                }
            });
            let promise = Promise.resolve();
            if (updateComments) {
                promise = promise.then(() => (0, comment_handler_1.updateCommentsFile)(comments));
            }
            return promise.then(() => saveToMarks(location, submissionInfo, totalMark));
        });
    }
    else if (submissionInfo.type === submission_info_1.SubmissionType.RUBRIC) {
        const assignmentDirectory = (0, path_1.dirname)(location);
        return workspaceRelativePathToAbsolute(assignmentDirectory).then((assignmentSettingsPath) => {
            return getAssignmentSettingsAt(assignmentSettingsPath)
                .then((assignmentSettingsInfo) => {
                if ((0, lodash_1.isNil)(assignmentSettingsInfo.rubric)) {
                    return Promise.reject('Assignment\'s settings does not contain a rubric!');
                }
                let totalMark = 0;
                const marks = submissionInfo.marks;
                marks.forEach((levelIndex, index) => {
                    if (levelIndex !== null) {
                        totalMark += parseFloat('' + assignmentSettingsInfo.rubric.criterias[index].levels[levelIndex].score);
                    }
                });
                return saveToMarks(location, submissionInfo, totalMark);
            });
        });
    }
    else {
        return Promise.reject('Unknown submission info type');
    }
}
exports.saveMarks = saveMarks;
function saveSubmissionInfo(studentLocation, submissionInfo) {
    return (0, promises_1.writeFile)(studentLocation + path_1.sep + constants_2.MARK_FILE, JSON.stringify(submissionInfo))
        .then(() => submissionInfo, () => Promise.reject('Failed to save student marks!'));
}
function saveToMarks(studentLocation, marks, totalMark) {
    return workspaceRelativePathToAbsolute(studentLocation).then((studentFolder) => {
        return (0, utils_1.checkAccess)(studentFolder).then(() => {
            return saveSubmissionInfo(studentFolder, marks).then(() => {
                const assignmentFolder = (0, path_1.dirname)(studentFolder);
                return (0, utils_1.checkAccess)(assignmentFolder + path_1.sep + constants_2.GRADES_FILE).then(() => {
                    const studentDirectoryName = (0, path_1.basename)(studentFolder);
                    const matches = constants_1.STUDENT_DIRECTORY_ID_REGEX.exec(studentDirectoryName);
                    const studentNumber = matches[1] + '';
                    return csvtojson({ noheader: true, trim: false }).fromFile(assignmentFolder + path_1.sep + constants_2.GRADES_FILE)
                        .then((gradesJSON) => {
                        let changed = false;
                        let assignmentHeader;
                        if (gradesJSON.length < 3 || Object.keys(gradesJSON[2]).length < 4) {
                            return Promise.reject('grades.csv file appears to be corrupt');
                        }
                        for (let i = 0; i < gradesJSON.length; i++) {
                            if (i === 0) {
                                const keys = Object.keys(gradesJSON[i]);
                                if (keys.length > 0) {
                                    assignmentHeader = keys[0];
                                }
                            }
                            else if (i > 1 && !(0, utils_1.isNullOrUndefined)(assignmentHeader) && gradesJSON[i] && gradesJSON[i][assignmentHeader].toUpperCase() === studentNumber.toUpperCase()) {
                                gradesJSON[i].field5 = totalMark;
                                changed = true;
                            }
                        }
                        if (changed) {
                            // more logic to save new JSON to CSV
                            return (0, json_2_csv_1.json2csvAsync)(gradesJSON, { emptyFieldValue: '', prependHeader: false }).then((csv) => {
                                return (0, utils_1.writeToFile)(assignmentFolder + path_1.sep + constants_2.GRADES_FILE, csv, 'Successfully saved marks!', 'Failed to save marks to ' + constants_2.GRADES_FILE + ' file!');
                            }, () => {
                                return Promise.reject('Failed to convert json to csv!');
                            });
                        }
                        else {
                            return Promise.reject(`Could not find student ${studentNumber} in grades.csv`);
                        }
                    }, reason => {
                        return Promise.reject(reason);
                    });
                });
            });
        });
    });
}
function convertMarks(marks, studentFolderFullPath) {
    let submissionInfo;
    if (marks.version !== submission_info_1.SubmissionInfoVersion) {
        return getAssignmentSettingsAt((0, path_1.dirname)(studentFolderFullPath)).then((assignmentSettings) => {
            let promise = Promise.resolve();
            if (!marks.hasOwnProperty('version')) {
                // This is the original .marks.json convert it to version 1
                if (assignmentSettings.rubric) {
                    const rubricSubmissionInfo = new submission_info_1.RubricSubmissionInfo(1);
                    rubricSubmissionInfo.marks = marks;
                    submissionInfo = rubricSubmissionInfo;
                }
                else {
                    const markingSubmissionInfo = new submission_info_1.MarkingSubmissionInfo(1);
                    markingSubmissionInfo.marks = marks;
                    submissionInfo = markingSubmissionInfo;
                }
                promise = promise.then(() => saveSubmissionInfo(studentFolderFullPath, submissionInfo));
            }
            /*
             if (marks.version === 1) {
               // Convert to from v 1 to version 2
               submissionInfo = upgradedV2;
                promise = promise.then(() => saveSubmissionInfo(studentFolder, submissionInfo));
             }
      
             if (marks.version === 2) {
               // Convert to from v 2 to version 3
               submissionInfo = upgradedV3;
                promise = promise.then(() => saveSubmissionInfo(studentFolder, submissionInfo));
             }
             */
            return promise;
        });
    }
    return Promise.resolve(marks);
}
function loadMarks(studentFolder) {
    return workspaceRelativePathToAbsolute(studentFolder).then((absolutePath) => {
        return loadMarksAt(absolutePath);
    });
}
exports.loadMarks = loadMarks;
function loadMarksAt(studentFolderFull) {
    return (0, promises_1.readFile)(studentFolderFull + path_1.sep + constants_2.MARK_FILE).then((data) => {
        if (!(0, utils_1.isJson)(data)) {
            return [];
        }
        else {
            const marks = JSON.parse(data.toString());
            if (marks.version !== submission_info_1.SubmissionInfoVersion) {
                return convertMarks(marks, studentFolderFull);
            }
            return marks;
        }
    }, (err) => {
        return convertMarks([], studentFolderFull);
    });
}
exports.loadMarksAt = loadMarksAt;
function getMarks(event, studentFolder) {
    return loadMarks(studentFolder);
}
exports.getMarks = getMarks;
// Only For updating colour for now
function updateAssignmentSettings(event, updatedSettings = {}, workspaceName, assignmentName) {
    if (JSON.stringify(updatedSettings) === JSON.stringify({})) {
        return Promise.resolve();
    }
    return getAssignmentSettingsFor(workspaceName, assignmentName)
        .then((originalSettings) => {
        originalSettings.defaultColour = (updatedSettings.defaultColour) ? updatedSettings.defaultColour : originalSettings.defaultColour;
        return writeAssignmentSettingsFor(originalSettings, workspaceName, assignmentName);
    });
}
exports.updateAssignmentSettings = updateAssignmentSettings;
function updateAssignment(event, updateRequest) {
    const assignmentName = updateRequest.assignmentName.trim();
    try {
        return (0, config_handler_1.getConfig)().then((config) => __awaiter(this, void 0, void 0, function* () {
            let assignmentSettingsBuffer;
            if (updateRequest.workspace === constants_2.DEFAULT_WORKSPACE || (0, lodash_1.isNil)(updateRequest.workspace)) {
                assignmentSettingsBuffer = (0, fs_1.readFileSync)(config.defaultPath + path_1.sep + assignmentName + path_1.sep + constants_2.SETTING_FILE);
                if (!(0, utils_1.isJson)(assignmentSettingsBuffer)) {
                    return Promise.reject('Invalid assignment settings file!');
                }
            }
            else {
                assignmentSettingsBuffer = (0, fs_1.readFileSync)(config.defaultPath + path_1.sep + updateRequest.workspace + path_1.sep + assignmentName + path_1.sep + constants_2.SETTING_FILE);
                if (!(0, utils_1.isJson)(assignmentSettingsBuffer)) {
                    return Promise.reject('Invalid assignment settings file!');
                }
            }
            const assignmentSettingsInfo = JSON.parse(assignmentSettingsBuffer.toString());
            if (!assignmentSettingsInfo.isCreated) {
                return Promise.reject('Operation not permitted on this type of assignment!');
            }
            if (updateRequest.studentDetails.length !== updateRequest.files.length) {
                return Promise.reject(`Student details is not equal to number of files sent!`);
            }
            const grades = yield csvtojson({
                noheader: true,
                trim: false
            }).fromFile((updateRequest.workspace === constants_2.DEFAULT_WORKSPACE || (0, lodash_1.isNil)(updateRequest.workspace)) ?
                config.defaultPath + path_1.sep + assignmentName + path_1.sep + constants_2.GRADES_FILE :
                config.defaultPath + path_1.sep + updateRequest.workspace + path_1.sep + assignmentName + path_1.sep + constants_2.GRADES_FILE);
            let count = 0;
            const headers = `'${assignmentName}','SCORE_GRADE_TYPE'\n`;
            const line = `''\n`;
            const subheaders = `'Display ID','ID','Last Name','First Name','Mark','Submission date','Late submission'\n`;
            let csvString = headers + line + subheaders;
            for (const studentInfo of updateRequest.studentDetails) {
                const file = updateRequest.files[count];
                const studentFolder = studentInfo.studentSurname.toUpperCase() + ', ' + studentInfo.studentName.toUpperCase() + '(' + studentInfo.studentId.toUpperCase() + ')';
                const feedbackFolder = studentFolder + path_1.sep + constants_2.FEEDBACK_FOLDER;
                const submissionFolder = studentFolder + path_1.sep + constants_2.SUBMISSION_FOLDER;
                let csvData = '';
                if (updateRequest.workspace === constants_2.DEFAULT_WORKSPACE || (0, lodash_1.isNil)(updateRequest.workspace)) {
                    if ((0, fs_1.existsSync)(config.defaultPath + path_1.sep + assignmentName + path_1.sep + studentFolder)) {
                        if (studentInfo.remove) {
                            (0, utils_1.deleteFolderRecursive)(config.defaultPath + path_1.sep + assignmentName + path_1.sep + studentFolder);
                        }
                        else {
                            const studentRecord = grades.find(grade => grade[Object.keys(grades[0])[0]] === studentInfo.studentId.toUpperCase());
                            if (studentRecord) {
                                csvData = `${studentInfo.studentId.toUpperCase()},${studentInfo.studentId.toUpperCase()},${studentInfo.studentSurname.toUpperCase()},${studentInfo.studentName.toUpperCase()},${studentRecord.field5},,\n`;
                            }
                            else {
                                csvData = `${studentInfo.studentId.toUpperCase()},${studentInfo.studentId.toUpperCase()},${studentInfo.studentSurname.toUpperCase()},${studentInfo.studentName.toUpperCase()},,,\n`;
                            }
                        }
                    }
                    else {
                        const filename = (0, path_1.basename)(file);
                        (0, fs_1.mkdirSync)(config.defaultPath + path_1.sep + assignmentName + path_1.sep + feedbackFolder, { recursive: true });
                        (0, fs_1.mkdirSync)(config.defaultPath + path_1.sep + assignmentName + path_1.sep + submissionFolder, { recursive: true });
                        const content = (0, fs_1.readFileSync)(file);
                        const pdfDoc = yield pdf_lib_1.PDFDocument.load(content);
                        const pdfBytes = yield pdfDoc.save();
                        yield (0, fs_1.writeFileSync)(config.defaultPath + path_1.sep + assignmentName + path_1.sep + submissionFolder + path_1.sep + filename, pdfBytes);
                        // copyFileSync(file.path, config.defaultPath + sep + assignmentName + sep + submissionFolder + sep + file.originalname);
                        csvData = `${studentInfo.studentId.toUpperCase()},${studentInfo.studentId.toUpperCase()},${studentInfo.studentSurname.toUpperCase()},${studentInfo.studentName.toUpperCase()},,,\n`;
                    }
                }
                else {
                    if ((0, fs_1.existsSync)(config.defaultPath + path_1.sep + updateRequest.workspace + path_1.sep + assignmentName + path_1.sep + studentFolder)) {
                        if (studentInfo.remove) {
                            (0, utils_1.deleteFolderRecursive)(config.defaultPath + path_1.sep + updateRequest.workspace + path_1.sep + assignmentName + path_1.sep + studentFolder);
                        }
                        else {
                            const studentRecord = grades.find(grade => grade[Object.keys(grades[0])[0]] === studentInfo.studentId.toUpperCase());
                            if (studentRecord) {
                                csvData = `${studentInfo.studentId.toUpperCase()},${studentInfo.studentId.toUpperCase()},${studentInfo.studentSurname.toUpperCase()},${studentInfo.studentName.toUpperCase()},${studentRecord.field5},,\n`;
                            }
                            else {
                                csvData = `${studentInfo.studentId.toUpperCase()},${studentInfo.studentId.toUpperCase()},${studentInfo.studentSurname.toUpperCase()},${studentInfo.studentName.toUpperCase()},,,\n`;
                            }
                        }
                    }
                    else {
                        const filename = (0, path_1.basename)(file);
                        (0, fs_1.mkdirSync)(config.defaultPath + path_1.sep + updateRequest.workspace + path_1.sep + assignmentName + path_1.sep + feedbackFolder, { recursive: true });
                        (0, fs_1.mkdirSync)(config.defaultPath + path_1.sep + updateRequest.workspace + path_1.sep + assignmentName + path_1.sep + submissionFolder, { recursive: true });
                        const content = (0, fs_1.readFileSync)(file);
                        const pdfDoc = yield pdf_lib_1.PDFDocument.load(content);
                        const pdfBytes = yield pdfDoc.save();
                        yield (0, fs_1.writeFileSync)(config.defaultPath + path_1.sep + updateRequest.workspace + path_1.sep + assignmentName + path_1.sep + submissionFolder + path_1.sep + filename, pdfBytes);
                        // copyFileSync(file.path, config.defaultPath + sep + assignmentName + sep + submissionFolder + sep + file.originalname);
                        csvData = `${studentInfo.studentId.toUpperCase()},${studentInfo.studentId.toUpperCase()},${studentInfo.studentSurname.toUpperCase()},${studentInfo.studentName.toUpperCase()},,,\n`;
                    }
                }
                csvString += csvData;
                count++;
            }
            //
            if (updateRequest.workspace === constants_2.DEFAULT_WORKSPACE || (0, lodash_1.isNil)(updateRequest.workspace)) {
                (0, fs_1.writeFileSync)(config.defaultPath + path_1.sep + assignmentName + path_1.sep + constants_2.GRADES_FILE, csvString);
                return;
            }
            else {
                (0, fs_1.writeFileSync)(config.defaultPath + path_1.sep + updateRequest.workspace + path_1.sep + assignmentName + path_1.sep + constants_2.GRADES_FILE, csvString);
                return;
            }
        }));
    }
    catch (e) {
        return Promise.reject(e.message);
    }
}
exports.updateAssignment = updateAssignment;
function createAssignment(event, createInfo) {
    let assignmentName = createInfo.assignmentName.trim();
    try {
        return (0, config_handler_1.getConfig)().then((config) => __awaiter(this, void 0, void 0, function* () {
            const folders = glob.sync(config.defaultPath + '/*');
            let foundCount = 0;
            for (let i = 0; i < folders.length; i++) {
                if ((0, utils_1.isFolder)(folders[i])) {
                    const assignmentDirectoryName = path.basename(folders[i]);
                    // Doing a casesensitive check on the directory names - for Window's sake
                    if (assignmentName.toLowerCase() === assignmentDirectoryName.toLowerCase()) {
                        foundCount++;
                        // Doing a casesensitive check on the directory names - for Window's sake
                    }
                    else if ((assignmentName.toLowerCase() + ' (' + (foundCount + 1) + ')') === assignmentDirectoryName.toLowerCase()) {
                        foundCount++;
                    }
                }
            }
            if (foundCount > 0) {
                assignmentName = assignmentName + ' (' + (foundCount + 1) + ')';
            }
            const noRubric = createInfo.noRubric;
            let rubricName;
            let rubric = null;
            let rubricIndex;
            let rubrics;
            if (!noRubric) {
                if ((0, lodash_1.isNil)(createInfo.rubric)) {
                    return Promise.reject(constants_1.NOT_PROVIDED_RUBRIC);
                }
                rubricName = createInfo.rubric.trim();
                if (!(0, utils_1.isNullOrUndefined)(rubricName)) {
                    const rubricData = (0, fs_1.readFileSync)(constants_1.CONFIG_DIR + constants_1.RUBRICS_FILE);
                    try {
                        if (!(0, utils_1.isJson)(rubricData)) {
                            return Promise.reject(constants_1.INVALID_RUBRIC_JSON_FILE);
                        }
                        rubrics = JSON.parse(rubricData.toString());
                        if (Array.isArray(rubrics)) {
                            let index = -1;
                            for (let i = 0; i < rubrics.length; i++) {
                                if (rubrics[i].name === rubricName) {
                                    index = i;
                                    break;
                                }
                            }
                            if (index !== -1) {
                                rubric = rubrics[index];
                                rubricIndex = index;
                            }
                        }
                        else {
                            return Promise.reject(constants_1.COULD_NOT_READ_RUBRIC_LIST);
                        }
                    }
                    catch (e) {
                        return Promise.reject(e.message);
                    }
                }
            }
            const studentDetails = createInfo.studentRow;
            if (!Array.isArray(studentDetails)) {
                return Promise.reject(`Student details must be a list`);
            }
            if (studentDetails.length !== createInfo.files.length) {
                return Promise.reject(`Student details is not equal to number of files sent!`);
            }
            const settings = { defaultColour: '#3b487d', rubric, isCreated: true };
            let count = 0;
            const headers = `'${assignmentName}','SCORE_GRADE_TYPE'\n`;
            const line = `''\n`;
            const subheaders = `'Display ID','ID','Last Name','First Name','Mark','Submission date','Late submission'\n`;
            let csvString = headers + line + subheaders;
            for (const studentInfo of studentDetails) {
                const file = createInfo.files[count];
                const studentFolder = studentInfo.studentSurname.toUpperCase() + ', ' + studentInfo.studentName.toUpperCase() + '(' + studentInfo.studentId.toUpperCase() + ')';
                const feedbackFolder = studentFolder + path_1.sep + constants_2.FEEDBACK_FOLDER;
                const submissionFolder = studentFolder + path_1.sep + constants_2.SUBMISSION_FOLDER;
                const csvData = `${studentInfo.studentId.toUpperCase()},${studentInfo.studentId.toUpperCase()},${studentInfo.studentSurname.toUpperCase()},${studentInfo.studentName.toUpperCase()},,,\n`;
                csvString += csvData;
                if (createInfo.workspace === constants_2.DEFAULT_WORKSPACE || (0, lodash_1.isNil)(createInfo.workspace)) {
                    const filename = (0, path_1.basename)(file);
                    (0, fs_1.mkdirSync)(config.defaultPath + path_1.sep + assignmentName + path_1.sep + feedbackFolder, { recursive: true });
                    (0, fs_1.mkdirSync)(config.defaultPath + path_1.sep + assignmentName + path_1.sep + submissionFolder, { recursive: true });
                    const content = (0, fs_1.readFileSync)(file);
                    const pdfDoc = yield pdf_lib_1.PDFDocument.load(content);
                    const pdfBytes = yield pdfDoc.save();
                    yield (0, fs_1.writeFileSync)(config.defaultPath + path_1.sep + assignmentName + path_1.sep + submissionFolder + path_1.sep + filename, pdfBytes);
                    count++;
                }
                else {
                    const filename = (0, path_1.basename)(file);
                    (0, fs_1.mkdirSync)(config.defaultPath + path_1.sep + createInfo.workspace + path_1.sep + assignmentName + path_1.sep + feedbackFolder, { recursive: true });
                    (0, fs_1.mkdirSync)(config.defaultPath + path_1.sep + createInfo.workspace + path_1.sep + assignmentName + path_1.sep + submissionFolder, { recursive: true });
                    const content = (0, fs_1.readFileSync)(file);
                    const pdfDoc = yield pdf_lib_1.PDFDocument.load(content);
                    const pdfBytes = yield pdfDoc.save();
                    yield (0, fs_1.writeFileSync)(config.defaultPath + path_1.sep + createInfo.workspace + path_1.sep + assignmentName + path_1.sep + submissionFolder + path_1.sep + filename, pdfBytes);
                    count++;
                }
            }
            if (createInfo.workspace === constants_2.DEFAULT_WORKSPACE || (0, lodash_1.isNil)(createInfo.workspace)) {
                (0, fs_1.writeFileSync)(config.defaultPath + path_1.sep + assignmentName + path_1.sep + constants_2.GRADES_FILE, csvString);
                (0, fs_1.writeFileSync)(config.defaultPath + path_1.sep + assignmentName + path_1.sep + constants_2.SETTING_FILE, JSON.stringify(settings));
                return;
            }
            else {
                (0, fs_1.writeFileSync)(config.defaultPath + path_1.sep + createInfo.workspace + path_1.sep + assignmentName + path_1.sep + constants_2.GRADES_FILE, csvString);
                (0, fs_1.writeFileSync)(config.defaultPath + path_1.sep + createInfo.workspace + path_1.sep + assignmentName + path_1.sep + constants_2.SETTING_FILE, JSON.stringify(settings));
                return;
            }
        }));
    }
    catch (e) {
        return Promise.reject(e.message);
    }
}
exports.createAssignment = createAssignment;
function getGrades(event, workspaceName, assignmentName) {
    return (0, workspace_handler_1.getAssignmentDirectory)(workspaceName, assignmentName).then((assignmentFolder) => {
        return (0, utils_1.checkAccess)(assignmentFolder + path_1.sep + constants_2.GRADES_FILE).then(() => {
            return csvtojson({ noheader: true, trim: false }).fromFile(assignmentFolder + path_1.sep + constants_2.GRADES_FILE);
        });
    });
}
exports.getGrades = getGrades;
function setDateFinalized(assignmentFolder) {
    return getAssignmentSettingsAt(assignmentFolder).then((assignmentSettings) => {
        assignmentSettings.dateFinalized = new Date().toISOString();
        return writeAssignmentSettingsAt(assignmentSettings, assignmentFolder);
    });
}
function getAssignmentSettingsAt(assignmentFolder) {
    assignmentFolder = assignmentFolder.replace(/\//g, path_1.sep);
    if ((0, fs_1.existsSync)(assignmentFolder)) {
        return (0, promises_1.readFile)(assignmentFolder + path_1.sep + constants_2.SETTING_FILE).then((data) => {
            if (!(0, utils_1.isJson)(data)) {
                return Promise.reject('Assignment settings is not JSON');
            }
            return JSON.parse(data.toString());
        }, (error) => {
            return Promise.reject(error.message);
        });
    }
    else {
        return Promise.reject('Could not load assignment settings');
    }
}
function getAssignmentSettingsFor(workspaceName, assignmentName) {
    return (0, workspace_handler_1.getAssignmentDirectory)(workspaceName, assignmentName)
        .then((directory) => getAssignmentSettingsAt(directory));
}
function getAssignmentSettings(event, workspaceName, assignmentName) {
    return getAssignmentSettingsFor(workspaceName, assignmentName);
}
exports.getAssignmentSettings = getAssignmentSettings;
function getAssignmentGlobalSettings(event, location) {
    return getAssignmentSettingsAt(location);
}
exports.getAssignmentGlobalSettings = getAssignmentGlobalSettings;
function writeAssignmentSettingsAt(assignmentSettings, location) {
    const buffer = new Uint8Array(Buffer.from(JSON.stringify(assignmentSettings)));
    return (0, utils_1.writeToFile)(location + path_1.sep + constants_2.SETTING_FILE, buffer, null, 'Failed to save assignment settings!').then(() => {
        return assignmentSettings;
    });
}
function writeAssignmentSettingsFor(assignmentSettings, workspaceName, assignmentName) {
    return (0, workspace_handler_1.getAssignmentDirectory)(workspaceName, assignmentName)
        .then((assignmentDirectory) => writeAssignmentSettingsAt(assignmentSettings, assignmentDirectory));
}
function finalizeAssignment(event, workspaceFolder, location) {
    try {
        return Promise.all([
            (0, config_handler_1.getConfig)(),
            (0, workspace_handler_1.getAssignmentDirectory)(workspaceFolder, location)
        ]).then(([config, assignmentFolder]) => {
            return csvtojson({ noheader: true, trim: false }).fromFile(assignmentFolder + path_1.sep + constants_2.GRADES_FILE).then((gradesJSON) => {
                const files = glob.sync(assignmentFolder + path_1.sep + '/*');
                const promises = files.map((file) => {
                    if ((0, fs_1.statSync)(file).isDirectory()) {
                        const regEx = /(.*)\((.+)\)$/;
                        if (!regEx.test(file)) {
                            return Promise.reject(constants_1.INVALID_STUDENT_FOLDER + ' ' + (0, path_1.basename)(file));
                        }
                        const matches = regEx.exec(file);
                        const submissionFiles = glob.sync(file + path_1.sep + constants_2.SUBMISSION_FOLDER + '/*');
                        const submissionPromisses = submissionFiles.map((submission) => {
                            try {
                                (0, fs_1.accessSync)(submission, fs_1.constants.F_OK);
                                const studentFolder = (0, path_1.dirname)((0, path_1.dirname)(submission));
                                return loadMarksAt(studentFolder).then((submissionInfo) => {
                                    if (submissionInfo.marks.length > 0) {
                                        const ext = path.extname(submission);
                                        let fileName = path.basename(submission, ext);
                                        return (0, marking_annotations_1.annotatePdfFile)(submission, submissionInfo).then((data) => __awaiter(this, void 0, void 0, function* () {
                                            fileName += '_MARK';
                                            (0, fs_1.writeFileSync)(studentFolder + path_1.sep + constants_2.FEEDBACK_FOLDER + path_1.sep + fileName + '.pdf', data.pdfBytes);
                                            (0, fs_1.unlinkSync)(submission);
                                            (0, fs_1.accessSync)(assignmentFolder + path_1.sep + constants_2.GRADES_FILE, fs_1.constants.F_OK);
                                            let changed = false;
                                            let assignmentHeader;
                                            for (let i = 0; i < gradesJSON.length; i++) {
                                                if (i === 0) {
                                                    const gradeKeys = Object.keys(gradesJSON[i]);
                                                    if (gradeKeys.length > 0) {
                                                        assignmentHeader = gradeKeys[0];
                                                    }
                                                }
                                                else if (i > 1 && !(0, utils_1.isNullOrUndefined)(assignmentHeader) && gradesJSON[i] && gradesJSON[i][assignmentHeader].toUpperCase() === matches[2].toUpperCase()) {
                                                    gradesJSON[i].field5 = data.totalMark;
                                                    changed = true;
                                                }
                                            }
                                            if (changed) {
                                                return (0, json_2_csv_1.json2csvAsync)(gradesJSON, { emptyFieldValue: '', prependHeader: false })
                                                    .then(csv => {
                                                    return (0, promises_1.writeFile)(assignmentFolder + path_1.sep + constants_2.GRADES_FILE, csv);
                                                }, () => {
                                                    return Promise.reject('Failed to save marks to ' + constants_2.GRADES_FILE + ' file for student ' + matches[2] + '!');
                                                });
                                            }
                                            else {
                                                return Promise.reject('Failed to save mark');
                                            }
                                        }), (error) => {
                                            return Promise.reject('Error annotating marks to PDF ' + fileName + ' [' + error.message + ']');
                                        });
                                    }
                                });
                            }
                            catch (e) {
                                return Promise.reject(e.message);
                            }
                        });
                        return Promise.all(submissionPromisses);
                    }
                });
                return Promise.all(promises).then(() => {
                    return zipDir((workspaceFolder === constants_2.DEFAULT_WORKSPACE) ? config.defaultPath : config.defaultPath + path_1.sep + workspaceFolder, { filter: (path, stat) => (!(/\.marks\.json|\.settings\.json|\.zip$/.test(path)) && ((path.endsWith(assignmentFolder)) ? true : (path.startsWith((assignmentFolder) + path_1.sep)))) })
                        .then((buffer) => {
                        return buffer;
                    }, (err) => {
                        console.error('Could not export assignment');
                        console.error(err);
                        return Promise.reject('Could not export assignment');
                    });
                });
            }).then((buffer) => {
                return setDateFinalized(assignmentFolder)
                    .then(() => buffer);
            });
        });
    }
    catch (e) {
        return Promise.reject(e.message);
    }
}
exports.finalizeAssignment = finalizeAssignment;
function finalizeAssignmentRubric(event, workspaceFolder, location, rubricName) {
    try {
        return Promise.all([
            (0, config_handler_1.getConfig)(),
            (0, workspace_handler_1.getAssignmentDirectory)(workspaceFolder, location)
        ]).then(([config, assignmentFolder]) => {
            return csvtojson({ noheader: true, trim: false }).fromFile(assignmentFolder + path_1.sep + constants_2.GRADES_FILE).then((gradesJSON) => {
                const files = glob.sync(assignmentFolder + path_1.sep + '/*');
                const assignmentSettingsBuffer = (0, fs_1.readFileSync)(assignmentFolder + path_1.sep + constants_2.SETTING_FILE);
                if (!(0, utils_1.isJson)(assignmentSettingsBuffer)) {
                    return Promise.reject('Invalid assignment settings file!');
                }
                const assignmentSettingsInfo = JSON.parse(assignmentSettingsBuffer.toString());
                const promises = files.map((file) => {
                    if ((0, fs_1.statSync)(file).isDirectory()) {
                        const regEx = /(.*)\((.+)\)$/;
                        if (!regEx.test(file)) {
                            return Promise.reject(constants_1.INVALID_STUDENT_FOLDER + ' ' + (0, path_1.basename)(file));
                        }
                        const matches = regEx.exec(file);
                        const submissionFiles = glob.sync(file + path_1.sep + constants_2.SUBMISSION_FOLDER + '/*');
                        rubricName = rubricName.trim();
                        if ((0, utils_1.isNullOrUndefined)(assignmentSettingsInfo.rubric)) {
                            return Promise.reject('Assignment\'s settings does not contain a rubric!');
                        }
                        else if (assignmentSettingsInfo.rubric.name !== rubricName) {
                            return Promise.reject('Assignment\'s settings rubric does not match provided!');
                        }
                        const submissionPromisses = submissionFiles.map((submission) => {
                            try {
                                (0, fs_1.accessSync)(submission, fs_1.constants.F_OK);
                                const studentFolder = (0, path_1.dirname)((0, path_1.dirname)(submission));
                                return loadMarksAt(studentFolder).then((submissionInfo) => {
                                    if (submissionInfo.marks.length > 0) {
                                        return (0, rubric_annotations_1.annotatePdfRubric)(submission, submissionInfo, assignmentSettingsInfo.rubric).then((data) => {
                                            const ext = path.extname(submission);
                                            const fileName = path.basename(submission, ext) + '_MARK';
                                            (0, fs_1.writeFileSync)(studentFolder + path_1.sep + constants_2.FEEDBACK_FOLDER + path_1.sep + fileName + '.pdf', data.pdfBytes);
                                            (0, fs_1.unlinkSync)(submission);
                                            (0, fs_1.accessSync)(assignmentFolder + path_1.sep + constants_2.GRADES_FILE, fs_1.constants.F_OK);
                                            let changed = false;
                                            let assignmentHeader;
                                            for (let i = 0; i < gradesJSON.length; i++) {
                                                if (i === 0) {
                                                    const gradesKeys = Object.keys(gradesJSON[i]);
                                                    if (gradesKeys.length > 0) {
                                                        assignmentHeader = gradesKeys[0];
                                                    }
                                                }
                                                else if (i > 1 && !(0, utils_1.isNullOrUndefined)(assignmentHeader) && gradesJSON[i] && gradesJSON[i][assignmentHeader].toUpperCase() === matches[2].toUpperCase()) {
                                                    gradesJSON[i].field5 = data.totalMark;
                                                    changed = true;
                                                    break;
                                                }
                                            }
                                            if (changed) {
                                                return (0, json_2_csv_1.json2csvAsync)(gradesJSON, { emptyFieldValue: '', prependHeader: false })
                                                    .then(csv => {
                                                    return (0, promises_1.writeFile)(assignmentFolder + path_1.sep + constants_2.GRADES_FILE, csv);
                                                })
                                                    .catch(() => {
                                                    return Promise.reject('Failed to save marks to ' + constants_2.GRADES_FILE + ' file for student ' + matches[2] + '!');
                                                });
                                            }
                                            else {
                                                return Promise.reject('Failed to save mark');
                                            }
                                        }, (error) => {
                                            return Promise.reject('Error annotating marks to PDF [' + error.message + ']');
                                        });
                                    }
                                });
                            }
                            catch (e) {
                                return Promise.reject(e.message);
                            }
                        });
                        return Promise.all(submissionPromisses);
                    }
                });
                return Promise.all(promises).then(() => {
                    return zipDir((workspaceFolder === constants_2.DEFAULT_WORKSPACE) ? config.defaultPath : config.defaultPath + path_1.sep + workspaceFolder, { filter: (filterPath, stat) => (!(/\.marks\.json|.settings.json|\.zip$/.test(filterPath)) && ((filterPath.endsWith(assignmentFolder)) ? true : (filterPath.startsWith(assignmentFolder + path_1.sep)))) })
                        .then((buffer) => {
                        return buffer;
                    }, (err) => {
                        console.error('Could not export assignment');
                        console.error(err);
                        return Promise.reject('Could not export assignment');
                    });
                });
            }).then((buffer) => {
                return setDateFinalized(assignmentFolder)
                    .then(() => buffer);
            });
        });
    }
    catch (e) {
        return Promise.reject(e.message);
    }
}
exports.finalizeAssignmentRubric = finalizeAssignmentRubric;
function cleanupTemp(tmpDir) {
    try {
        if (tmpDir) {
            (0, fs_1.rmSync)(tmpDir, { recursive: true });
        }
    }
    catch (e) {
        console.error(`An error has occurred while removing the temp folder at ${tmpDir}. Please remove it manually. Error: ${e}`);
    }
}
function shareExport(event, shareRequest) {
    try {
        return (0, workspace_handler_1.getAssignmentDirectory)(shareRequest.workspaceFolder, shareRequest.assignmentName).then((originalAssignmentDirectory) => {
            return csvtojson({
                noheader: true,
                trim: false
            }).fromFile(originalAssignmentDirectory + path_1.sep + constants_2.GRADES_FILE).then((gradesJSON) => {
                let tmpDir;
                // Create a temp directory to construct files to zip
                tmpDir = (0, fs_1.mkdtempSync)(path.join(os.tmpdir(), 'pdfm-'));
                const tempAssignmentDirectory = tmpDir + path_1.sep + shareRequest.assignmentName;
                (0, fs_1.mkdirSync)(tempAssignmentDirectory);
                // Now copy each submission
                shareRequest.submissions.forEach((submission) => {
                    const submissionDirectoryName = submission.directoryName;
                    (0, fs_extra_1.copySync)(originalAssignmentDirectory + path_1.sep + submissionDirectoryName, tempAssignmentDirectory + path_1.sep + submissionDirectoryName);
                });
                const shareGradesJson = [
                    gradesJSON[0],
                    gradesJSON[1],
                    gradesJSON[2],
                ];
                for (let i = 3; i < gradesJSON.length; i++) {
                    const gradesStudentId = gradesJSON[i].field2;
                    const studentPredicate = (student) => student.studentNumber.toUpperCase() === gradesStudentId.toUpperCase();
                    const shouldExport = !(0, lodash_1.isNil)((0, lodash_1.find)(shareRequest.submissions, studentPredicate));
                    if (shouldExport) {
                        shareGradesJson.push(gradesJSON[i]);
                    }
                }
                return (0, json_2_csv_1.json2csvAsync)(shareGradesJson, { emptyFieldValue: '', prependHeader: false })
                    .then(csv => {
                    return (0, promises_1.writeFile)(tempAssignmentDirectory + path_1.sep + constants_2.GRADES_FILE, csv);
                })
                    .then(() => {
                    return zipDir(tmpDir);
                })
                    .then((buffer) => {
                    cleanupTemp(tmpDir);
                    return buffer;
                }, (error) => {
                    cleanupTemp(tmpDir);
                    return Promise.reject(error.message);
                });
            });
        });
    }
    catch (e) {
        console.error(e);
        return Promise.reject('Error trying to export share');
    }
}
exports.shareExport = shareExport;
function updateAssignmentRubric(event, workspaceName, assignmentName, rubricName) {
    return Promise.all([
        (0, rubric_handler_1.findRubric)(rubricName),
        (0, workspace_handler_1.getAssignmentDirectory)(workspaceName, assignmentName)
    ]).then((results) => {
        const rubric = results[0];
        const assignmentDirectory = results[1];
        // Remove all marks files
        const markFiles = glob.sync(assignmentDirectory + path_1.sep + '/**/' + constants_2.MARK_FILE);
        markFiles.forEach(markFile => {
            (0, fs_1.unlinkSync)(markFile);
        });
        return getAssignmentSettingsFor(workspaceName, assignmentName)
            .then((originalSettings) => {
            originalSettings.rubric = rubric;
            return writeAssignmentSettingsFor(originalSettings, workspaceName, assignmentName);
        }).then(() => {
            return (0, utils_1.checkAccess)(assignmentDirectory + path_1.sep + constants_2.GRADES_FILE).then(() => {
                return csvtojson({ noheader: true, trim: false }).fromFile(assignmentDirectory + path_1.sep + constants_2.GRADES_FILE)
                    .then((gradesJSON) => {
                    let changed = false;
                    let assignmentHeader;
                    for (let i = 0; i < gradesJSON.length; i++) {
                        if (i === 0) {
                            const keys = Object.keys(gradesJSON[i]);
                            if (keys.length > 0) {
                                assignmentHeader = keys[0];
                            }
                        }
                        else if (i > 1) {
                            gradesJSON[i].field5 = '';
                            changed = true;
                        }
                    }
                    if (changed) {
                        return (0, json_2_csv_1.json2csvAsync)(gradesJSON, { emptyFieldValue: '', prependHeader: false }).then((csv) => {
                            return (0, utils_1.writeToFile)(assignmentDirectory + path_1.sep + constants_2.GRADES_FILE, csv, 'Successfully saved marks!', 'Failed to save marks to ' + constants_2.GRADES_FILE + ' file!').then(() => {
                                return rubric;
                            });
                        }, (err) => {
                            return Promise.reject('Failed to convert json to csv!');
                        });
                    }
                    else {
                        return Promise.reject('Failed to save mark');
                    }
                }, reason => {
                    return Promise.reject(reason);
                });
            });
        });
    });
}
exports.updateAssignmentRubric = updateAssignmentRubric;
function getPdfFile(event, location) {
    return workspaceRelativePathToAbsolute(location).then((actualPath) => {
        return (0, utils_1.checkAccess)(actualPath).then(() => {
            return (0, promises_1.readFile)(actualPath);
        });
    });
}
exports.getPdfFile = getPdfFile;
/**
 * Convert a workspace relative tree path, to an absolute filesystem path
 * @param relativePath Workspace relative file path
 */
function workspaceRelativePathToAbsolute(relativePath) {
    return (0, config_handler_1.getConfig)().then((config) => {
        if (relativePath.startsWith(constants_2.DEFAULT_WORKSPACE + '/')) {
            relativePath = relativePath.replace(constants_2.DEFAULT_WORKSPACE + '/', '');
        }
        relativePath = relativePath.replace(/\//g, path_1.sep);
        return config.defaultPath + path_1.sep + relativePath;
    });
}
exports.workspaceRelativePathToAbsolute = workspaceRelativePathToAbsolute;


/***/ }),

/***/ "./src-electron/ipc/comment.handler.ts":
/*!*********************************************!*\
  !*** ./src-electron/ipc/comment.handler.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addComment = exports.deleteComment = exports.getComments = exports.updateCommentsFile = void 0;
const promises_1 = __webpack_require__(/*! fs/promises */ "fs/promises");
const config_handler_1 = __webpack_require__(/*! ./config.handler */ "./src-electron/ipc/config.handler.ts");
const constants_1 = __webpack_require__(/*! ../constants */ "./src-electron/constants.ts");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const utils_1 = __webpack_require__(/*! ../utils */ "./src-electron/utils.ts");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
function ensureCommentsFile() {
    return (0, config_handler_1.ensureConfigDirectory)()
        .then((configDirectory) => {
        if ((0, fs_1.existsSync)(configDirectory + constants_1.COMMENTS_FILE)) {
            return configDirectory + constants_1.COMMENTS_FILE;
        }
        else {
            return (0, promises_1.writeFile)(configDirectory + constants_1.COMMENTS_FILE, '[]')
                .then(() => configDirectory + constants_1.COMMENTS_FILE);
        }
    });
}
function updateCommentsFile(comments) {
    return ensureCommentsFile().then((commentsFilePath) => {
        return (0, promises_1.writeFile)(commentsFilePath, JSON.stringify(comments));
    })
        .then(() => comments, () => Promise.reject(constants_1.COULD_NOT_READ_COMMENT_LIST));
}
exports.updateCommentsFile = updateCommentsFile;
function getComments() {
    return ensureCommentsFile().then((commentsFilePath) => {
        return (0, promises_1.readFile)(commentsFilePath).then((data) => {
            if (!(0, utils_1.isJson)(data)) {
                return Promise.reject(constants_1.COULD_NOT_READ_COMMENT_LIST);
            }
            return getCommentsDetails(JSON.parse(data.toString()));
        });
    });
}
exports.getComments = getComments;
function deleteComment(event, commentId) {
    return getComments().then((comments) => {
        let indexFound = -1;
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].id === commentId) {
                indexFound = i;
                break;
            }
        }
        if (indexFound === -1) {
            return Promise.reject('Could not find comment');
        }
        comments.splice(indexFound, 1);
        const newComments = getCommentsDetails(comments);
        return updateCommentsFile(newComments);
    });
}
exports.deleteComment = deleteComment;
function addComment(event, commentText) {
    return getComments().then(comments => {
        comments.push({
            id: (0, crypto_1.randomUUID)(),
            inUse: false,
            title: commentText
        });
        return updateCommentsFile(comments);
    });
}
exports.addComment = addComment;
function getCommentsDetails(comments) {
    const commentNames = [];
    if (Array.isArray(comments)) {
        comments.forEach(comment => {
            const commentName = {
                id: '' + comment.id,
                title: comment.title,
                inUse: comment.inUse
            };
            commentNames.push(commentName);
        });
        return commentNames;
    }
    return commentNames;
}


/***/ }),

/***/ "./src-electron/ipc/config.handler.ts":
/*!********************************************!*\
  !*** ./src-electron/ipc/config.handler.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateConfigFile = exports.updateConfig = exports.getConfig = exports.ensureConfigDirectory = void 0;
const promises_1 = __webpack_require__(/*! fs/promises */ "fs/promises");
const constants_1 = __webpack_require__(/*! ../constants */ "./src-electron/constants.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src-electron/utils.ts");
const fs_1 = __webpack_require__(/*! fs */ "fs");
function ensureConfigDirectory() {
    if (!(0, fs_1.existsSync)(constants_1.CONFIG_DIR)) {
        return (0, promises_1.mkdir)(constants_1.CONFIG_DIR)
            .then(() => ensureConfigFile())
            .then(() => constants_1.CONFIG_DIR);
    }
    else {
        return ensureConfigFile().then(() => constants_1.CONFIG_DIR);
    }
}
exports.ensureConfigDirectory = ensureConfigDirectory;
function ensureConfigFile() {
    if ((0, fs_1.existsSync)(constants_1.CONFIG_DIR + constants_1.CONFIG_FILE)) {
        return Promise.resolve(constants_1.CONFIG_DIR + constants_1.CONFIG_FILE);
    }
    else {
        return (0, promises_1.writeFile)(constants_1.CONFIG_DIR + constants_1.CONFIG_FILE, '{}')
            .then(() => constants_1.CONFIG_DIR + constants_1.CONFIG_FILE);
    }
}
function getConfig() {
    return ensureConfigDirectory().then(() => {
        return (0, promises_1.readFile)(constants_1.CONFIG_DIR + constants_1.CONFIG_FILE).then((data) => {
            if (!(0, utils_1.isJson)(data)) {
                return Promise.reject(`Corrupt configuration files at "${constants_1.CONFIG_DIR}${constants_1.CONFIG_FILE}"`);
            }
            return JSON.parse(data.toString());
        });
    });
}
exports.getConfig = getConfig;
function updateConfig(event, config) {
    return updateConfigFile(config);
}
exports.updateConfig = updateConfig;
function updateConfigFile(config) {
    return ensureConfigDirectory().then(() => {
        return (0, promises_1.writeFile)(constants_1.CONFIG_DIR + constants_1.CONFIG_FILE, JSON.stringify(config))
            .then(() => config);
    });
}
exports.updateConfigFile = updateConfigFile;


/***/ }),

/***/ "./src-electron/ipc/import.handler.ts":
/*!********************************************!*\
  !*** ./src-electron/ipc/import.handler.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateZipFile = exports.getZipEntries = exports.importZip = void 0;
const fs_1 = __webpack_require__(/*! fs */ "fs");
const glob = __importStar(__webpack_require__(/*! glob */ "glob"));
const path_1 = __webpack_require__(/*! path */ "path");
const lodash_1 = __webpack_require__(/*! lodash */ "lodash");
const promises_1 = __webpack_require__(/*! fs/promises */ "fs/promises");
const rubric_handler_1 = __webpack_require__(/*! ./rubric.handler */ "./src-electron/ipc/rubric.handler.ts");
const constants_1 = __webpack_require__(/*! ../constants */ "./src-electron/constants.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./src-electron/utils.ts");
const jszip_1 = __importDefault(__webpack_require__(/*! jszip */ "jszip"));
const workspace_handler_1 = __webpack_require__(/*! ./workspace.handler */ "./src-electron/ipc/workspace.handler.ts");
const sakai_constants_1 = __webpack_require__(/*! @shared/constants/sakai.constants */ "./src/shared/constants/sakai.constants.ts");
const workspace_1 = __webpack_require__(/*! @shared/info-objects/workspace */ "./src/shared/info-objects/workspace.ts");
function existingFolders(workspace) {
    return (0, workspace_handler_1.getWorkingDirectory)(workspace).then((workingDirectory) => {
        const fileListing = glob.sync(workingDirectory + '/*');
        const folders = [];
        fileListing.forEach(folder => {
            if ((0, utils_1.isFolder)(folder)) {
                folders.push((0, path_1.basename)(folder));
            }
        });
        return folders;
    });
}
function importZip(event, req) {
    if ((0, lodash_1.isNil)(req.file)) {
        return Promise.reject('No file selected!');
    }
    let rubricName;
    if (!req.noRubric) {
        if ((0, lodash_1.isNil)(req.rubricName)) {
            return Promise.reject(constants_1.NOT_PROVIDED_RUBRIC);
        }
        else {
            rubricName = req.rubricName.trim();
        }
    }
    return Promise.all([
        existingFolders(req.workspace),
        (0, promises_1.readFile)(req.file),
        (0, rubric_handler_1.getRubrics)()
    ]).then((results) => {
        const folders = results[0];
        const zipFile = results[1];
        const rubrics = results[2];
        const rubricIndex = rubrics.findIndex(r => r.name === rubricName);
        return new jszip_1.default().loadAsync(zipFile)
            .then((zipObject) => __awaiter(this, void 0, void 0, function* () {
            let entry = '';
            zipObject.forEach((relativePath, zipEntry) => {
                if (entry === '') {
                    entry = zipEntry.name;
                }
            });
            const entryPath = entry.split('/');
            if (entryPath.length > 0) {
                const oldPath = entryPath[0];
                let foundCount = 0;
                for (let i = 0; i < folders.length; i++) {
                    if (oldPath.toLowerCase() === folders[i].toLowerCase()) {
                        foundCount++;
                    }
                    else if ((oldPath.toLowerCase() + ' (' + (foundCount + 1) + ')') === folders[i].toLowerCase()) {
                        foundCount++;
                    }
                }
                let newFolder = '';
                // Default settings for the new assignment
                const settings = { defaultColour: '#3b487d', rubric: rubrics[rubricIndex], isCreated: false };
                // By default the zip wil contain the name of the assignment directory
                let assignmentDirectoryName = oldPath;
                let renameOld = '';
                if (foundCount !== 0) {
                    // If existing assignment directory exists, setup renames to extract the file
                    assignmentDirectoryName = oldPath + ' (' + (foundCount + 1) + ')';
                    newFolder = oldPath + ' (' + (foundCount + 1) + ')' + '/';
                    renameOld = oldPath + '/';
                }
                return (0, workspace_handler_1.getWorkingDirectory)(req.workspace).then((workingDirectory) => {
                    return (0, utils_1.extractAssignmentZipFile)(req.file, workingDirectory + path_1.sep, newFolder, renameOld, req.assignmentName, req.assignmentType).then(() => {
                        return (0, workspace_handler_1.writeAssignmentSettings)(req.workspace, assignmentDirectoryName, settings).then(() => {
                            if (!(0, lodash_1.isNil)(rubricName)) {
                                rubrics[rubricIndex].inUse = true;
                                return (0, rubric_handler_1.writeRubricFile)(rubrics).then(() => {
                                    return constants_1.EXTRACTED_ZIP;
                                }, () => {
                                    return Promise.reject(constants_1.EXTRACTED_ZIP_BUT_FAILED_TO_WRITE_TO_RUBRIC);
                                });
                            }
                            return constants_1.EXTRACTED_ZIP;
                        });
                    }).catch((error) => {
                        if ((0, fs_1.existsSync)(workingDirectory + path_1.sep + newFolder)) {
                            (0, utils_1.deleteFolderRecursive)(workingDirectory + path_1.sep + newFolder);
                        }
                        return Promise.reject(error.message);
                    });
                });
            }
            else {
                return Promise.reject('Zip Object contains no entries!');
            }
        }))
            .catch(error => {
            return Promise.reject(error.message);
        });
    });
}
exports.importZip = importZip;
function getZipEntries(event, file) {
    return (0, promises_1.readFile)(file).then((data) => {
        return new jszip_1.default().loadAsync(data)
            .then((zip) => {
            const treeNodes = [];
            zip.forEach((relativePath, zipEntry) => {
                if (!zipEntry.dir) {
                    let nodes = treeNodes;
                    const splits = zipEntry.name.split('/');
                    splits.forEach((item, index) => {
                        let node = (0, workspace_1.findTreeNode)(item, nodes);
                        if ((0, lodash_1.isNil)(node)) {
                            node = {
                                name: item,
                                type: (index + 1) < splits.length ? workspace_1.TreeNodeType.ASSIGNMENT : workspace_1.TreeNodeType.FILE,
                                children: [],
                                dateModified: zipEntry.date,
                                parent: null // Do we need parent nodes for zips?
                            };
                            nodes.push(node);
                        }
                        nodes = node.children;
                    });
                }
            });
            return treeNodes;
        });
    })
        .catch((e) => Promise.reject(e));
}
exports.getZipEntries = getZipEntries;
function validateZipFile(event, file, format) {
    if (format === 'Assignment') {
        return validateZipAssignmentFile(file);
    }
    else {
        return validateGenericZip(file);
    }
}
exports.validateZipFile = validateZipFile;
function readZipFile(file) {
    return (0, promises_1.readFile)(file)
        .then(data => new jszip_1.default().loadAsync(data))
        .catch(() => Promise.reject('Error trying to decipher zip file format validity!'));
}
function validateZipAssignmentFile(file) {
    return readZipFile(file).then((zip) => {
        const filePaths = Object.keys(zip.files);
        const fileNames = sakai_constants_1.SakaiConstants.assignmentRootFiles;
        for (const filePath of filePaths) {
            const path = filePath.split('/');
            if (path[1] !== undefined && fileNames.indexOf(path[1]) !== -1) {
                return true;
            }
        }
        // Could not find at least on sakai file
        return Promise.reject(sakai_constants_1.SakaiConstants.formatErrorMessage);
    });
}
function validateGenericZip(file) {
    return readZipFile(file).then((zip) => {
        const filePaths = Object.keys(zip.files).sort();
        const sakaiFileNames = sakai_constants_1.SakaiConstants.assignmentRootFiles;
        for (const filePath of filePaths) {
            const path = filePath.split('/');
            // Check if it is a sakai file
            if (path[1] !== undefined && sakaiFileNames.indexOf(path[1]) !== -1) {
                return Promise.reject('Invalid zip format. Please select a file in the generic import format');
            }
            if (path.length > 2) {
                // Too many nested directories
                return Promise.reject('Invalid zip format. Please select a file in the generic import format');
            }
            // Check if the file is a directory
        }
    });
}


/***/ }),

/***/ "./src-electron/ipc/rubric.handler.ts":
/*!********************************************!*\
  !*** ./src-electron/ipc/rubric.handler.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRubric = exports.findRubric = exports.deleteRubric = exports.deleteRubricCheck = exports.getRubricNames = exports.writeRubricFile = exports.rubricUpload = exports.getRubrics = exports.selectRubricFile = void 0;
const electron_1 = __webpack_require__(/*! electron */ "electron");
const utils_1 = __webpack_require__(/*! ../utils */ "./src-electron/utils.ts");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const promises_1 = __webpack_require__(/*! fs/promises */ "fs/promises");
const lodash_1 = __webpack_require__(/*! lodash */ "lodash");
const path_1 = __webpack_require__(/*! path */ "path");
const constants_1 = __webpack_require__(/*! ../constants */ "./src-electron/constants.ts");
const glob = __importStar(__webpack_require__(/*! glob */ "glob"));
const config_handler_1 = __webpack_require__(/*! ./config.handler */ "./src-electron/ipc/config.handler.ts");
const constants_2 = __webpack_require__(/*! @shared/constants/constants */ "./src/shared/constants/constants.ts");
const excelParser = new ((__webpack_require__(/*! simple-excel-to-json */ "simple-excel-to-json").XlsParser))();
function selectRubricFile() {
    return electron_1.dialog.showOpenDialog(electron_1.BrowserWindow.getFocusedWindow(), {
        title: 'Select File',
        filters: [
            { name: 'Custom Files', extensions: ['xlsx', 'xls'] }
        ],
        properties: ['openFile']
    }).then((data) => {
        if (data.canceled) {
            return Promise.reject();
        }
        else {
            try {
                const doc = excelParser.parseXls2Json(data.filePaths[0], { isNested: true });
                const docInJSON = doc[0] || [];
                if (docInJSON.length === 0) {
                    return Promise.reject(`No criteria(s) provided`);
                }
                else {
                    let rowCount = 4;
                    const levelCount = 6;
                    let errorMessage;
                    let errorFound;
                    let validLevelLength = 0;
                    const startMessagePrefix = `Error[row = `;
                    const startMessageSuffix = `]: `;
                    const notProvided = `is not provided`;
                    const ext = (0, path_1.extname)(data.filePaths[0]);
                    const fileName = (0, path_1.basename)(data.filePaths[0], ext);
                    const rubric = {
                        criterias: [],
                        name: fileName
                    };
                    for (let index = 0; index < docInJSON.length; index++) {
                        if (index > 1) {
                            const criteriaData = docInJSON[index];
                            errorMessage = '';
                            errorFound = false;
                            if ((0, utils_1.isBlank)(criteriaData.Criterion_name)) {
                                errorMessage = (0, utils_1.joinError)(errorMessage, `Criteria name ${notProvided}`);
                                errorFound = true;
                            }
                            if ((0, utils_1.isBlank)(criteriaData.Criterion_description)) {
                                errorMessage = (0, utils_1.joinError)(errorMessage, `Criteria description ${notProvided}`);
                                errorFound = true;
                            }
                            if (errorFound && index === 2) {
                                return Promise.reject(errorMessage);
                            }
                            else if (errorFound) {
                                return { selectedPath: data.filePaths[0], rubric: rubric };
                            }
                            const levels = [];
                            for (let i = 1; ((validLevelLength === 0) ? levelCount : validLevelLength); i++) {
                                const achievementMark = 'Achievement_level_' + i + '_mark';
                                const achievementFeedback = 'Achievement_level_' + i + '_feedback';
                                const achievementTitle = 'Achievement_level_' + i + '_title';
                                if ((0, utils_1.isBlank)(criteriaData[achievementMark])) {
                                    errorMessage = (0, utils_1.joinError)(errorMessage, `${startMessagePrefix}${rowCount}${startMessageSuffix}${achievementMark} ${notProvided}`);
                                    errorFound = true;
                                }
                                if (isNaN(criteriaData[achievementMark])) {
                                    errorMessage = (0, utils_1.joinError)(errorMessage, `${startMessagePrefix}${rowCount}${startMessageSuffix}${achievementMark} is not a valid number`);
                                    errorFound = true;
                                }
                                criteriaData[achievementMark] = parseInt('' + criteriaData[achievementMark], 10);
                                if ((0, utils_1.isBlank)(criteriaData[achievementTitle])) {
                                    errorMessage = (0, utils_1.joinError)(errorMessage, `${startMessagePrefix}${rowCount}${startMessageSuffix}${achievementTitle} ${notProvided}`);
                                    errorFound = true;
                                }
                                if ((0, utils_1.isBlank)(criteriaData[achievementFeedback])) {
                                    errorMessage = (0, utils_1.joinError)(errorMessage, `${startMessagePrefix}${rowCount}${startMessageSuffix}${achievementFeedback} ${notProvided}`);
                                    errorFound = true;
                                }
                                if (errorFound && i === 1) {
                                    return Promise.reject(errorMessage);
                                }
                                else if (errorFound && i > 1) {
                                    if (index === 2) {
                                        validLevelLength = i - 1;
                                    }
                                    break;
                                }
                                else if ((index === 2) && (i === levelCount)) {
                                    validLevelLength = levelCount;
                                }
                                levels[i - 1] = {
                                    score: criteriaData[achievementMark],
                                    description: criteriaData[achievementFeedback].trim(),
                                    label: criteriaData[achievementTitle].trim()
                                };
                            }
                            if (index !== 2 && levels.length !== validLevelLength) {
                                errorMessage = (0, utils_1.joinError)(errorMessage, `${startMessagePrefix}${rowCount}${startMessageSuffix} The provided number of achievement levels do not match first row achievement levels`);
                                return Promise.reject(errorMessage);
                            }
                            rubric.criterias.push({
                                description: criteriaData.Criterion_description,
                                name: criteriaData.Criterion_name,
                                levels
                            });
                            rowCount++;
                        }
                    }
                    if (rubric.criterias.length === 0) {
                        return Promise.reject(`No criteria(s) provided`);
                    }
                    else {
                        return { selectedPath: data.filePaths[0], rubric: rubric };
                    }
                }
            }
            catch (reason) {
                return Promise.reject(reason);
            }
        }
    }, reason => {
        return Promise.reject(reason);
    });
}
exports.selectRubricFile = selectRubricFile;
function getRubrics() {
    if ((0, fs_1.existsSync)(constants_1.CONFIG_DIR + constants_1.RUBRICS_FILE)) {
        return (0, promises_1.readFile)(constants_1.CONFIG_DIR + constants_1.RUBRICS_FILE).then((data) => {
            if (!(0, utils_1.isJson)(data)) {
                return Promise.reject(constants_1.INVALID_RUBRIC_JSON_FILE);
            }
            const rubrics = JSON.parse(data.toString());
            if (!Array.isArray(rubrics)) {
                Promise.reject(constants_1.COULD_NOT_READ_RUBRIC_LIST);
            }
            return rubrics;
        }, (error) => {
            return Promise.reject('Failed to read file containing list of rubrics!');
        });
    }
    else {
        return Promise.resolve([]);
    }
}
exports.getRubrics = getRubrics;
function rubricUpload(event, rubric) {
    return getRubrics().then((rubrics) => {
        let foundCount = 0;
        const clonedRubrics = [...rubrics];
        clonedRubrics.sort((a, b) => (a.name > b.name) ? 1 : -1);
        for (let i = 0; i < clonedRubrics.length; i++) {
            if (clonedRubrics[i].name.toLowerCase() === rubric.name.toLowerCase()) {
                foundCount++;
            }
            else if (clonedRubrics[i].name.toLowerCase() === (rubric.name.toLowerCase() + ' (' + (foundCount + 1) + ')')) {
                foundCount++;
            }
        }
        if (foundCount !== 0) {
            rubric.name = rubric.name + ' (' + (foundCount + 1) + ')';
        }
        rubrics.unshift(rubric);
        return writeRubricFile(rubrics)
            .then(r => toRubricNames(r));
    });
}
exports.rubricUpload = rubricUpload;
function writeRubricFile(rubricData) {
    let promise = Promise.resolve();
    if (!(0, fs_1.existsSync)(constants_1.CONFIG_DIR)) {
        promise = (0, promises_1.mkdir)(constants_1.CONFIG_DIR).then(lodash_1.noop, err => {
            return Promise.reject(constants_1.COULD_NOT_CREATE_CONFIG_DIRECTORY);
        });
    }
    return promise.then(() => {
        return (0, promises_1.writeFile)(constants_1.CONFIG_DIR + constants_1.RUBRICS_FILE, JSON.stringify(rubricData));
    }).then(() => rubricData, (err) => {
        return Promise.reject(constants_1.COULD_NOT_CREATE_RUBRIC_FILE);
    });
}
exports.writeRubricFile = writeRubricFile;
function toRubricNames(rubrics) {
    const rubricNames = [];
    if (Array.isArray(rubrics)) {
        rubrics.forEach(rubric => {
            const rubricName = { name: rubric.name, inUse: (rubric.inUse) ? rubric.inUse : false };
            rubricNames.push(rubricName);
        });
        return Promise.resolve(rubricNames);
    }
    return writeRubricFile([]);
}
function getRubricNames() {
    return getRubrics().then((rubrics) => toRubricNames(rubrics));
}
exports.getRubricNames = getRubricNames;
function deleteRubricCheck(event, rubricName) {
    rubricName = rubricName.trim();
    return (0, config_handler_1.getConfig)().then((config) => {
        try {
            const folders = glob.sync(config.defaultPath + path_1.sep + '*');
            let found = false;
            folders.forEach(folder => {
                const settingFileContents = (0, fs_1.existsSync)(folder + path_1.sep + constants_2.SETTING_FILE) ? (0, fs_1.readFileSync)(folder + path_1.sep + constants_2.SETTING_FILE) : null;
                if (settingFileContents != null) {
                    if (!(0, utils_1.isJson)(settingFileContents)) {
                        return Promise.reject(constants_1.NOT_CONFIGURED_CONFIG_DIRECTORY);
                    }
                    const settings = JSON.parse(settingFileContents.toString());
                    if (settings.rubric && settings.rubric.name.toLowerCase() === rubricName.toLowerCase()) {
                        found = true;
                    }
                }
            });
            return found;
        }
        catch (e) {
            return Promise.reject(e.message);
        }
    });
}
exports.deleteRubricCheck = deleteRubricCheck;
function deleteRubric(event, rubricName) {
    rubricName = rubricName.trim();
    return getRubrics().then((rubrics) => {
        let indexFound = -1;
        for (let i = 0; i < rubrics.length; i++) {
            if (rubrics[i].name.toLowerCase() === rubricName.toLowerCase()) {
                indexFound = i;
                break;
            }
        }
        if (indexFound === -1) {
            return Promise.reject('Could not find rubric');
        }
        else {
            rubrics.splice(indexFound, 1);
        }
        return writeRubricFile(rubrics);
    });
}
exports.deleteRubric = deleteRubric;
function findRubric(rubricName) {
    return getRubrics().then((rubrics) => {
        const rubric = rubrics.find(r => r.name.toLowerCase() === rubricName.toLowerCase());
        if ((0, lodash_1.isNil)(rubric)) {
            return Promise.reject('Could not find rubric');
        }
        return rubric;
    });
}
exports.findRubric = findRubric;
function getRubric(event, rubricName) {
    return findRubric(rubricName);
}
exports.getRubric = getRubric;


/***/ }),

/***/ "./src-electron/ipc/update.handler.ts":
/*!********************************************!*\
  !*** ./src-electron/ipc/update.handler.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.downloadUpdate = exports.checkForUpdates = void 0;
const electron_updater_1 = __webpack_require__(/*! electron-updater */ "electron-updater");
const lodash_1 = __webpack_require__(/*! lodash */ "lodash");
let latestUpdate = null;
function checkForUpdates() {
    if (!electron_updater_1.autoUpdater.isUpdaterActive()) {
        return Promise.resolve(null);
    }
    return electron_updater_1.autoUpdater.checkForUpdates().then((update) => {
        latestUpdate = update;
        const canSkip = electron_updater_1.autoUpdater.allowPrerelease;
        return Object.assign(Object.assign({}, update), { canSkip // Only if pre-releases are enabled can it be skipped
         });
    });
}
exports.checkForUpdates = checkForUpdates;
function downloadUpdate() {
    if ((0, lodash_1.isNil)(latestUpdate)) {
        return Promise.reject('No update available');
    }
    return electron_updater_1.autoUpdater.downloadUpdate(latestUpdate.cancellationToken).then(() => {
        return latestUpdate.updateInfo;
    });
}
exports.downloadUpdate = downloadUpdate;


/***/ }),

/***/ "./src-electron/ipc/workspace.handler.ts":
/*!***********************************************!*\
  !*** ./src-electron/ipc/workspace.handler.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteWorkspaceCheck = exports.deleteWorkspace = exports.getWorkspaces = exports.moveWorkspaceAssignments = exports.updateWorkspaceName = exports.createWorkingFolder = exports.writeAssignmentSettings = exports.getAssignmentDirectory = exports.getWorkingDirectory = void 0;
const lodash_1 = __webpack_require__(/*! lodash */ "lodash");
const config_handler_1 = __webpack_require__(/*! ./config.handler */ "./src-electron/ipc/config.handler.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const promises_1 = __webpack_require__(/*! fs/promises */ "fs/promises");
const constants_1 = __webpack_require__(/*! ../constants */ "./src-electron/constants.ts");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const electron_1 = __webpack_require__(/*! electron */ "electron");
const fs_extra_1 = __webpack_require__(/*! fs-extra */ "fs-extra");
const constants_2 = __webpack_require__(/*! @shared/constants/constants */ "./src/shared/constants/constants.ts");
function getWorkingDirectory(workspaceName) {
    return (0, config_handler_1.getConfig)().then((config) => {
        if (workspaceName === constants_2.DEFAULT_WORKSPACE || (0, lodash_1.isNil)(workspaceName)) {
            return config.defaultPath;
        }
        else {
            return config.defaultPath + path_1.sep + workspaceName;
        }
    });
}
exports.getWorkingDirectory = getWorkingDirectory;
function getAssignmentDirectory(workspaceName, assignmentName) {
    return getWorkingDirectory(workspaceName).then((workingDirectory) => {
        return workingDirectory + path_1.sep + assignmentName;
    });
}
exports.getAssignmentDirectory = getAssignmentDirectory;
function writeAssignmentSettings(workspaceName, assignmentName, settings) {
    return getAssignmentDirectory(workspaceName, assignmentName).then((workingDirectory) => {
        return (0, promises_1.writeFile)(workingDirectory + path_1.sep + constants_2.SETTING_FILE, JSON.stringify(settings));
    }).then(() => settings);
}
exports.writeAssignmentSettings = writeAssignmentSettings;
function createWorkingFolder(event, workFolderName) {
    return (0, config_handler_1.getConfig)().then((config) => {
        const fullPath = config.defaultPath + path_1.sep + workFolderName;
        if (!(0, fs_1.existsSync)(fullPath)) {
            (0, fs_1.mkdirSync)(fullPath);
        }
        else {
            return Promise.reject('Folder with name \'' + workFolderName + '\' already exists.');
        }
        if ((0, lodash_1.isNil)(config.folders)) {
            config.folders = [];
        }
        config.folders.push(fullPath);
        return (0, config_handler_1.updateConfigFile)(config).then(() => fullPath);
    });
}
exports.createWorkingFolder = createWorkingFolder;
function updateWorkspaceName(event, workspaceName, newWorkspaceName) {
    return (0, config_handler_1.getConfig)().then((config) => {
        const folders = config.folders;
        const currPath = config.defaultPath + path_1.sep + workspaceName;
        const newPath = config.defaultPath + path_1.sep + newWorkspaceName;
        if ((0, fs_1.existsSync)(newPath)) {
            return Promise.reject('Folder name already exists.');
        }
        try {
            (0, fs_1.renameSync)(currPath, newPath);
            const foundIndex = folders.findIndex(x => x === currPath);
            folders[foundIndex] = newPath;
            config.folders = folders;
            (0, fs_1.writeFileSync)(constants_1.CONFIG_DIR + constants_1.CONFIG_FILE, JSON.stringify(config));
            return newPath;
        }
        catch (e) {
            return Promise.reject(e.message);
        }
    });
}
exports.updateWorkspaceName = updateWorkspaceName;
function moveWorkspaceAssignments(event, currentWorkspaceName, workspaceName, assignments = []) {
    return (0, config_handler_1.getConfig)().then((config) => {
        const currentDirectory = currentWorkspaceName.replace(/\//g, path_1.sep);
        const newDirectory = workspaceName.replace(/\//g, path_1.sep);
        const currentIsDefault = currentWorkspaceName === constants_2.DEFAULT_WORKSPACE;
        const newIsDefault = workspaceName === constants_2.DEFAULT_WORKSPACE;
        const workspacePath = currentIsDefault ? config.defaultPath : config.defaultPath + path_1.sep + currentDirectory;
        const newWorkspacePath = newIsDefault ? config.defaultPath : config.defaultPath + path_1.sep + newDirectory;
        let error = null;
        (0, lodash_1.forEach)(assignments, (assignment) => {
            const assignmentPath = workspacePath + path_1.sep + assignment.assignmentTitle;
            const newAssignmentPath = newWorkspacePath + path_1.sep + assignment.assignmentTitle;
            if (!(0, fs_1.existsSync)(newAssignmentPath)) {
                try {
                    (0, fs_extra_1.moveSync)(assignmentPath, newAssignmentPath);
                }
                catch (e) {
                    error = e.message;
                    return false; // Stop looping
                }
            }
            else {
                error = 'Assignment with the same name already exists.';
                return false; // Stop looping
            }
        });
        if (!error) {
            return 'Successfully renamed the directory.';
        }
        else {
            return Promise.reject(error);
        }
    });
}
exports.moveWorkspaceAssignments = moveWorkspaceAssignments;
function getWorkspaces() {
    return (0, config_handler_1.getConfig)().then((config) => {
        return [constants_2.DEFAULT_WORKSPACE].concat(config.folders || []);
    });
}
exports.getWorkspaces = getWorkspaces;
function deleteWorkspace(event, deleteFolder) {
    return (0, config_handler_1.getConfig)().then((config) => {
        const folders = config.folders;
        const workspaceNames = folders.map(item => {
            return (0, path_1.basename)(item);
        });
        if (Array.isArray(workspaceNames)) {
            let indexFound = -1;
            for (let i = 0; i < workspaceNames.length; i++) {
                if (workspaceNames[i].toUpperCase() === deleteFolder.toUpperCase()) {
                    indexFound = i;
                    break;
                }
            }
            if (indexFound === -1) {
                return Promise.reject('Could not find folder ' + deleteFolder);
            }
            let promise = Promise.resolve();
            if ((0, fs_1.existsSync)(folders[indexFound])) {
                try {
                    promise = electron_1.shell.trashItem(folders[indexFound]);
                }
                catch (e) {
                    return Promise.reject(e);
                }
            }
            return promise.then(() => {
                folders.splice(indexFound, 1);
                config.folders = folders;
            })
                .then(() => (0, config_handler_1.updateConfigFile)(config))
                .then(() => folders);
        }
        return Promise.resolve([]);
    });
}
exports.deleteWorkspace = deleteWorkspace;
function deleteWorkspaceCheck(event, deleteFolder) {
    let found = false;
    let hasAssignments = false;
    return (0, config_handler_1.getConfig)().then((config) => {
        const workspaces = config.folders;
        const workspaceNames = workspaces.map(item => {
            return (0, path_1.basename)(item);
        });
        const currPath = config.defaultPath + path_1.sep + deleteFolder;
        try {
            for (let i = 0; i < workspaceNames.length; i++) {
                if (workspaceNames[i].toUpperCase() === deleteFolder.toUpperCase()) {
                    found = true;
                    break;
                }
            }
            // Check if there are assignments in folder
            if (found) {
                if ((0, fs_1.existsSync)(currPath)) {
                    const folders = (0, fs_1.readdirSync)(currPath);
                    if (folders.length > 0) {
                        hasAssignments = true;
                    }
                }
            }
            return hasAssignments;
        }
        catch (e) {
            return Promise.reject(e.message);
        }
    });
}
exports.deleteWorkspaceCheck = deleteWorkspaceCheck;


/***/ }),

/***/ "./src-electron/pdf/marking-annotations.ts":
/*!*************************************************!*\
  !*** ./src-electron/pdf/marking-annotations.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.annotatePdfFile = void 0;
const annotpdf_1 = __webpack_require__(/*! annotpdf */ "annotpdf");
const pdf_lib_1 = __webpack_require__(/*! pdf-lib */ "pdf-lib");
const icon_type_enum_1 = __webpack_require__(/*! @shared/info-objects/icon-type.enum */ "./src/shared/info-objects/icon-type.enum.ts");
const constants_1 = __webpack_require__(/*! ../constants */ "./src-electron/constants.ts");
const icon_svg_enum_1 = __webpack_require__(/*! @shared/info-objects/icon-svg.enum */ "./src/shared/info-objects/icon-svg.enum.ts");
const pdf_utils_1 = __webpack_require__(/*! ./pdf-utils */ "./src-electron/pdf/pdf-utils.ts");
const promises_1 = __webpack_require__(/*! fs/promises */ "fs/promises");
const lodash_1 = __webpack_require__(/*! lodash */ "lodash");
const getRgbScale = (rgbValue) => {
    return +parseFloat(((rgbValue / 255) + '')).toFixed(2);
};
const COORD_CONSTANT = 72 / 96;
const HIGHLIGHT_HEIGHT = constants_1.HIGHLIGHT_HEIGHT * COORD_CONSTANT;
const CIRCLE_DIAMETER = (37 * COORD_CONSTANT);
const CIRCLE_SIZE = CIRCLE_DIAMETER / 2;
const TEXT_ANNOTATION_SIZE = 20 * COORD_CONSTANT;
const MARK_FONT_SIZE = 12;
function rotatePages(session, submissionInfo) {
    return pdf_lib_1.PDFDocument.load(session.data).then((pdfDoc) => {
        pdfDoc.getPages().forEach((p, index) => {
            const pageSettings = submissionInfo.pageSettings[index];
            if (pageSettings && pageSettings.rotation) {
                p.setRotation({
                    type: pdf_lib_1.RotationTypes.Degrees,
                    angle: pageSettings.rotation
                });
            }
            else if (p.getRotation().type === pdf_lib_1.RotationTypes.Radians) {
                // Convert radians to degrees
                p.setRotation({
                    type: pdf_lib_1.RotationTypes.Degrees,
                    angle: p.getRotation().angle * (180 / Math.PI)
                });
            }
        });
        return pdfDoc.save();
    }).then((data) => {
        session.data = data;
        return session;
    });
}
function rotateCoord(coord, offsetX, offsetY, angle, pageWidth, pageHeight) {
    if (angle === 90) {
        return Object.assign(Object.assign({}, coord), { x: coord.y - offsetY, y: coord.x + offsetX });
    }
    else if (angle === 180) {
        return Object.assign(Object.assign({}, coord), { x: pageWidth - coord.x - offsetX, y: coord.y - offsetY });
    }
    else if (angle === 270) {
        return Object.assign(Object.assign({}, coord), { x: pageWidth - (coord.y - offsetY), y: pageHeight - (coord.x + offsetX) });
    }
    else {
        return Object.assign(Object.assign({}, coord), { x: coord.x + offsetX, y: pageHeight - coord.y + offsetY });
    }
}
function rotateBox(x, y, w, h, offsetX, offsetY, angle, pageWidth, pageHeight) {
    if (angle === 90) {
        return [
            /*x1 */ y - offsetY,
            /*y1 */ x + offsetX,
            /*x2 */ y + h - offsetY,
            /*y2 */ x + w + offsetX,
        ];
    }
    else if (angle === 180) {
        return [
            /*x1 */ pageWidth - x - w - offsetX,
            /*y1 */ y - offsetY,
            /*x2 */ pageWidth - x - offsetX,
            /*y2 */ y + h - offsetY // Down
        ];
    }
    else if (angle === 270) {
        return [
            /*x1 */ pageWidth - (y - offsetY),
            /*y1 */ pageHeight - (x + offsetX),
            /*x2 */ pageWidth - (y + h - offsetY),
            /*y2 */ pageHeight - (x + w + offsetX),
        ];
    }
    else {
        return [
            /*x1 */ x + offsetX,
            /*y1 */ pageHeight - y - h + offsetY,
            /*x2 */ x + w + offsetX,
            /*y2 */ pageHeight - y + offsetY
        ];
    }
}
/**
 * Transform the coords to match the PDF scale
 * @param coords
 */
function transform(coords) {
    return Object.assign(Object.assign({}, coords), { width: coords.width ? coords.width * COORD_CONSTANT : null, x: (coords.x * COORD_CONSTANT), y: (coords.y * COORD_CONSTANT) });
}
/**
 * Use the annotation library to add annotations
 * @param session
 * @param marks
 */
function addAnnotations(session, marks = []) {
    const annotationFactory = new annotpdf_1.AnnotationFactory(session.data);
    let annotationsAdded = false;
    return pdf_lib_1.PDFDocument.load(session.data).then((pdfDoc) => {
        pdfDoc.getPages().forEach((pdfPage, pageIndex) => {
            if (Array.isArray(marks[pageIndex])) {
                marks[pageIndex].forEach(mark => {
                    const coords = transform(mark.coordinates);
                    if (mark.iconType === icon_type_enum_1.IconTypeEnum.NUMBER) {
                        session.totalMark += (mark.totalMark) ? mark.totalMark : 0;
                        const sectionText = mark.sectionLabel + ((0, lodash_1.isNil)(mark.totalMark) ? ' ' : ' = ' + mark.totalMark);
                        annotationFactory.createSquareAnnotation({
                            page: pageIndex,
                            rect: rotateBox(coords.x, coords.y, TEXT_ANNOTATION_SIZE, TEXT_ANNOTATION_SIZE, (CIRCLE_DIAMETER - TEXT_ANNOTATION_SIZE) / 2, (TEXT_ANNOTATION_SIZE / 2) - CIRCLE_SIZE, pdfPage.getRotation().angle, pdfPage.getWidth(), pdfPage.getHeight()),
                            color: {
                                r: 255,
                                g: 255,
                                b: 255
                            },
                            opacity: 0.0001,
                            contents: mark.comment || ' ',
                            author: sectionText
                        });
                        if (!(0, lodash_1.isNil)(mark.totalMark)) {
                            session.sectionMarks.push(sectionText);
                        }
                        annotationsAdded = true;
                    }
                    else if (mark.iconType === icon_type_enum_1.IconTypeEnum.HIGHLIGHT) {
                        const colorComponents = mark.colour.match(/(\d\.?)+/g);
                        // const annot = annotationFactory.createSquareAnnotation({
                        const annot = annotationFactory.createHighlightAnnotation({
                            page: pageIndex,
                            rect: rotateBox(coords.x, coords.y, coords.width, HIGHLIGHT_HEIGHT, 0, 0, pdfPage.getRotation().angle, pdfPage.getWidth(), pdfPage.getHeight()),
                            color: {
                                r: +colorComponents[0],
                                g: +colorComponents[1],
                                b: +colorComponents[2]
                            },
                            opacity: +colorComponents[3],
                            contents: mark.comment || (mark.sectionLabel ? ' ' : ''),
                            author: mark.sectionLabel || ''
                        });
                        annot.createDefaultAppearanceStream();
                        annotationsAdded = true;
                    }
                });
            }
        });
        if (annotationsAdded) {
            session.data = annotationFactory.write();
        }
        return session;
    });
}
function addPdfMarks(session, marks) {
    return pdf_lib_1.PDFDocument.load(session.data).then((pdfDoc) => {
        const font = pdfDoc.embedStandardFont(pdf_lib_1.StandardFonts.CourierBold);
        pdfDoc.getPages().forEach((pdfPage, pageIndex) => {
            if (Array.isArray(marks[pageIndex])) {
                marks[pageIndex].forEach(mark => {
                    if (mark.iconType === icon_type_enum_1.IconTypeEnum.HIGHLIGHT) {
                        // Nothing to do here for a highlight
                        return;
                    }
                    let coords = transform(mark.coordinates);
                    let colours = (0, pdf_utils_1.hexRgb)('#3b487d');
                    if (mark.colour.startsWith('#')) {
                        colours = (0, pdf_utils_1.hexRgb)(mark.colour);
                    }
                    else if (mark.colour.startsWith('rgb')) {
                        colours = (0, pdf_utils_1.hexRgb)('#' + (0, pdf_utils_1.rgbHex)(mark.colour));
                    }
                    if (mark.iconType === icon_type_enum_1.IconTypeEnum.NUMBER) {
                        if ((0, lodash_1.isNil)(mark.totalMark)) {
                            coords = rotateCoord(coords, (36 - (24 * 96 / 72)) / 2, (36 - (24 * 96 / 72)) / -2, pdfPage.getRotation().angle, pdfPage.getWidth(), pdfPage.getHeight());
                            const options = {
                                x: coords.x,
                                y: coords.y,
                                color: (0, pdf_lib_1.rgb)(getRgbScale(colours.red), getRgbScale(colours.green), getRgbScale(colours.blue)),
                                rotate: pdfPage.getRotation(),
                            };
                            pdfPage.drawSvgPath(icon_svg_enum_1.IconSvgEnum.NUMBER_SVG, options);
                        }
                        else {
                            const circleCoords = rotateCoord(coords, CIRCLE_SIZE, -CIRCLE_SIZE, pdfPage.getRotation().angle, pdfPage.getWidth(), pdfPage.getHeight());
                            const circleOptions = {
                                x: circleCoords.x,
                                y: circleCoords.y,
                                size: CIRCLE_SIZE,
                                color: (0, pdf_lib_1.rgb)(getRgbScale(colours.red), getRgbScale(colours.green), getRgbScale(colours.blue))
                            };
                            pdfPage.drawCircle(circleOptions);
                            const w = font.widthOfTextAtSize(mark.totalMark + '', MARK_FONT_SIZE);
                            const h = font.heightAtSize(MARK_FONT_SIZE);
                            coords = rotateCoord(coords, ((CIRCLE_DIAMETER - w) / 2), -h - (CIRCLE_SIZE / 2), pdfPage.getRotation().angle, pdfPage.getWidth(), pdfPage.getHeight());
                            const markOption = {
                                x: coords.x,
                                y: coords.y,
                                size: MARK_FONT_SIZE,
                                font: font,
                                color: (0, pdf_lib_1.rgb)(1, 1, 1),
                                rotate: pdfPage.getRotation(),
                            };
                            pdfPage.drawText(mark.totalMark + '', markOption);
                        }
                    }
                    else {
                        coords = rotateCoord(coords, (36 - (24 * 96 / 72)) / 2, (36 - (24 * 96 / 72)) / -2, pdfPage.getRotation().angle, pdfPage.getWidth(), pdfPage.getHeight());
                        const options = {
                            x: coords.x,
                            y: coords.y,
                            borderColor: (0, pdf_lib_1.rgb)(getRgbScale(colours.red), getRgbScale(colours.green), getRgbScale(colours.blue)),
                            color: (0, pdf_lib_1.rgb)(getRgbScale(colours.red), getRgbScale(colours.green), getRgbScale(colours.blue)),
                            rotate: pdfPage.getRotation(),
                        };
                        session.totalMark += (mark.totalMark) ? mark.totalMark : 0;
                        session.generalMarks += (mark.totalMark) ? mark.totalMark : 0;
                        if (mark.iconType === icon_type_enum_1.IconTypeEnum.FULL_MARK) {
                            pdfPage.drawSvgPath(icon_svg_enum_1.IconSvgEnum.FULL_MARK_SVG, options);
                        }
                        else if (mark.iconType === icon_type_enum_1.IconTypeEnum.HALF_MARK) {
                            pdfPage.drawSvgPath(icon_svg_enum_1.IconSvgEnum.FULL_MARK_SVG, options);
                            pdfPage.drawSvgPath(icon_svg_enum_1.IconSvgEnum.HALF_MARK_SVG, {
                                x: coords.x,
                                y: coords.y,
                                borderWidth: 2,
                                borderColor: (0, pdf_lib_1.rgb)(getRgbScale(colours.red), getRgbScale(colours.green), getRgbScale(colours.blue)),
                                color: (0, pdf_lib_1.rgb)(getRgbScale(colours.red), getRgbScale(colours.green), getRgbScale(colours.blue)),
                                rotate: {
                                    type: pdf_lib_1.RotationTypes.Degrees,
                                    angle: pdfPage.getRotation().angle
                                }
                            });
                        }
                        else if (mark.iconType === icon_type_enum_1.IconTypeEnum.CROSS) {
                            pdfPage.drawSvgPath(icon_svg_enum_1.IconSvgEnum.CROSS_SVG, options);
                        }
                        else if (mark.iconType === icon_type_enum_1.IconTypeEnum.ACK_MARK) {
                            pdfPage.drawSvgPath(icon_svg_enum_1.IconSvgEnum.ACK_MARK_SVG, options);
                        }
                    }
                });
            }
        });
        addResultsPage(session, pdfDoc);
        return pdfDoc.save().then((data) => {
            session.data = data;
            return session;
        });
    });
}
function addResultsPage(session, pdfDoc) {
    let resultsPage = pdfDoc.addPage(pdf_lib_1.PageSizes.A4);
    let y = 800;
    const xPosition = 25;
    const headerSize = 14;
    const borderColor = { red: 0.71, green: 0.71, blue: 0.71 };
    resultsPage.drawText('Results', { x: resultsPage.getWidth() / 2, y, size: headerSize });
    y = (0, pdf_utils_1.adjustPointsForResults)(y, 15);
    y = (0, pdf_utils_1.adjustPointsForResults)(y, 15);
    resultsPage.drawText('_________________________________________________________________________________', {
        x: xPosition,
        y: 775,
        color: (0, pdf_lib_1.rgb)(borderColor.red, borderColor.green, borderColor.blue),
        size: MARK_FONT_SIZE
    });
    y = (0, pdf_utils_1.adjustPointsForResults)(y, 15);
    for (let i = 0; i < session.sectionMarks.length; i++) {
        y = (0, pdf_utils_1.adjustPointsForResults)(y, 15);
        resultsPage.drawText(session.sectionMarks[i] + '', { x: xPosition, y, size: MARK_FONT_SIZE });
        resultsPage.drawText('', { x: xPosition, y, size: MARK_FONT_SIZE });
        if (y <= 5) {
            resultsPage = pdfDoc.addPage(pdf_lib_1.PageSizes.A4);
            y = 800;
        }
    }
    y = (0, pdf_utils_1.adjustPointsForResults)(y, 15);
    resultsPage.drawText('General Marks = ' + session.generalMarks, { x: xPosition, y, size: MARK_FONT_SIZE });
    y = (0, pdf_utils_1.adjustPointsForResults)(y, 15);
    resultsPage.drawText('_________________________________________________________________________________', {
        x: xPosition,
        y,
        color: (0, pdf_lib_1.rgb)(borderColor.red, borderColor.green, borderColor.blue),
        size: MARK_FONT_SIZE
    });
    y = (0, pdf_utils_1.adjustPointsForResults)(y, 15);
    resultsPage.drawText('', { x: xPosition, y, size: MARK_FONT_SIZE });
    y = (0, pdf_utils_1.adjustPointsForResults)(y, 15);
    resultsPage.drawText('Total = ' + session.totalMark, { x: xPosition, y, size: MARK_FONT_SIZE });
}
function annotatePdfFile(filePath, submissionInfo) {
    return (0, promises_1.readFile)(filePath)
        .then((data) => {
        const session = {
            data: data,
            totalMark: 0,
            sectionMarks: [],
            generalMarks: 0
        };
        return session;
    })
        .then(session => rotatePages(session, submissionInfo))
        .then((session) => {
        return addAnnotations(session, submissionInfo.marks);
    })
        .then((session) => addPdfMarks(session, submissionInfo.marks))
        .then((session) => {
        return {
            pdfBytes: session.data,
            totalMark: session.totalMark
        };
    });
}
exports.annotatePdfFile = annotatePdfFile;


/***/ }),

/***/ "./src-electron/pdf/pdf-utils.ts":
/*!***************************************!*\
  !*** ./src-electron/pdf/pdf-utils.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hexRgb = exports.rgbHex = exports.adjustPointsForResults = void 0;
const adjustPointsForResults = (coordinate, change) => {
    return coordinate - (change);
};
exports.adjustPointsForResults = adjustPointsForResults;
/**
 * https://github.com/sindresorhus/rgb-hex/blob/main/index.js
 * @param red
 * @param green
 * @param blue
 * @param alpha
 */
function rgbHex(red, green, blue, alpha) {
    const isPercent = (red + (alpha || '')).toString().includes('%');
    if (typeof red === 'string') {
        [red, green, blue, alpha] = red.match(/(0?\.?\d{1,3})%?\b/g).map(component => Number(component));
    }
    else if (alpha !== undefined) {
        alpha = Number.parseFloat(alpha);
    }
    if (typeof red !== 'number' ||
        typeof green !== 'number' ||
        typeof blue !== 'number' ||
        red > 255 ||
        green > 255 ||
        blue > 255) {
        throw new TypeError('Expected three numbers below 256');
    }
    if (typeof alpha === 'number') {
        if (!isPercent && alpha >= 0 && alpha <= 1) {
            alpha = Math.round(255 * alpha);
        }
        else if (isPercent && alpha >= 0 && alpha <= 100) {
            alpha = Math.round(255 * alpha / 100);
        }
        else {
            throw new TypeError(`Expected alpha value (${alpha}) as a fraction or percentage`);
        }
        // tslint:disable-next-line:no-bitwise
        alpha = (alpha | 1 << 8).toString(16).slice(1); // eslint-disable-line no-mixed-operators
    }
    else {
        alpha = '';
    }
    // tslint:disable-next-line:no-bitwise
    return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1) + alpha;
}
exports.rgbHex = rgbHex;
const hexCharacters = 'a-f\\d';
const match3or4Hex = `#?[${hexCharacters}]{3}[${hexCharacters}]?`;
const match6or8Hex = `#?[${hexCharacters}]{6}([${hexCharacters}]{2})?`;
const nonHexChars = new RegExp(`[^#${hexCharacters}]`, 'gi');
const validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, 'i');
// https://github.com/sindresorhus/hex-rgb
function hexRgb(hex, options = {}) {
    if (typeof hex !== 'string' || nonHexChars.test(hex) || !validHexSize.test(hex)) {
        throw new TypeError('Expected a valid hex string');
    }
    hex = hex.replace(/^#/, '');
    let alphaFromHex = 1;
    if (hex.length === 8) {
        alphaFromHex = Number.parseInt(hex.slice(6, 8), 16) / 255;
        hex = hex.slice(0, 6);
    }
    if (hex.length === 4) {
        alphaFromHex = Number.parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
        hex = hex.slice(0, 3);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const number = Number.parseInt(hex, 16);
    // tslint:disable:no-bitwise
    const red = number >> 16;
    const green = (number >> 8) & 255;
    const blue = number & 255;
    const alpha = typeof options.alpha === 'number' ? options.alpha : alphaFromHex;
    return { red, green, blue, alpha };
}
exports.hexRgb = hexRgb;


/***/ }),

/***/ "./src-electron/pdf/rubric-annotations.ts":
/*!************************************************!*\
  !*** ./src-electron/pdf/rubric-annotations.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.annotatePdfRubric = void 0;
const pdf_lib_1 = __webpack_require__(/*! pdf-lib */ "pdf-lib");
const utils_1 = __webpack_require__(/*! ../utils */ "./src-electron/utils.ts");
const pdf_utils_1 = __webpack_require__(/*! ./pdf-utils */ "./src-electron/pdf/pdf-utils.ts");
const promises_1 = __webpack_require__(/*! fs/promises */ "fs/promises");
function rotatePages(pdfDoc, submissionInfo) {
    pdfDoc.getPages().forEach((p, index) => {
        const pageSettings = submissionInfo.pageSettings[index];
        if (pageSettings && pageSettings.rotation) {
            p.setRotation({
                type: pdf_lib_1.RotationTypes.Degrees,
                angle: pageSettings.rotation
            });
        }
        else if (p.getRotation().type === pdf_lib_1.RotationTypes.Radians) {
            // Convert radians to degrees
            p.setRotation({
                type: pdf_lib_1.RotationTypes.Degrees,
                angle: p.getRotation().angle * (180 / Math.PI)
            });
        }
    });
}
function annotatePdfRubric(filePath, submissionInfo, rubric) {
    return (0, promises_1.readFile)(filePath)
        .then(data => pdf_lib_1.PDFDocument.load(data))
        .then(pdfDoc => {
        rotatePages(pdfDoc, submissionInfo);
        let totalMark = 0;
        const marksPageSize = [1200.89, 595.28];
        let resultsPage = pdfDoc.addPage(marksPageSize);
        let yPosition = resultsPage.getHeight() - 15;
        let xPosition = 25;
        const headerSize = 14;
        const rubricTextSize = 8;
        const borderColor = { red: 0.21, green: 0.21, blue: 0.21 };
        const rubricCriteriaLevelBackground = { red: 1.0, green: 1.0, blue: 1.0 };
        const rubricCriteriaLevelBackgroundSelected = { red: 0.93, green: 0.93, blue: 0.93 };
        let criteriaColors = { red: 1.0, green: 1.0, blue: 1.0 };
        let maxScore = 0;
        rubric.criterias.forEach((value, index) => {
            let curHighest = -1;
            const critSelected = submissionInfo.marks[index];
            value.levels.forEach((value1, index1, array) => {
                if (critSelected === index1) {
                    totalMark = totalMark + parseFloat(value1.score.toString());
                }
                if (value1.score > curHighest) {
                    curHighest = value1.score;
                }
            });
            maxScore = maxScore + parseFloat(curHighest.toString());
        });
        // 841 pixels x 595.28 pixels
        resultsPage.drawText('Results', { x: xPosition, y: yPosition, size: headerSize });
        yPosition = (0, pdf_utils_1.adjustPointsForResults)(yPosition, 15); // y = 580
        resultsPage.drawText('Total Mark: ' + totalMark + ' / ' + maxScore, { x: xPosition, y: yPosition, size: headerSize });
        yPosition = (0, pdf_utils_1.adjustPointsForResults)(yPosition, 20); // spacing between header and blocks.
        // Rubric - loop for criterias
        let criteriaCount = 0;
        rubric.criterias.forEach((value, criteriaIndex) => {
            criteriaCount++;
            yPosition = (0, pdf_utils_1.adjustPointsForResults)(yPosition, 130);
            resultsPage.drawRectangle({
                x: xPosition,
                y: yPosition,
                width: 130,
                height: 130,
                borderWidth: 1,
                color: (0, pdf_lib_1.rgb)(rubricCriteriaLevelBackground.red, rubricCriteriaLevelBackground.green, rubricCriteriaLevelBackground.blue),
                borderColor: (0, pdf_lib_1.rgb)(borderColor.red, borderColor.green, borderColor.blue),
            });
            resultsPage.drawText(rubric.criterias[criteriaIndex].name, { x: (xPosition + 3), y: (yPosition + 110), size: rubricTextSize });
            let critSelected = submissionInfo.marks[criteriaIndex];
            const splitDesc = (rubric.criterias[criteriaIndex].description.split(' '));
            const criteriaDescriptionX = xPosition + 1;
            let criteriaDescriptionY = yPosition + 90; // remember + is upwards, - is down, and function minues by default.
            // Rubric - loop for criteria-Descriptions -- start
            for (let index = 0; index <= splitDesc.length; index = index + 3) {
                let curString = '';
                if (!(0, utils_1.isNullOrUndefinedOrEmpty)(splitDesc[index])) {
                    curString = curString + splitDesc[index] + ' ';
                }
                if (!(0, utils_1.isNullOrUndefinedOrEmpty)(splitDesc[index + 1])) {
                    curString = curString + splitDesc[index + 1] + ' ';
                }
                if (!(0, utils_1.isNullOrUndefinedOrEmpty)(splitDesc[index + 2])) {
                    curString = curString + splitDesc[index + 2] + ' ';
                }
                resultsPage.drawText(curString, { x: (criteriaDescriptionX + 3), y: (criteriaDescriptionY), size: rubricTextSize });
                criteriaDescriptionY = criteriaDescriptionY - 10;
            }
            let criteriaLevelX = xPosition;
            const criteriaLevelY = yPosition;
            rubric.criterias[criteriaIndex].levels.forEach((level, levelIndex) => {
                // check selected here against marks.
                if (critSelected === levelIndex) {
                    criteriaColors = rubricCriteriaLevelBackgroundSelected;
                    critSelected = -1;
                }
                else {
                    criteriaColors = rubricCriteriaLevelBackground;
                }
                criteriaLevelX = criteriaLevelX + 130;
                resultsPage.drawRectangle({
                    x: criteriaLevelX,
                    y: criteriaLevelY,
                    width: 130,
                    height: 130,
                    borderWidth: 1,
                    color: (0, pdf_lib_1.rgb)(criteriaColors.red, criteriaColors.green, criteriaColors.blue),
                    borderColor: (0, pdf_lib_1.rgb)(borderColor.red, borderColor.green, borderColor.blue),
                });
                resultsPage.drawText(level.label + ' - Marks: ' + level.score, {
                    x: (criteriaLevelX + 3),
                    y: (criteriaLevelY + 120),
                    size: rubricTextSize
                });
                const splitDesc = (level.description.replace('\n', '').split(' '));
                // let splitDesc = (level.description.replace('\n', '').split(''));
                const levelDescriptionX = criteriaLevelX + 1;
                let levelDescriptionY = criteriaLevelY + 110; // remember + is upwards, - is down, and function minues by default.
                // Rubric - loop for criteria-Descriptions -- start
                let lineCount = 0;
                for (let index = 0; index <= splitDesc.length; index += 5) {
                    let curString = '';
                    if (!(0, utils_1.isNullOrUndefinedOrEmpty)(splitDesc[index])) {
                        curString = curString + splitDesc[index].replace('\n', '') + ' ';
                    }
                    if (!(0, utils_1.isNullOrUndefinedOrEmpty)(splitDesc[index + 1])) {
                        curString = curString + splitDesc[index + 1].replace('\n', '') + ' ';
                    }
                    if (!(0, utils_1.isNullOrUndefinedOrEmpty)(splitDesc[index + 2])) {
                        curString = curString + splitDesc[index + 2].replace('\n', '') + ' ';
                    }
                    if (!(0, utils_1.isNullOrUndefinedOrEmpty)(splitDesc[index + 3])) {
                        curString = curString + splitDesc[index + 3].replace('\n', '') + ' ';
                    }
                    if (curString.length < 42) {
                        if (!(0, utils_1.isNullOrUndefinedOrEmpty)(splitDesc[index + 4])) {
                            curString = curString + splitDesc[index + 4].replace('\n', '') + ' ';
                        }
                    }
                    else {
                        index--;
                    }
                    lineCount++;
                    if (lineCount === 12 && !(0, utils_1.isNullOrUndefinedOrEmpty)(curString)) {
                        curString = curString + '...';
                        index = splitDesc.length + 1;
                        lineCount = 0;
                    }
                    resultsPage.drawText(curString, { x: (levelDescriptionX + 1), y: (levelDescriptionY), size: rubricTextSize - 2 });
                    levelDescriptionY = levelDescriptionY - 10;
                }
                // Rubric - loop for level descripotion -- end
            });
            // check for max pages. Maybe use dimnesnsions rather?
            if ((criteriaCount === 4) && (rubric.criterias.length > criteriaCount)) {
                resultsPage = pdfDoc.addPage(marksPageSize);
                yPosition = resultsPage.getHeight() - 15;
                xPosition = 25;
                criteriaCount = 0;
            }
        });
        return pdfDoc.save().then((data) => {
            return { pdfBytes: data, totalMark };
        });
    });
}
exports.annotatePdfRubric = annotatePdfRubric;


/***/ }),

/***/ "./src-electron/utils.ts":
/*!*******************************!*\
  !*** ./src-electron/utils.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.joinError = exports.isBlank = exports.isEmpty = exports.validateRequest = exports.extractAssignmentZipFile = exports.isFolder = exports.deleteFolderRecursive = exports.isJson = exports.checkAccess = exports.writeToFile = exports.isNullOrUndefinedOrEmpty = exports.isNullOrUndefined = exports.isFunction = exports.toIpcResponse = void 0;
const unzipper = __importStar(__webpack_require__(/*! unzipper */ "unzipper"));
const etl = __importStar(__webpack_require__(/*! etl */ "etl"));
const fs_1 = __webpack_require__(/*! fs */ "fs");
const promises_1 = __webpack_require__(/*! fs/promises */ "fs/promises");
const path_1 = __webpack_require__(/*! path */ "path");
const pdf_lib_1 = __webpack_require__(/*! pdf-lib */ "pdf-lib");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const constants_1 = __webpack_require__(/*! @shared/constants/constants */ "./src/shared/constants/constants.ts");
/**
 * This is a middleware response used for IPC to work around a bug in electron where rejected promises
 * loose the original reason. This way, the main process always returns a resolved promise, but the result IpcResponse
 * will contain information if there was an error or not, and then reject the promise in the renderer side
 * https://github.com/electron/electron/issues/24427
 * @param listener
 */
function toIpcResponse(listener) {
    // Return a function that can be used as an IPC handler
    return (event, ...args) => {
        return listener(event, ...args).then((data) => {
            return {
                data
            };
        }, (error) => {
            return {
                error
            };
        });
    };
}
exports.toIpcResponse = toIpcResponse;
const isFunction = (functionToCheck) => {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};
exports.isFunction = isFunction;
const isNullOrUndefined = (object) => {
    return (object === null || object === undefined);
};
exports.isNullOrUndefined = isNullOrUndefined;
const isNullOrUndefinedOrEmpty = (object) => {
    return (object === null || object === undefined || object === '');
};
exports.isNullOrUndefinedOrEmpty = isNullOrUndefinedOrEmpty;
function writeToFile(filePath, data, customSuccessMsg = null, customFailureMsg = null) {
    return (0, promises_1.writeFile)(filePath, data).then(() => {
        return (customSuccessMsg) ? customSuccessMsg : 'Successfully saved to file!';
    }, (err) => {
        return Promise.reject((customFailureMsg) ? customFailureMsg : err.message);
    });
}
exports.writeToFile = writeToFile;
/*HELPER FUNCTIONS*/
function checkAccess(filePath) {
    return (0, promises_1.access)(filePath, fs_1.constants.F_OK).then(rxjs_1.noop, (err) => {
        return Promise.reject(err.message);
    });
}
exports.checkAccess = checkAccess;
/*END HELPER FUNCTIONS*/
const isJson = (str) => {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
};
exports.isJson = isJson;
const deleteFolderRecursive = (path) => {
    if ((0, fs_1.existsSync)(path)) {
        (0, fs_1.readdirSync)(path).forEach(function (file, index) {
            const curPath = path + '/' + file;
            if (isFolder(curPath)) { // recurse
                (0, exports.deleteFolderRecursive)(curPath);
            }
            else { // delete file
                (0, fs_1.unlinkSync)(curPath);
            }
        });
        (0, fs_1.rmdirSync)(path);
    }
};
exports.deleteFolderRecursive = deleteFolderRecursive;
function isFolder(curPath) {
    return (0, fs_1.lstatSync)(curPath).isDirectory();
}
exports.isFolder = isFolder;
const extractAssignmentZipFile = (file, destination, newFolder, oldFolder, assignmentName, assignmentType) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO Should we validate the zip structure based on assignment type?
    if (assignmentType === 'Generic') {
        let skippedFirst = 1;
        return yield (0, fs_1.createReadStream)(file)
            .pipe(unzipper.Parse())
            .pipe(etl.map((entry) => __awaiter(void 0, void 0, void 0, function* () {
            const subheaders = `'Display ID','ID','Last Name','First Name','Mark','Submission date','Late submission'\n`;
            let csvString = '';
            const asnTitle = assignmentName;
            let dir = '';
            const isSet = true;
            if (entry.type === 'File') {
                const content = yield entry.buffer();
                entry.path = entry.path.replace(oldFolder, newFolder);
                const directory = (0, path_1.dirname)(destination + entry.path.replace('/', path_1.sep));
                if (!(0, fs_1.existsSync)(directory)) {
                    (0, fs_1.mkdirSync)(directory, { recursive: true });
                }
                try {
                    const pdfDoc = yield pdf_lib_1.PDFDocument.load(content);
                    const fileName = entry.path;
                    const tempDetails = fileName.substring((fileName.indexOf('/') + 1));
                    const splitArray = tempDetails.split('_');
                    const studentName = splitArray[1];
                    const studentSurname = splitArray[0];
                    const studentID = splitArray[2];
                    const studentDirectory = studentSurname + ', ' + studentName + ' (' + studentID + ')';
                    const csvData = `${studentID.toUpperCase()},${studentID.toUpperCase()},${studentSurname.toUpperCase()},${studentName.toUpperCase()},,,\n`;
                    csvString = csvString + csvData;
                    dir = directory;
                    (0, fs_1.mkdirSync)(directory + path_1.sep + studentDirectory, { recursive: true });
                    (0, fs_1.mkdirSync)(directory + path_1.sep + studentDirectory + path_1.sep + constants_1.FEEDBACK_FOLDER, { recursive: true });
                    (0, fs_1.mkdirSync)(directory + path_1.sep + studentDirectory + path_1.sep + constants_1.SUBMISSION_FOLDER, { recursive: true });
                    if (!(0, fs_1.existsSync)(directory + constants_1.GRADES_FILE) && skippedFirst === 1) {
                        const headers = `'${asnTitle}','SCORE_GRADE_TYPE'\n`;
                        const csvFullString = headers + `''\n` + subheaders;
                        skippedFirst++;
                        yield (0, fs_1.writeFileSync)(directory + path_1.sep + constants_1.GRADES_FILE, csvFullString, { flag: 'a' });
                        yield (0, fs_1.writeFileSync)(directory + path_1.sep + constants_1.GRADES_FILE, csvString, { flag: 'a' });
                    }
                    else {
                        skippedFirst++;
                        yield (0, fs_1.writeFileSync)(directory + path_1.sep + constants_1.GRADES_FILE, csvString, { flag: 'a' });
                    }
                    // if (skippedFirst === 1) {
                    //   await writeFileSync(directory + GRADES_FILE, csvString, {flag: 'a'});
                    //   skippedFirst++;
                    // }
                    const pdfBytes = yield pdfDoc.save();
                    (0, fs_1.writeFileSync)(directory + '/' + studentDirectory + '/' + constants_1.SUBMISSION_FOLDER + '/' + tempDetails, pdfBytes);
                }
                catch (exception) {
                    console.error(exception);
                }
            }
            else {
                entry.path = entry.path.replace(oldFolder, newFolder);
                const directory = destination + entry.path.replace('/', path_1.sep);
                if (!(0, fs_1.existsSync)(directory)) {
                    (0, fs_1.mkdirSync)(directory, { recursive: true });
                }
                if (!((0, fs_1.existsSync)(directory + constants_1.GRADES_FILE))) {
                    const headers = `'${asnTitle}','SCORE_GRADE_TYPE'\n`;
                    const csvFullString = headers + `''\n` + subheaders;
                    skippedFirst++;
                    yield (0, fs_1.writeFileSync)(directory + constants_1.GRADES_FILE, csvFullString, { flag: 'a' });
                    yield (0, fs_1.writeFileSync)(directory + constants_1.GRADES_FILE, csvString, { flag: 'a' });
                }
                else {
                    skippedFirst++;
                    yield (0, fs_1.writeFileSync)(directory + constants_1.GRADES_FILE, csvString, { flag: 'a' });
                }
            }
        }))).promise();
    }
    else {
        return yield (0, fs_1.createReadStream)(file)
            .pipe(unzipper.Parse())
            .pipe(etl.map((entry) => __awaiter(void 0, void 0, void 0, function* () {
            if (entry.type === 'File') {
                //
                const content = yield entry.buffer();
                entry.path = entry.path.replace(oldFolder, newFolder);
                const directory = (0, path_1.dirname)(destination + entry.path.replace('/', path_1.sep));
                const extension = (0, path_1.extname)(destination + entry.path.replace('/', path_1.sep)).substring(1);
                if (!(0, fs_1.existsSync)(directory)) {
                    (0, fs_1.mkdirSync)(directory, { recursive: true });
                }
                try {
                    if (entry.path.indexOf(constants_1.SUBMISSION_FOLDER) !== -1 && extension === 'pdf') {
                        // await writeFileSync(destination + entry.path.replace('/', sep),  content);
                        const pdfDoc = yield pdf_lib_1.PDFDocument.load(content);
                        const pdfBytes = yield pdfDoc.save();
                        yield (0, fs_1.writeFileSync)(destination + entry.path.replace('/', path_1.sep), pdfBytes);
                    }
                    else {
                        yield (0, fs_1.writeFileSync)(destination + entry.path.replace('/', path_1.sep), content);
                    }
                }
                catch (exception) {
                    console.error(exception);
                }
            }
            else {
                entry.path = entry.path.replace(oldFolder, newFolder);
                const directory = destination + entry.path.replace('/', path_1.sep);
                if (!(0, fs_1.existsSync)(directory)) {
                    (0, fs_1.mkdirSync)(directory, { recursive: true });
                }
                entry.autodrain();
            }
        }))).promise();
    }
});
exports.extractAssignmentZipFile = extractAssignmentZipFile;
const validateRequest = (requiredKeys = [], receivedKeys = []) => {
    let invalidKeyFound = false;
    for (const key of receivedKeys) {
        if (requiredKeys.indexOf(key) === -1) {
            invalidKeyFound = true;
            break;
        }
    }
    return invalidKeyFound;
};
exports.validateRequest = validateRequest;
function isEmpty(str) {
    return str === null || str === undefined || str.length === 0;
}
exports.isEmpty = isEmpty;
function isBlank(data = '') {
    if (data === null || data === undefined) {
        return true;
    }
    data += '';
    return data === '' || data.trim() === '';
}
exports.isBlank = isBlank;
function joinError(currentMessage = '', newMessage = '') {
    currentMessage += (!isEmpty(currentMessage)) ? `, ${newMessage}` : newMessage;
    return currentMessage;
}
exports.joinError = joinError;


/***/ }),

/***/ "./src/shared/constants/constants.ts":
/*!*******************************************!*\
  !*** ./src/shared/constants/constants.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PDFM_FILE_SORT = exports.PDFM_FILES_FILTER = exports.PDFM_FILES = exports.GRADES_FILE = exports.MARK_FILE = exports.SETTING_FILE = exports.FEEDBACK_FOLDER = exports.SUBMISSION_FOLDER = exports.DEFAULT_WORKSPACE = void 0;
const workspace_1 = __webpack_require__(/*! @shared/info-objects/workspace */ "./src/shared/info-objects/workspace.ts");
exports.DEFAULT_WORKSPACE = 'Default Workspace';
exports.SUBMISSION_FOLDER = 'Submission attachment(s)';
exports.FEEDBACK_FOLDER = 'Feedback Attachment(s)';
exports.SETTING_FILE = '.settings.json';
exports.MARK_FILE = '.marks.json';
exports.GRADES_FILE = 'grades.csv';
exports.PDFM_FILES = [exports.MARK_FILE, exports.SETTING_FILE];
function PDFM_FILES_FILTER(treeNode) {
    return !(treeNode.type === workspace_1.TreeNodeType.FILE && exports.PDFM_FILES.indexOf(treeNode.name) >= 0);
}
exports.PDFM_FILES_FILTER = PDFM_FILES_FILTER;
/**
 * < 0, a should be before
 * = 0, same level
 * > 0, a should be after
 * @param a
 * @param b
 * @constructor
 */
const PDFM_FILE_SORT = (a, b) => {
    let diff = a.type - b.type;
    if (diff === 0) {
        diff = a.name.localeCompare(b.name);
    }
    return diff;
};
exports.PDFM_FILE_SORT = PDFM_FILE_SORT;


/***/ }),

/***/ "./src/shared/constants/sakai.constants.ts":
/*!*************************************************!*\
  !*** ./src/shared/constants/sakai.constants.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SakaiConstants = void 0;
const SakaiConstantsObj = {
    studentDetailsRegEx: /^.*,.*\([0-9]+\)$/,
    feedbackDirectoryName: 'Feedback Attachment(s)',
    submissionDirectoryName: 'Submission attachment(s)',
    commentsFileName: 'comments.txt',
    timestampFileName: 'timestamp.txt',
    assignmentRootFiles: ['grades.csv', 'grades.xls', 'grades.xlsx'],
    formatErrorMessage: 'Invalid zip format. Please select a file exported from Sakai',
};
SakaiConstantsObj.studentFiles = [SakaiConstantsObj.commentsFileName, SakaiConstantsObj.timestampFileName];
SakaiConstantsObj.studentDirectories = [SakaiConstantsObj.feedbackDirectoryName, SakaiConstantsObj.submissionDirectoryName];
exports.SakaiConstants = SakaiConstantsObj;


/***/ }),

/***/ "./src/shared/info-objects/icon-svg.enum.ts":
/*!**************************************************!*\
  !*** ./src/shared/info-objects/icon-svg.enum.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IconSvgEnum = void 0;
var IconSvgEnum;
(function (IconSvgEnum) {
    IconSvgEnum["FULL_MARK_SVG"] = "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z";
    IconSvgEnum["HALF_MARK_SVG"] = "M19.9795560836792,7.394250392913818 L23.35551357269287,11.079283714294434";
    IconSvgEnum["ACK_MARK_SVG"] = "M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z";
    IconSvgEnum["CROSS_SVG"] = "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z";
    IconSvgEnum["NUMBER_SVG"] = "M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z";
})(IconSvgEnum = exports.IconSvgEnum || (exports.IconSvgEnum = {}));


/***/ }),

/***/ "./src/shared/info-objects/icon-type.enum.ts":
/*!***************************************************!*\
  !*** ./src/shared/info-objects/icon-type.enum.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IconTypeEnum = void 0;
var IconTypeEnum;
(function (IconTypeEnum) {
    IconTypeEnum["FULL_MARK"] = "FULL_MARK";
    IconTypeEnum["HALF_MARK"] = "HALF_MARK";
    IconTypeEnum["ACK_MARK"] = "ACK_MARK";
    IconTypeEnum["CROSS"] = "CROSS";
    IconTypeEnum["NUMBER"] = "NUMBER";
    IconTypeEnum["COMMENT"] = "COMMENT";
    IconTypeEnum["HIGHLIGHT"] = "HIGHLIGHT";
})(IconTypeEnum = exports.IconTypeEnum || (exports.IconTypeEnum = {}));


/***/ }),

/***/ "./src/shared/info-objects/submission.info.ts":
/*!****************************************************!*\
  !*** ./src/shared/info-objects/submission.info.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MarkingSubmissionInfo = exports.RubricSubmissionInfo = exports.SubmissionInfo = exports.SubmissionType = exports.SubmissionInfoVersion = void 0;
/**
 * Current version of the settings info
 */
exports.SubmissionInfoVersion = 1;
var SubmissionType;
(function (SubmissionType) {
    SubmissionType["MARK"] = "MARK";
    SubmissionType["RUBRIC"] = "RUBRIC";
})(SubmissionType = exports.SubmissionType || (exports.SubmissionType = {}));
class SubmissionInfo {
    constructor(version = exports.SubmissionInfoVersion) {
        this.version = exports.SubmissionInfoVersion;
        this.pageSettings = [];
        this.version = version;
    }
}
exports.SubmissionInfo = SubmissionInfo;
class RubricSubmissionInfo extends SubmissionInfo {
    constructor(version = exports.SubmissionInfoVersion) {
        super(version);
        this.type = SubmissionType.RUBRIC;
        this.marks = [];
    }
}
exports.RubricSubmissionInfo = RubricSubmissionInfo;
class MarkingSubmissionInfo extends SubmissionInfo {
    constructor(version = exports.SubmissionInfoVersion) {
        super(version);
        this.type = SubmissionType.MARK;
        this.marks = [];
    }
}
exports.MarkingSubmissionInfo = MarkingSubmissionInfo;


/***/ }),

/***/ "./src/shared/info-objects/workspace.ts":
/*!**********************************************!*\
  !*** ./src/shared/info-objects/workspace.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findTreeNodes = exports.findTreeNode = exports.TreeNodeType = void 0;
const lodash_1 = __webpack_require__(/*! lodash */ "lodash");
var TreeNodeType;
(function (TreeNodeType) {
    TreeNodeType[TreeNodeType["WORKSPACE"] = 0] = "WORKSPACE";
    TreeNodeType[TreeNodeType["ASSIGNMENT"] = 1] = "ASSIGNMENT";
    TreeNodeType[TreeNodeType["SUBMISSION"] = 2] = "SUBMISSION";
    TreeNodeType[TreeNodeType["FEEDBACK_DIRECTORY"] = 3] = "FEEDBACK_DIRECTORY";
    TreeNodeType[TreeNodeType["SUBMISSIONS_DIRECTORY"] = 4] = "SUBMISSIONS_DIRECTORY";
    TreeNodeType[TreeNodeType["FILE"] = 5] = "FILE";
})(TreeNodeType = exports.TreeNodeType || (exports.TreeNodeType = {}));
function findTreeNode(path, roots) {
    const paths = path.split('/');
    let rootNode = (0, lodash_1.find)(roots, { name: paths[0] });
    paths.slice(1).forEach(pi => {
        rootNode = rootNode.children.find(tn => tn.name === pi);
    });
    return rootNode;
}
exports.findTreeNode = findTreeNode;
function findTreeNodes(path, roots) {
    const nodes = [];
    const paths = path.split('/');
    let rootNode = (0, lodash_1.find)(roots, { name: paths[0] });
    nodes.push(rootNode);
    paths.slice(1).forEach(pi => {
        rootNode = rootNode.children.find(tn => tn.name === pi);
        nodes.push(rootNode);
    });
    return nodes;
}
exports.findTreeNodes = findTreeNodes;


/***/ }),

/***/ "annotpdf":
/*!***************************!*\
  !*** external "annotpdf" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("annotpdf");

/***/ }),

/***/ "csvtojson":
/*!****************************!*\
  !*** external "csvtojson" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("csvtojson");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "electron-log":
/*!*******************************!*\
  !*** external "electron-log" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("electron-log");

/***/ }),

/***/ "electron-updater":
/*!***********************************!*\
  !*** external "electron-updater" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("electron-updater");

/***/ }),

/***/ "etl":
/*!**********************!*\
  !*** external "etl" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("etl");

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("fs-extra");

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("glob");

/***/ }),

/***/ "json-2-csv":
/*!*****************************!*\
  !*** external "json-2-csv" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("json-2-csv");

/***/ }),

/***/ "jszip":
/*!************************!*\
  !*** external "jszip" ***!
  \************************/
/***/ ((module) => {

module.exports = require("jszip");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ "pdf-lib":
/*!**************************!*\
  !*** external "pdf-lib" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("pdf-lib");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "simple-excel-to-json":
/*!***************************************!*\
  !*** external "simple-excel-to-json" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("simple-excel-to-json");

/***/ }),

/***/ "unzipper":
/*!***************************!*\
  !*** external "unzipper" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("unzipper");

/***/ }),

/***/ "zip-dir":
/*!**************************!*\
  !*** external "zip-dir" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("zip-dir");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map