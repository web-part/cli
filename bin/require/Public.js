

const Key$Value = require('../lib/Key$Value');

function renderHead(id, id$file, showFile) {
    let file = id$file[id] || '';
    let isArray = Array.isArray(file);

    if (isArray) {
        if (showFile) {
            file = file.map((file) => {
                return file.underline.red;
            });

            console.log(`${id.bold.red}:`, `(${file.length})`.bold.red, file.join(', '));
        }
        else {
            console.log(`${id.bold.red}:`, `(${file.length})`.bold.red);
        }

    }
    else {
        if (showFile) {
            console.log(`${id.bold}:`, file.underline.grey);
        }
        else {
            console.log(`${id.bold}:`);
        }
    }
}


module.exports = {

    render(id$value, { id, showFile, id$file, }) {

        let opts = {
            'keys': id ? [id] : [],
        };

        Key$Value.each(id$value, opts, function (id, value) {
            let list = Array.isArray(value) ? value : [value];
            let maxIndex = list.length - 1;
           
            renderHead(id, id$file, showFile);

            list.sort().forEach((id, index) => {
                let file = id$file[id] || '';
                let isArray = Array.isArray(file);
                let prefix = index == maxIndex ? `└──` : `├──`;

                if (!showFile) {
                    if (isArray) {
                        console.log(`${prefix}`, id.bold.red, `(${file.length})`.red);
                    }
                    else {
                        console.log(`${prefix}`, id.cyan);
                    }
                    return;
                }


                if (!isArray) {
                    console.log(`${prefix}`, id.cyan, file.underline.grey);
                    return;
                }

                file = file.map((file) => {
                    return file.underline.red;
                });

                console.log(`${prefix}`, id.bold.red, file.join(', '));

            });
        });
    },
};