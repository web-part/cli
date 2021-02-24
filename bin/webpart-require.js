#!/usr/bin/env node

//用法：
//  webpart info <id>   显示指定模块的信息。
//参数：
//  <id>    必选，要显示的模块 id。
//示例：
//  webpart info API
//强依赖配置节点：
//  stat


const Program = require('./lib/Program');
const Stat = require('./lib/Stat');
const Dependent = require('./require/Dependent');
const Public = require('./require/Public');
const Private = require('./require/Private');

const { opts, config, args, } = Program.parse({
    'config': true,
    '[id]': '',
    '-f, --file': 'show file.',
    '--public': 'show publics',
    '--private': 'show privates',
});


let id = args[0];
let { moduleStat, htmlStat, } = Stat.parse(config.stat);
let {
    id$dependents,
    id$publics,
    id$privates,
    id$file,
} = moduleStat;


let type =
    opts.public ? 'public' :
    opts.private ? 'private' : 'dependent';

let more = {
    'id': id,
    'showFile': opts.file,
    'id$file': id$file,
};

switch (type) {
    case 'dependent':
        Dependent.render(id$dependents, more);
        break;
    case 'public':
        Public.render(id$publics, more);
        break;
    case 'private':
        Private.render(id$privates, more);
        break;
    default:
        console.log(`Error:`.bold.red, `option '-t, --type' must be 'public'|'privte'|'dependent'.`)
        break;
    
}

