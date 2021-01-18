

const Tree = require('@definejs/tree');





module.exports = exports = {
    
    render(ids, node) { 
        //指定了特定的节点作为树根，则先过虑出来。
        if (typeof node == 'string') {
            ids = ids.filter((id) => {
                return id == node || id.startsWith(node + '/');
            });
        }

        if (!ids.length) {
            console.log('ids.length = 0'.red);
            return;
        }

        ids = ids.map((id) => {
            return id.startsWith('/') ? `(empty)${id}` : id;
        });

        let tree = new Tree(ids, '/');
        let lines = tree.render();

        let content = lines.join('\n');

        console.log(content || '');
        



    },


   
};