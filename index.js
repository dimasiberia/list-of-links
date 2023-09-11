function takeLinks() {
    let x = prompt('Введите разделитель цитирования в тексте?','[]');
    let y = `\\${x[0]}`
    let z = `\\${x[1]}`
    let text = document.getElementById('text').value
    const regex1 = RegExp(`${y}.{1,300}?[19||20]\\d\\d${z}`,`g`)
    // let links = text.match(/\[.{1,300}?[19||20]\d\d\]/g);
    console.log(regex1)
    let links = text.match(regex1);
    console.log(links)
    links = links.join('\n');
    const regex2 = new RegExp(`[${y}||${z}]`,'g')
    links = links.replaceAll(regex2, '').replaceAll(';', '\n').split('\n')
    for (let i = 0; i < links.length; i++) {
        links[i] = links[i].trim()
        if (links[i].search(/\d[a||b||c||а||б||в]?,\s\d/) != -1) {
            links[i] = divide(links[i])
            console.log(links[i])
        }

    }
    let str = links.join('\n');
    let arr = str.split('\n')

    let list = document.getElementById('list')
    let uniqList = new Set(arr)
    let arrUniq = Array.from(uniqList).sort()
    let uniqListStr = arrUniq.join('\n')
    list.value = uniqListStr
}
function divide(str) {
    let firstPunc = str.search(/,/);
    let a = firstPunc;
    let newStr = '';
    while (firstPunc != str.length) {
        let secPunc = str.indexOf(',', firstPunc + 1)
        if (secPunc == -1) { secPunc = str.length }
        let link = str.slice(0, a + 1)
        newStr += link + str.slice(firstPunc + 1, secPunc) + '\n'
        firstPunc = secPunc;
    }
}

function sort() {
    let str = document.getElementById('list').value
    let arr = str.split('\n')
    let list = document.getElementById('list')
    let uniqList = new Set(arr)
    let arrUniq = Array.from(uniqList).sort();
    let uniqListStr = arrUniq.join('\n')
    list.value = uniqListStr;
}
function parsingDOI() {
    let text = document.getElementById('reference').value
    console.log(text)
    let arr = text.split('\n');
    for (i of arr) {
        if (i.length > 50) {
            let autors = i.slice(0, 50)
            let count = autors.match(/\.,/g)
            let surName = i.match(/[A-Z||А-Я][a-z||а-я||’||'][a-z||а-я||’||']*/g)
            // let doi = i.match(/10\.1.*\d/)
            let doi = i
            let year = i.match(/[1||2]\d\d\d/)
            if (count == null) {
                let key = surName[0] + ', ' + year;
                //присваивание ссылки если нет дои
                // if (doi == null) {
                //     doi = i
                // }
                localStorage.setItem(key, doi)
                continue;
            }
            if (count.length == 1) {
                let key = surName[0] + ', ' + surName[1] + ', ' + year;
                if (doi == null) {
                    doi = i
                }
                localStorage.setItem(key, doi)
            }
            if (count.length >= 2) {
                let key = '';
                if (surName[0].match(/[а-я]/g) == null) {
                    key = surName[0] + ' et al., ' + year;
                }
                else {
                    key = surName[0] + ' и др., ' + year;
                }
                if (doi == null) {
                    doi = i
                }
                localStorage.setItem(key, doi)
            }
        }
    }

}

function makingListOfReferences() {
    let text = document.getElementById('list').value
    let arr = text.split('\n')
    let listDOI = ''
    for (let i = 0; i < arr.length; i++) {
        if (localStorage.getItem(arr[i]) != null) {
            arr[i] = localStorage.getItem(arr[i])
            if (arr[i].indexOf('10.1') != -1) {
                listDOI += arr[i] + '\n'
            }
        }
        let list = arr.join('\n\n')
        document.getElementById('reference').value = list
    }
}

// async function makeCSLfrom() {
//     let text = document.getElementById('reference').value
//     let arr = text.split('\n')
//     for(i of arr){

//         try {
//             await fetch(`https://cdn.jsdelivr.net/npm/citation-js`);
//             let Cite = require('citation-js')
//             let example = await new Cite(i)
    
//             let output = example.format('bibliography', {
//                 format: 'text',
//                 template: 'apa',
//                 lang: 'en-US'
//             })
//             console.log(output)
//         } catch(e){
//             console.log(i+'\n')
//         }
//     }
// }

