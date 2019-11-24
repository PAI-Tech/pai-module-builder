/**
 * <pai-module-builder>
 * Author       : Tamir Fridman
 * Date Created : 05/10/2019
 * Copyright PAI-TECH 2019, all right reserved

 * This create javascript classes

 */


const { PAICodeCommand, PAICodeCommandContext, PAICodeModule, PAICode, PAIModuleConfigParam, PAIModuleConfig, PAILogger, PAIModuleCommandSchema, PAIModuleCommandParamSchema } = require('@pai-tech/pai-code');


const pai_module_data = require("../data/pai-module-data").get_instance;
const pai_annotator = require("./pai-js-annotator");
const pai_scope_builder = require("./pai-scope-builder");

class PAI_JS_CLASS
{

    static parse_json(class_data)
    {
        let out = pai_annotator.get_class_header(class_data);

        // imports
        out += pai_scope_builder.get_scope(class_data.imports);
        out += "class " + class_data["class-name"];
        if(class_data.hasOwnProperty("extends"))
        {
            out += " extends " + class_data["extends"] ;
        }

        out +=`{`;

        for (let scope in class_data.scopes) {
            out += pai_scope_builder.get_scope(class_data.scopes[scope]);
        }
        out +=`}
        module.exports = ${class_data["class-name"]};
        `;
        return out;
    }
}

module.exports = PAI_JS_CLASS;