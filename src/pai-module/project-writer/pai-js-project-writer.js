/**
 * <pai-module-builder>
 * Author       : Tamir Fridman
 * Date Created : 9/25/2019
 * Copyright PAI-TECH 2018, all right reserved

 * This file is the entry point of your base module.

 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
 */


const { PAICodeCommand, PAICodeCommandContext, PAICodeModule, PAICode, PAIModuleConfigParam, PAIModuleConfig, PAILogger, PAIModuleCommandSchema, PAIModuleCommandParamSchema } = require('@pai-tech/pai-code');


const pai_utils = require('@pai-tech/pai-code').PAIUtils;

const path = require('path');
const fs = require('fs');
const homedir = require('os').homedir();

const pai_module_data = require("../data/pai-module-data").get_instance;

const pai_js_class = require("./pai-js-class");


class PAI_JS_PROJECT_WRITER
{
    constructor() {

        //super();

        this.pai_projects_folder = homedir + "/" + pai_module_data.get_param("project-base-folder");
        this.module_folder = null;
        this.module_source_folder = null;


        if (!fs.existsSync(this.pai_projects_folder)) {
            fs.mkdirSync(this.pai_projects_folder);
        }

    }


    //create folder unless exists
    mkdir(folder_name)
    {
        if (!fs.existsSync(folder_name)) {
            fs.mkdirSync(folder_name);
        }
    }


    copyFile(fileName)
    {

    }

    create_project(project_data)
    {

        this.module_folder = this.pai_projects_folder + "/" + project_data["module-name"] + "/";

        console.log("Creating pai-code module " + project_data["module-name"] + " at folder " + this.module_folder);
        this.mkdir(this.module_folder);
        this.mkdir(this.module_folder + "src");
        this.module_source_folder = this.module_folder + "src/pai-module/";
        this.mkdir(this.module_source_folder);

        /**
         * Create package.json
         */

        let pkg_json = require("./../../../package");
        pkg_json.name = project_data["module-name"];

        fs.writeFile(this.module_folder + "package.json", JSON.stringify(pkg_json), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });

        /**
         * Create module entry point
         */


        let mname = "pcm_" + project_data["module-name"].replace(" ","_").replace("-","_");

        let main_class = {
            "class-name": mname.toUpperCase(),
            "extends": "PAICodeModule",
            metadata: {
                "author" : project_data["author"],
                "company-name" : project_data["company-name"],
                "module-name": project_data["module-name"],
                "description": project_data["description"],
                "file-name": mname +".js"
            },
            imports:"pai-main-imports",
            scopes: ["pai-main-body"]
        };

        let pai_module_main = new pai_js_class();



        fs.writeFile(this.module_source_folder + main_class.metadata["file-name"], pai_js_class.parse_json(main_class), function (err) {
            if (err) throw err;
            console.log(' main class Saved!');
        });


        let rn_data = main_class.metadata["module-name"] + "\n------------------------\n\n\nv0.0.1\n---------\n-Hello world";

        fs.writeFile(this.module_folder + "release-notes.txt", rn_data, function (err) {
            if (err) throw err;
            console.log('release-notes Saved!');
        });



    }


}

module.exports = PAI_JS_PROJECT_WRITER;