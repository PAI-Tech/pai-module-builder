/*
 PAI Data Object
 Author       : Tamir Fridman
 Date Created : 28/11/2018
 Copyright PAI-TECH 2018, all right reserved

 This file is the entry point of your base module.


 *      This program is free software; you can redistribute it and/or
 *		modify it under the terms of the GNU General Public License
 *		as published by the Free Software Foundation; either version
 *		3 of the License, or (at your option) any later version.
  */

const { PAIModuleConfigParam, PAIModuleConfig, PAILogger } = require('@pai-tech/pai-code');

let pai_module_data_instance = null;

const pai_code_interface = require("../pai-code-interface");

class PAI_MODULE_DATA {
    constructor() {
        this.module_data = {
            "module-name" : pai_code_interface["pai-code-module-name"],
            "project-base-folder" : "/var/PAI/Projects",

        };
        this.config = null;
    }


    async load_params(param_name)
    {
        let v =  await this.config.getConfigParam(param_name);
        if(v) {
            this.module_data[param_name] = v;
        }
        else
        {
            this.module_data[param_name] = "please config";
        }
    }

    get_param(param_name)
    {
        let rv =  this.module_data[param_name];
        return rv;
    }

    async set_param(param_name,param_value)
    {
        this.module_data[param_name] = param_value;
        await this.config.setConfigParam(param_name,param_value);
    }


    static get get_instance()
    {
        if(!pai_module_data_instance)
        {
            pai_module_data_instance = new PAI_MODULE_DATA();
        }
        return pai_module_data_instance;
    }


}




module.exports = PAI_MODULE_DATA;