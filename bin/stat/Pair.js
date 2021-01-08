
require('colors')


function render(moduleStat, htmlStat, id) {
    let jsFile = moduleStat.id$file[id];
    let htmlFile = htmlStat.id$file[id];
    let hasError = false;

    if (Array.isArray(jsFile)) {
        console.log(`Error:`.bgRed, `The JS module`.red, `'${id.magenta}'`, `is defined in different files:`.red);
        jsFile.forEach((file, index) => {
            console.log(`  `, file.underline.grey);
        });
        hasError = true;
    }

    if (Array.isArray(htmlFile)) {
        console.log(`Error:`.bgRed, `The HTML module`.red, `'${id.magenta}'`, `is defined in different files:`.red);
        htmlFile.forEach((file, index) => {
            console.log(`  `, file.underline.grey);
        });
        hasError = true;
    }

    if (hasError) {
        return;
    }


    if (jsFile && htmlFile) {
        console.log(`${id.green}`);
        console.log(`├── ${jsFile.underline.grey}`);
        console.log(`└── ${htmlFile.underline.grey}`);
    }
    else if (jsFile && !htmlFile) {
        console.log(`${id.blue}`);
        console.log(`└── ${jsFile.underline.grey}`);
    }
    else if (!jsFile && htmlFile) {
        console.log(`${id.red}`);
        console.log(`├── (${'JS module Not Found'.red})`);
        console.log(`└── ${htmlFile.underline.grey}`);
    }
    else {
        console.log(`Not Found:`.bold.red, `${id}`.magenta);
    }
}


module.exports = {
    match(moduleStat, htmlStat, id) {

        if (typeof id == 'string') {
            render(moduleStat, htmlStat, id);
            return;
        }


        let jsIds = [];
        let htmlIds = [];
        let matchedIds = [];

        Object.keys(moduleStat.id$file).forEach((id) => {
            let htmlFile = htmlStat.id$file[id];
           
            if (htmlFile) {
                matchedIds.push(id);
            }
            else {
                jsIds.push(id);
            }
        });

        Object.keys(htmlStat.id$file).forEach((id) => {
            let jsFile = moduleStat.id$file[id];

            if (jsFile) {
                // matchedIds.push(id);
            }
            else {
                htmlIds.push(id);
            }

        });

        // matchedIds.forEach((id) => {
        //     render(moduleStat, htmlStat, id);
        // });

        // jsIds.forEach((id) => {
        //     render(moduleStat, htmlStat, id);
        // });

        // htmlIds.forEach((id) => {
        //     render(moduleStat, htmlStat, id);
        // });

        [
            ...matchedIds,
            ...jsIds,
            ...htmlIds,
        ].forEach((id) => {
            render(moduleStat, htmlStat, id);
        });
        // console.log(`jsIds:`, jsIds);
        // console.log(`htmlIds:`, htmlIds);
    },
};