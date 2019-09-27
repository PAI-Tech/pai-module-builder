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
const pai_module_data = require("./data/pai-module-data").get_instance;

const PAIWebBuilder = require('./packages/pai-ui/pai-web-builder/pai-html-builder');
const PAIWebRouter = require("./web-pages/pai-web-router");


class PCM_pai_module_builder extends PAICodeModule
{
    constructor() {

        // Module description that will be shown on info command [your-module-name info]
        let infoText = `
        Welcome to My Module:
        You can write here info text about your module.
        `;
    
        super(infoText);
    
        this.config.schema = [
            //PAIModuleConfigParam(label, description, paramName, defaultValue)
            // TODO: add configuration parameters
        ];
        this.web_static_folders = {};
        this.web_services = {};
        this.pai_web_router = new PAIWebRouter();
    }
    
    
    /**
     * This method runs when the module is being loaded by the bot it load basic module commands from super
     *
     * and load all the functions for this module
     */
    async load()
    {
        await super.load(this);



        const pai_code_interface = require("./pai-code-interface");
        const pai_code_commands = pai_code_interface["pai-code-commands"];

        /* load commands from pai-code-interface.json file */
        if(pai_code_commands)
        {
            for(let cmd in pai_code_commands)
            {
                //console.log("command: " + pai_code_commands[cmd]["command-name"]);
                let pai_code_command_params = pai_code_commands[cmd]["params"];
                let schema_params = {};
                if(pai_code_command_params)
                {
                    schema_params.params = {};
                    for(let param in pai_code_command_params)
                    {
                        //console.log("param: " + pai_code_command_params[param].name);
                        let new_param = new PAIModuleCommandParamSchema(pai_code_command_params[param].name, pai_code_command_params[param].description, pai_code_command_params[param].required, pai_code_command_params[param].label,pai_code_command_params[param]["default-value"]);
                        schema_params.params[pai_code_command_params[param].name] = new_param;
                    }
                    //console.log(schema_params);
                }
                let pai_code_command_schema = new PAIModuleCommandSchema({
                    op: pai_code_commands[cmd]["command-name"] ,
                    func:pai_code_commands[cmd]["js-function"],
                    params:schema_params.params

                });
                this.loadCommandWithSchema(pai_code_command_schema);
            }
        }

        //load parameters
        pai_module_data.config = this.config;

        /* load params from pai-code-interface.json file */
        const pai_module_params = pai_code_interface["pai-module-params"];
        if(pai_module_params)
        {
            for(let param in pai_module_params)
            {
                await pai_module_data.load_params(pai_module_params[param]);
            }
        }

        /* load web static folders from pai-code-interface.json file */
        const static_web_folders = pai_code_interface["pai-bot-web-interface"]["static-web-folders"];
        if(static_web_folders)
        {
            for(let folder in static_web_folders)
            {
               this.web_static_folders['/' + static_web_folders[folder] + '/'] = static_web_folders[folder];
            }
        }

        /* load web services from pai-code-interface.json file */
        const web_services = pai_code_interface["pai-bot-web-interface"]["web-services"];
        if(web_services)
        {
            for(let service in web_services)
            {
                this.web_services['/' + web_services[service]["service-name"]] = web_services[service]["js-function"];
            }
        }


	}
    
    
    setModuleName()
    {
        return 'pai-module-builder'; // TODO: change this ! the module name must be unique
    }
	
	
	/**
	 * Echo version number of your module
	 * @param {PAICodeCommand} cmd
	 */
	version(cmd)
    {
	    return require("./../../package").version;
    }



    get_release_notes(cmd)
    {
        var pai_release_notes = fs.readFileSync(path.resolve(__dirname,"release-notes.txt"), 'utf8');
        return pai_release_notes;
    }




    get_static_folder(req, res,folder,route)
    {

        let path2 = path.resolve(__dirname,folder);

        res.sendFile(path2 + "/" + route);
    }



    get_metadata()
    {
        let out =  {
            "page-title": "PAI-TECH",
            keywords: "Bot Operating System Standard",
            author: "PAI-BOT",
            description: "Bot Operating System Standard",
            icon: "public/images/pai/pai-bot.png",

        };
        return out;
    }

    get_header_button(name,title,icon,status,onclick,animation)
    {
        let out = {
            name:name,
            title:title,
            icon:icon,
            status:status,
            onclick:onclick,
            anim:animation
        }
        return out;
    }

    get_page_header(animation,selected)
    {
        if (!animation)
            animation = "";
        let out = {
            id:'main-page-header',
            logo:"public/images/pai/pai-tech-logo-blue-03-1.png",
            title:"Bot Operating System Standard | PAI-TECH",
            buttons: [
                this.get_header_button("home","Home","public/images/icons/home.png",(selected == "home") ? "selected" : "ok",'pai_go_home()',animation),
                this.get_header_button("me","My Profile","public/images/icons/me.png",(selected == "me") ? "selected" : "ok",'pai_me()',animation),
                this.get_header_button("calendar","Scouting Tracking","public/images/icons/calendar.png",(selected == "scouting") ? "selected" : "ok" /*"na"*/,'scouting_tracking()',animation),
                this.get_header_button("inbox","Inbox","public/images/icons/inbox.png","na",'void',animation),
                this.get_header_button("notifications","Notifications","public/images/icons/notification.png","na",'void',animation),
                this.get_header_button("log_out","Logout","public/images/icons/logout.png","ok",'pai_logout()',animation),
            ]
        };
        return out;
    }




    http_request(cmd) {
        return new Promise( (resolve,reject) => {

            const {req, res, next} = cmd.params.express.value;

            let route_ep = req.originalUrl.replace(this.setModuleName() + "/","");

            let fold = route_ep.substring(0,route_ep.indexOf("/",1)+1);

            if(this.web_static_folders.hasOwnProperty(fold))
            {
                let f = this.web_static_folders[fold];
                this.pai_web_router.get_static_folder(req,res,f,route_ep.replace(fold,""));
            }


            else
            {
                let out = `${this.setModuleName()} :] hey from web interface`;
                let has_qm = route_ep.indexOf("?");
                if (has_qm>0)
                {
                    route_ep = route_ep.substr(0,has_qm);
                }

                //let has_slash = route_ep.indexOf("/");
                if(this.web_services.hasOwnProperty(route_ep))
                {
                    let s = this.web_services[route_ep];
                    this.pai_web_router[s](req,res,route_ep.replace(route_ep + "/",""));
                }
                else
                {
                    res.send(out);

                    resolve(out);
                }
            }
        });
    }
}

module.exports = PCM_pai_module_builder;