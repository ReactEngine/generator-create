'use strict';

var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');
var exec = require('child_process').exec;
module.exports = generators.Base.extend({

    constructor: function() {
        generators.Base.apply(this, arguments);
    },

    initializing: function() {

    },

    prompting: function() {
         var prompts = [{
            type:'list',
            name: 'create_kind', //创建的种类
            message: 'please select create type . ',
            choices: [
                "project", //创建project
                "model",
                "module"
            ],
            default: 'model'
        },
         {
             when: function (props) {
                return  props.create_kind ==='module';
             },
             type:'list',
             name: 'create_type', //对应module的类型
             message: 'which module type do you want to create ? ',
             choices: [
                 "list"
             ],
             default: 'list'
         },
        {
             when: function (props) {
                 return  props.create_kind ==='project';
             },
             type : 'input',
             name : 'create_name',
             message:'please type what\'s the name of project ? '
         },
        {
            when: function (props) {
                return  props.create_kind ==='model';
            },
           type : 'input',
           name : 'create_name',
           message:'please type what\'s the name of model  ? '
        },
        {
            when: function (props) {
                 return  props.create_kind ==='module';
            },
            type : 'input',
            name : 'create_name',
            message:'please type what\'s the name of module ? '
         }
         ];

        this.prompt(prompts, function (answers) {
            this.answers = answers;
            var self = this;
            if(!this.answers.create_name){
                console.log("error ! please type name of " + this.answers.create_kind );
                return;
            }
            var create_type_command = "";
            if(this.answers.create_kind === 'module'){
                create_type_command = "--type=" + this.answers.create_type;
            }
            var yoCommand = "yo reactengine:" + this.answers.create_kind + " " + create_type_command +" " + this.answers.create_name;
            exec(yoCommand, { maxBuffer: 10000 * 1024 }, function(err,stdOut,stdErr) {
                if (err) {
                    console.error(err);
                }
                else{
                    if(stdOut && stdOut.length){
                        console.log(stdOut);
                    }else{
                        console.log("finished create " + self.answers.create_kind +" .");
                    }
                }
            });
        }.bind(this));
    },

    configuring: function() {
        this.config.save();
    },

    writing: function() {

    },

    install: function() {

    },
});
