#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var child_process_1 = require("child_process");
var node_schedule_1 = require("node-schedule");
var timing_1 = require("./timing");
var packageName = 'com.ifit.standalone';
var device = '192.168.0.252:5555';
var runOnce = false;
var logSteps = false;
var shell;
var steps = [
    {
        title: "Connect ADB",
        run: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, connectShell()];
        }); }); },
        waitAfterRun: 0
    },
    {
        title: 'Switching to Library',
        run: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, shell.stdin.write('input tap 1200 1070\n')];
        }); }); },
        waitAfterRun: 5
    },
    {
        title: 'Open a Trainer',
        run: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, shell.stdin.write('input tap 1218 850\n')];
        }); }); },
        waitAfterRun: 10
    },
    {
        title: 'Open a Program',
        run: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, shell.stdin.write('input tap 1218 850\n')];
        }); }); },
        waitAfterRun: 9
    },
    {
        title: "Restarting " + packageName,
        run: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // const pid = String(execSync(`adb shell ps | grep ${packageName} | awk '{print $2}'`));
                // if (!pid || isNaN(+pid)) {
                //   throw new Error('pid not found! ' + pid);
                // }
                shell.stdin.write("am force-stop " + packageName + "\n"
                    + ("monkey -p " + packageName + " -c android.intent.category.LAUNCHER 1\n"));
                return [2 /*return*/];
            });
        }); },
        waitAfterRun: 0
    },
    {
        title: "Disconnect ADB",
        run: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, disconnectShell()];
        }); }); },
        waitAfterRun: 0
    },
];
if (runOnce) {
    run().then(function () { return console.log('done!'); });
}
else {
    var before = new node_schedule_1.Job('Turn On Screen', function () {
        connectShell();
        if (!screenIsOn()) {
            shell.stdin.write("input keyevent " + 26 /* POWER */ + "\n");
        }
        disconnectShell();
    });
    var running_1 = false;
    var during = new node_schedule_1.Job('Test Service', function () {
        if (!running_1) {
            running_1 = true;
            run()
                .then(function () { return running_1 = false; })["catch"](function () { return running_1 = false; });
        }
    });
    var after = new node_schedule_1.Job('Turn Off Screen', function () {
        connectShell();
        if (screenIsOn()) {
            shell.stdin.write("input keyevent " + 26 /* POWER */ + "\n");
        }
        disconnectShell();
    });
    node_schedule_1.rescheduleJob(before, timing_1.beforeWorkHours);
    node_schedule_1.rescheduleJob(during, timing_1.duringWorkHours);
    node_schedule_1.rescheduleJob(after, timing_1.afterWorkHours);
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var i, step, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logSteps && process.stdout.write('\x1Bc');
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < steps.length)) return [3 /*break*/, 9];
                    step = steps[i];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, 6, 8]);
                    logSteps && console.log(step.title);
                    if (!step.run) return [3 /*break*/, 4];
                    return [4 /*yield*/, step.run()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 8];
                case 5:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 9];
                case 6: return [4 /*yield*/, delay(step)];
                case 7:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 8:
                    i++;
                    return [3 /*break*/, 1];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function delay(step) {
    return __awaiter(this, void 0, void 0, function () {
        var remaining;
        return __generator(this, function (_a) {
            if (!step.waitAfterRun) {
                return [2 /*return*/];
            }
            remaining = step.waitAfterRun * 1000;
            return [2 /*return*/, new Promise(function (resolve) {
                    var intervalID = setInterval(function () {
                        remaining -= 100;
                        if (remaining <= 0) {
                            clearInterval(intervalID);
                            resolve();
                        }
                    }, 100);
                })];
        });
    });
}
function screenIsOn() {
    return String(child_process_1.execSync("adb shell dumpsys power")).indexOf('mWakefulness=Awake') >= 0;
}
function connectShell() {
    if (shell) {
        disconnectShell();
    }
    child_process_1.execSync("adb connect " + device);
    shell = child_process_1.spawn('adb', ['shell']);
    shell.stdin.write("su\n");
}
function disconnectShell() {
    shell.stdin.write('exit\n'); // exits from su
    shell.stdin.write('exit\n'); // exits from adb shell
    shell.stdin.end();
    shell = null;
    child_process_1.execSync("adb disconnect " + device);
}
