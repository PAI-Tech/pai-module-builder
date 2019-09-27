/*
 Module       : PAI-UI-KIT
 File         : pai-ui
 Description  : Server side implementation
 Author       : Tamir Fridman
 Date Created : 19/11/2018
 Copyright PAI-TECH 2018, all right reserved
  */


//const {PAIDataSource, PAIEntity, PAIEntityList} = require('@pai-tech/pai-code');

//const pai_utils = require('@pai-tech/pai-code').PAIUtils;


const path = require('path');
const fs = require('fs');
//const pai_server_data = require("../../data/pai-server-data");

const PAIDesktop = require("./pai-desktop/pai-desktop-server");
const PAIControlPanel = require("./pai-control-panel/pai-control-panel-server");
const PAIVideoPlayer = require("./pai-video-player/pai-video-player-server");
const PAIImage = require("./pai-image/pai-image-server");
const PAIView = require("./pai-view/pai-view-server");
const PAISlider = require("./pai-slider/pai-slider-server");
const PAIPageHeader = require("./pai-page-header/pai-page-header-server");
const PAIWindow = require("./pai-window/pai-window-server");
const PAIHomePage = require("./pai-home-page/pai-home-page-server");
const PAIPage = require("./pai-page/pai-page-server");


let instance = null;

class PAIUI {

    constructor() {
        this.package_name = 'pai-ui';

        this.packages = {
            "pai-desktop": new PAIDesktop(),
            "pai-control-panel": new PAIControlPanel(),
            "pai-video-player": new PAIVideoPlayer(),
            "pai-image": new PAIImage(),
            "pai-view": new PAIView(),
            "pai-slider" : new PAISlider(),
            "pai-page-header" : new PAIPageHeader(),
            "pai-window" : new PAIWindow(),
            "pai-page": new PAIPage(),
            "pai-home-page": new PAIHomePage(),
        };

        //this.copy_public_files();
    }



    // copy_public_files() {
    //
    //     let target_base_folder = pai_server_data.get_instance.web_data["packages-folder"] + path.sep + this.package_name + path.sep;
    //     //create packages folder
    //     if (!fs.existsSync(target_base_folder)) {
    //         fs.mkdirSync(target_base_folder);
    //     }
    //
    //     for(let key in this.packages)
    //     {
    //         this.packages[key].copy_public_files();
    //     }
    // }

    static get get_instance()
    {
        if(!instance)
        {
            instance = new PAIUI();
        }
        return instance;
    }


}


module.exports = PAIUI;