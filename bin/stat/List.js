

module.exports = {

    render(ids, node) {
        //指定了特定的节点作为树根，则先过虑出来。
        if (typeof node == 'string') {
            ids = ids.filter((id) => {
                return id == node || id.startsWith(node + '/');
            });
        }

        let id$count = {};


        ids.forEach((id, index) => {
            let count = id$count[id] || 0;
            
            count = id$count[id] = count + 1;

            if (count > 1) {
                console.log(`${index + 1}`.grey, id.red);
            }
            else {
                console.log(`${index + 1}`.grey, id.green);
            }
        });
    },
};