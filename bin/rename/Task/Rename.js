
module.exports = {

    
    exec(stat, id, newId) {

        let {
            infos,
            ids,
            file$info,
            id$file,
            id$info,
            id$module,
            id$childs,
        } = stat;
// console.log(id$file)

//         return;
        let file = id$file[id];

        if (!file) {
            console.log(`error: can't find a file related to the module '${id}'`.red);
            return;
        }


        let { content, } = file$info[file];
        let { method, } = id$module[id];


        let patterns = [
            {
                src: `${method}('${id}',`,
                dest: `${method}('${newId}',`
            },
            {
                src: `${method}("${id}",`,
                dest: `${method}("${newId}",`,
            },
        ];

        let index = patterns.findIndex((pattern) => {
            return content.includes(pattern.src);
        });

        if (index < 0) {
            console.log(`fail: can't match patterns:`.red);

            patterns.forEach((pattern) => {
                console.log(`    ${pattern.src}`.blue);
            });

            console.log(`please check file:`.red, file.underline.cyan);
            return;
        }

        let pattern = patterns[index];
        let newContent = content.replace(pattern.src, pattern.dest);

        return {
            'id': id,
            'file': file,
            'content': content,
            'newId': newId,
            'newFile': '',
            'newContent': newContent,
        };
    },
};