const onbj = require('..')();
const path = require('path');
const fs = require('fs');
testFile = fs.readFileSync(path.join(__dirname, 'testOp.java'), 'UTF-8');

async function test(){
    try{
        console.log(await onbj.info());
        await(onbj.downloadZip('/', path.join(__dirname, 'dump.zip')));
        await onbj.saveFile('/src/org/firstinspires/ftc/teamcode/opmodes/TestOpMode.java', testFile);
        await onbj.saveFile('/src/fpm.json', JSON.stringify({name: 'testProgram'}));
        console.log((await onbj.getFile('/src/org/firstinspires/ftc/teamcode/opmodes/TestOpMode.java')));
        console.log((await onbj.build()));
        await onbj.deleteFile('src/org/firstinspires/ftc/teamcode/opmodes/TestOpMode.java');
    }catch(e){
        console.log(e);
    }

    // console.log(out.data);
}
test();
//var URI_ANON_PING = '/anonymousPing';
// var URI_PING = '/ping';
// var URI_LIST_LOG_FILES = '/listLogs';
// var URI_DOWNLOAD_FILE = '/downloadFile';
// var URI_RENAME_RC = '/renameRC';
// var URI_CHANGE_AP_PASSWORD = '/changeApPassword';
// var URI_CHANGE_AP_CHANNEL = '/changeApChannel';
// var URI_UPLOAD_EXPANSION_HUB_FIRMWARE = '/uploadExpansionHubFirmware';
// var URI_UPDATE_CONTROL_HUB_APK = '/updateControlHubAPK';
// var URI_UPLOAD_WEBCAM_CALIBRATION_FILE = '/uploadWebcamCalibrationFile';
// var URI_NAV_HOME = '/connection.html';
// var URI_NAV_MANAGE = '/manage.html';
// var URI_NAV_HELP = '/help.html';
// var URI_RC_INFO = '/js/rcInfo.json';
// var URI_REBOOT = '/reboot';
// var URI_COLORS = '/css/colors.less';
// var PARAM_NAME = 'name';
// var PARAM_NEW_NAME = 'new_name';
// var PARAM_MESSAGE = 'message';
// var URI_EXIT_PROGRAM_AND_MANAGE = '/exitProgramAndManage';
// var URI_TOAST = '/toast';
// var URI_NAV_BLOCKS = '/FtcBlocksProjects.html';
// var URI_NAV_ONBOTJAVA = '/java/editor.html';