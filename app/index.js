'use strict'
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');




var MeanGenerator = module.exports = function MeanGenerator(args, options, config){
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function(){
    this.installDependencies({skipInstall: options['skip-install']});
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

};

util.inherits(MeanGenerator, yeoman.generators.Base);

MeanGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  console.log(this.yeoman);
  console.log('With Confluence Generator, you can generate and setup connection to any dependencies you want to use in your project');

  var prompts = [
    {
    name: 'appName',
    message: "Your Application Name Please?"
  },

  {
    name: "authorName",
    message: "Your name please?"
  },

  {
    name: "authorGithub",
    message: "Your github username"
  },

  {
    name: "appDescription",
    message: "Describe your application briefly please"
  },

  {
    type: "checkbox",
    name: "features",
    message: "Please select the dependencies you want to use in your project",
    choices: [
      {
        name: "MongoDB",
        value: "mongoDB",
        checked: false
      },

      {
        name: 'ElasticSearch',
        value: "elasticSearch",
        checked: false
      },

      {
        name: "RabbitMQ",
        value: "rabbitMQ",
        checked: false
      },

      {
        name: "Redis",
        value: "redis"
      },

      {
        name: "MySql",
        value: "mySql",
        checked: false
      },

      {
        name: "AngularJS",
        value: "angularJS",
        checked: true
      },

      {
        name: "Express",
        value: "express",
        checked: true
      }]

  }];

  this.prompt(prompts, function (answers) {
    var features = [answers.features];
    function hasFeature(feat) {
      return features !== undefined && features.indexOf(feat) !== -1
    }

    //manually deal with the response
    this.mongoDB = hasFeature('mongoDB');
    this.mySql = hasFeature('mySql');
    this.elasticSearch = hasFeature('elasticSearch');
    this.redis = hasFeature('redis');
    this.rabbitMQ = hasFeature('rabbitMQ');
    this.angularJS = hasFeature('angularJS');
    this.express = hasFeature('express');
    this.appName = answers.appName;
    this.authorName = answers.authorName;
    this.authorGithub = answers.authorGithub;
    this.appDescription = answers.appDescription;
    cb();
  }.bind(this));
};


MeanGenerator.prototype.appJS = function appJS() {
  this.copy('_app.js', 'app.js');
};

MeanGenerator.prototype.indexJS = function indexJS() {
  this.copy('_index.js', 'index.js');
};

MeanGenerator.prototype.packageJSON = function packageJSON() {
  this.copy('_package.json', 'package.json');
};

MeanGenerator.prototype.readme = function readme() {
  this.copy('_readme.md', 'readme.md');
};

MeanGenerator.prototype.testJS = function testJS() {
  this.copy('_test.js', 'test.js');
};

MeanGenerator.prototype.configSetup = function configSetup() {
  this.mkdir('config');
  this.copy('_app.json');
};

MeanGenerator.prototype.daoSetup = function daoSetup(){
  this.mkdir('dao');
  this.copy('apiNodeDAO.js');
  this.copy('consumerDAO.js');
  this.copy('Response.js');
};

MeanGenerator.prototype.exampleSetup = function exampleSetup() {
  this.mkdir('examples');
  this.copy('elasticsearch.js');
  this.copy('mongo.js');
  this.copy('rabbitmq.js');

};

MeanGenerator.prototype.librarieSetup = function librarieSetup() {
  this.mkdir('libraries');
  this.copy('_Connector.js');
  this.copy('ElasticSearch.js');
  this.copy('Mongo.js');
  this.copy('Utility.js');
};

MeanGenerator.prototype.modelSetup = function modelSetup() {
  this.mkdir('model');
  this.mkdir('model/schema');
  this.copy('model/schema/_EntrySchema.js');
  this.copy('model/EntryModel.js');
  this.copy('model/elasticModel.js');
  this.copy('model/redisModel.js');
}
