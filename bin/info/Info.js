
const console = require('@webpart/console');
const Lines = require('@definejs/lines');
const Stat = require('../lib/Stat');
const Key$Value = require('../lib/Key$Value');


function printList(title, list, id$file) {
    if (!list || !list.length) {
        return;
    }

    list = [...new Set(list)];

    console.log(`  `, `${title}:`.bold, `(${list.length})`.bold,);

    Key$Value.render(id$file, {
        'keys': list,
        'tabs': 4,
    });

}


function getParentString(parent) {
    if (typeof parent == 'string') {
        return parent ? parent.green : `''`.magenta;
    }

    if (!parent) {
        return `(null)`.italic.magenta;
    }

    return `(Error)`.red;
}

module.exports = {

    render(stat, id) { 
        let {
            infos,
            ids,
            file$info,
            id$file,
            id$info,
            id$module,
            id$parent,
            id$childs,
            id$children,
            id$siblings,

        } = stat;

        let info = id$info[id];     //可能为一个数组。
        let module = id$module[id]; //可能为一个数组。
        
        let parent = id$parent[id];
        let childs = id$childs[id];
        let children = id$children[id];
        let siblings = id$siblings[id];

        Stat.tryWarnDuplicated(id, info, (info, index) => {
            let lines = Lines.split(info.content);

            console.log(`---- File Info ----`.bold.blue);
            console.log(`  file:`.bold, info.file.underline.cyan);
            console.log(`  dir:`.bold, `${info.dir}`.underline.yellow);
            console.log(`  name:`.bold, info.name.cyan);
            console.log(`  ext:`.bold, info.ext.green);
            console.log(`  size:`.bold, info.size);
            console.log(`  lines:`.bold, lines.length);
            console.log(`  isUTF8:`.bold, info.isUTF8);
        });

        console.log('');

        Stat.tryWarnDuplicated(id, module, (module, index) => { 
            let factoryLines = Lines.split(module.factory.content);

            console.log(`---- Module Info ----`.bold.blue);
            console.log(`  id:`.bold, id.green);
            console.log(`  parent:`.bold, getParentString(parent));

            console.log(`  method:`.bold, module.method.cyan);
            console.log(`  factory:`.bold);
            console.log('    type:'.bold, module.factory.type.italic.blue);
            console.log('    lines:'.bold, factoryLines.length);
        // console.log('  factory-type:'.bold, module.factory.type.italic.blue);
        // console.log('  factory-lines:'.bold, factoryLines.length);

        });



        printList('childs', childs, id$file);
        printList('children', children, id$file);
        printList('siblings', siblings, id$file);
        

        // const Tree = require('./Tree');
        // let tree = Tree.get(ids, id);
        // console.log(tree)


    },
};