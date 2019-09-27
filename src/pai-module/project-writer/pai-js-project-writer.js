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

const pai_module_data = require("../data/pai-module-data").get_instance;

class PAI_JS_PROJECT_WRITER
{
    constructor() {

        //super();

    }


    create_project(project_data)
    {
        console.log("mm " + JSON.stringify(project_data));
    }


}

module.exports = PAI_JS_PROJECT_WRITER;