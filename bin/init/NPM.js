

const console = require('@webpart/console');
const { exec, } = require('child_process');
const ora = require('ora');

const Home = require('./NPM/Home');
const Package = require('./NPM/Package');



module.exports = {

    download(template, project, force) {
        let home = Home.init(project, force);

        if (!home) {
            return;
        }


        let loading = ora();
        let pkg = `@webpart/template-${template}`;
        let cmd = `npm install ${pkg}`;


        console.log('Start generating...'.blue);
        loading.start(cmd.blue); //出现加载图标。


        exec(cmd, { 'cwd': home, }, function (error, stdout, stderr) {
            console.log(stdout);

            if (error) {
                console.log('');
                console.log(`Generation failed.`.red);
                loading.fail();
                console.log(error);
                return;
            }

          

            Package.render({home, project, pkg});


            loading.succeed();
            console.log('');
            console.log('Generation completed!'.green);
            console.log('To get started, run commands:'.bold);

            //如果指定了子目录，则提示进入该目录。
            if (project) {
                console.log(`├──`, `cd ${project}`.magenta);
            }

            console.log(`├──`, `npm install`.magenta);
            console.log(`└──`, `webpart watch`.magenta);

            

        });
    },
};