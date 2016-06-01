var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var _s = require('underscore.string');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();
    this.prompt([{
      type    : 'input',
      name    : 'postName',
      message : 'Post name as it would read on the menu',
      store   : true,
      default : this.appname // Default to current folder name
    },{
      type    : 'input',
      name    : 'singleName',
      message : 'Post singular name',
      store   : true,
      default : this.appname // Default to current folder name
    },{
      type    : 'input',
      name    : 'postPrefix',
      message : 'Post Prefix',
      store   : true,
      default : this.appname // Default to current folder name
    },{
      type    : 'input',
      name    : 'customerName',
      message : 'Customer for post',
      store   : true,
      default : this.appname // Default to current folder name
    },{
      type: 'confirm',
      name: 'customMetaInclude',
      message: 'Would you like to use Custom Meta?',
      store: true,
      default: true
    },{
      type: 'confirm',
      name: 'gruntInclude',
      message: 'Would you like to use Grunt?',
      store: true,
      default: true
    }], function (answers) {
      //console.log(chalk.inverse('*******************************'));
      this.postName = answers.postName;
      this.postSingleName = answers.singleName;
      this.postNamePrefixed = this.postPrefix + '_' + answers.postName.replace(/ /g, '_').toLowerCase();
      this.postNameFormated = answers.postName.replace(/ /g, '-');
      this.customerName = answers.customerName;
      // this.log(this.customerName + ': ' + this.themeName + '_theme');

      this.customMetaInclude = answers.customMetaInclude;
      this.gruntInclude = answers.gruntInclude;

      done();
    }.bind(this));
  },
  paths: function () {
    this.sourceRoot(); // returns './templates'
    this.templatePath('index.js'); // returns './templates/index.js'
  },
  scaffoldFolders: function(){
      mkdirp.sync(this.postNameFormated);
      mkdirp.sync(this.postNameFormated + "/css");
      mkdirp.sync(this.postNameFormated + "/sass");
  },
  scaffoldFiles: function () {
    // // Copy cmb validation
    // this.fs.copyTpl(
    //   this.templatePath('cmb-js-validation-required.php'),
    //   this.destinationPath(cmb-js-validation-required.php)
    // );

    // if (this.customMetaInclude) {
    //   this.fs.copyTpl(
    //     this.templatePath('meta.php'),
    //     this.destinationPath(this.postSingleName + 's_Meta')
    //   );
    // }

    // // Copy Single Template
    // this.fs.copyTpl(
    //   this.templatePath('single-template.php'),
    //   this.destinationPath('single-' + this.postNamePrefixed),
    //   { postName: this.postName,
    //     customPostName: this.postNamePrefixed, }
    // );

    // // Copy Girginore
    // this.fs.copyTpl(
    //   this.templatePath('_.gitignore'),
    //   this.destinationPath('.gitignore'),
    // );

    // copy root php files
    // this.fs.copyTpl(
    //   this.templatePath('*.php'),
    //   this.destinationPath(this.themeName),
    //   { title: this.themeName,
    //     customer: this.customerName }
    // );

    // copy root css files
    // this.fs.copyTpl(
    //   this.templatePath('*.css'),
    //   this.destinationPath(this.themeName),
    //   { title: this.themeName,
    //     customer: this.customerName }
    // );

    // copy template-parts files
    // this.fs.copyTpl(
    //   this.templatePath('template-parts/*.*'),
    //   this.destinationPath(this.themeName + '/template-parts'),
    //   { title: this.themeName,
    //     customer: this.customerName }
    // );

    // copy css files
    // this.fs.copyTpl(
    //   this.templatePath('css/*.css'),
    //   this.destinationPath(this.themeName + '/css'),
    //   { title: this.themeName,
    //     customer: this.customerName }
    // );

    // copy sass files
    // this.fs.copyTpl(
    //   this.templatePath('sass/*.scss'),
    //   this.destinationPath(this.themeName + '/sass'),
    //   { title: this.themeName,
    //     customer: this.customerName }
    // );

    // copy includes files
    // this.fs.copyTpl(
    //   this.templatePath('includes/*.*'),
    //   this.destinationPath(this.themeName + '/sass'),
    //   { title: this.themeName,
    //     customer: this.customerName }
    // );
  },
  basicFunctionFile: function(){
    // Copy basic functions file
    this.fs.copyTpl(
      this.templatePath('basic_functions.php'),
      this.destinationPath(this.postNameFormated + '/' + this.postNameFormated + '.php'),
      { postName: this.postName,
        postSingleName: this.postSingleName,
        customPostName: this.postNamePrefixed,
        customer: this.customerName,
        customMeta:  this.customMetaInclude }
    );
  },
  generateGruntFile: function(){
    if (this.gruntInclude) {
      // console.log(chalk.red('generateGruntFile'));
      this.fs.copyTpl(
        this.templatePath('_GruntFile.js'),
        this.destinationPath(this.postNameFormated + '/GruntFile.js'),
        { postName: this.postName,
          postSingleName: this.postSingleName,
          customPostName: this.postNamePrefixed,
          customer: this.customerName,
          customMeta:  this.customMetaInclude }
      );
    }
  },
  // bower: function(){
  //   // copy .bowerrc file
  //   this.fs.copyTpl(
  //     this.templatePath('_.bowerrc'),
  //     this.destinationPath(this.themeName + '/.bowerrc')
  //   );

  //   // create bower.json file
  //   var bowerJson = {
  //     name: _s.slugify(this.themeName),
  //     private: true,
  //     dependencies: {}
  //   };
  //   if(this.bootstrapInclude){
  //     if (this.bootstrapType == 'sass') {
  //       bowerJson.dependencies['bootstrap-sass'] = '~3.3.5';
  //       bowerJson.overrides = {
  //         'bootstrap-sass': {
  //           'main': [
  //             'assets/stylesheets/_bootstrap.scss',
  //             'assets/fonts/bootstrap/*',
  //             'assets/javascripts/bootstrap.js'
  //           ]
  //         }
  //       };
  //     } else if(this.bootstrapType == 'css') {
  //       bowerJson.dependencies['bootstrap'] = '~3.3.5';
  //       bowerJson.overrides = {
  //         'bootstrap': {
  //           'main': [
  //             'less/bootstrap.less',
  //             'dist/css/bootstrap.css',
  //             'dist/js/bootstrap.js',
  //             'dist/fonts/*'
  //           ]
  //         }
  //       };
  //     }
  //   }
  //   this.fs.writeJSON(this.themeName + '/bower.json', bowerJson);
  // },
  // npmSetup: function(){
  //   var packageJson = {
  //     name: _s.slugify(this.themeName),
  //     version: "1.0.0",
  //     description: "",
  //     author: "Amanda Roscoe",
  //     // scripts: {},
  //     dependencies: {},
  //     devDependencies: {}
  //   };

  //   packageJson.dependencies['bower'] =  '^1.4.1';
  //   // packageJson.scripts['bower'] = "bower";
  //   // packageJson.scripts['postinstall'] = "bower install";

  //   if(this.gruntInclude){
  //     // packageJson.scripts['grunt'] = "grunt";
  //     // packageJson.scripts['start'] = "grunt";

  //     // packageJson.scripts['prestart'] = "npm install, grunt build";
  //     packageJson.dependencies['grunt'] =  '^0.4.5';
  //     packageJson.dependencies['grunt-cli'] =  '^0.1.13';
  //     packageJson.dependencies['grunt-contrib-copy'] =  '^0.8.1';
  //     packageJson.dependencies['grunt-contrib-watch'] =  '^0.6.1';

  //     if(this.gruntSass){
  //       packageJson.dependencies['grunt-contrib-sass'] =  '^0.9.2';
  //     }
  //     if(this.gruntPrefix){
  //       packageJson.dependencies['grunt-autoprefixer'] =  '^3.0.3';
  //     }
  //   }else{
  //     // packageJson.scripts['prestart'] = "npm install";
  //   }

  //   this.fs.writeJSON(this.themeName + '/package.json', packageJson);
  // },
  // install: function () {
  //   // Change working directory to 'gulp' for dependency install
  //   var npmdir = process.cwd() + '/' + this.themeName;
  //   process.chdir(npmdir);

  //   //this.installDependencies(['--dev'], {npm: true, bower: true});
  //   // this.bowerInstall();
  //   // this.npmInstall()
  // }
});
