

module.exports = {
    get(stat, id, newId) {
        let { ids, } = stat;

        let list = [{
            'id': id,
            'newId': newId,
        },];

        let prefix = `${id}/`;


        ids.forEach(function (mid) {
            if (!mid.startsWith(prefix)) {
                return;
            }

            let destId = newId + mid.slice(id.length);

            list.push({
                'id': mid,
                'newId': destId,
            });
        });

        return list;

    },
};