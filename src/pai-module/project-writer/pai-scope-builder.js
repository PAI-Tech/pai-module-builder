
/**
 * <pai-module-builder>
 * Author       : Tamir Fridman
 * Date Created : 05/10/2019
 * Copyright PAI-TECH 2019, all right reserved

 * This create javascript classes

 */


const { PAICodeCommand, PAICodeCommandContext, PAICodeModule, PAICode, PAIModuleConfigParam, PAIModuleConfig, PAILogger, PAIModuleCommandSchema, PAIModuleCommandParamSchema } = require('@pai-tech/pai-code');


const path = require('path');
const fs = require('fs');


class PAI_SCOPE_BUILDER
{

    static get_scope(scope_name)
    {
        let out = fs.readFileSync(path.resolve(__dirname, "./js-data/" + scope_name + '.psf'), 'utf8');
        return out;
    }

}

module.exports = PAI_SCOPE_BUILDER;