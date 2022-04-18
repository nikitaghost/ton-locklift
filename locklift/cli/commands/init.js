const { Command } = require('commander');
const path = require('path');
const fs = require("fs-extra");
const utils = require('./../utils');
const { exec } = require('child_process');

const program = new Command();

const TIP4_1 = "https://github.com/itgoldio/everscale-tip-samples/tree/main/demo/TIP4_1"

program
  .name('init')
  .description('Initialize sample Locklift project in a directory')
  .requiredOption(
    '-p, --path <path>',
    'Path to the project folder',
    '.'
  )
  .option(
    '-f, --force',
    'Ignore non-empty path',
    false,
  )
  .option(
    '-t, --template',
    'Use custom templates (tip4_1, tip4_2, tip4_3)',
    '',
  )
  .action((options) => {
    const pathEmpty = utils.checkDirEmpty(options.path);
    
    if (!pathEmpty && options.force === false) {
      console.error(`Directory at ${options.path} should be empty!`);
      return;
    }
    
    if (options.template == '') {
      const sampleProjectPath = path.resolve(__dirname, './../../../sample-project');
    
      fs.copy(sampleProjectPath, options.path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        
        console.log(`New Locklift project initialized in ${options.path}`);
      });
    } else {
      if (options.template == 'tip4_1') {
        exec('git clone ' + TIP4_1 + '.', (error) => {
          if (error) {
            console.error(`error: ${error.message}`);
            return;
          }
        });
        exec('npm install', (error) => {
          if (error) {
            console.error(`error: ${error.message}`);
            return;
          }
        });
      }
    }

  });


module.exports = program;
