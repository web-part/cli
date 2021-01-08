
const Relates = require('./Task/Relates');
const Rename = require('./Task/Rename');


module.exports = {

    rename(stat, id, newId) {
        let list = Relates.get(stat, id, newId);

        let items = []; //成功的列表。

        //只要有一项失败，则整体成败。
        let failed = list.some((item) => {
            item = Rename.exec(stat, item.id, item.newId);

            if (!item) {
                return true;
            }

            items.push(item);
        });


        return failed ? null : items;
    },
};