function takeLinks() {
    let text = document.getElementById('text').value
    let links = text.match(/\[.{0,300}?[19||20||21||22]\d\d\]/g);
    links = links.join('\n')
    links = links.replaceAll(/[\[||\]]/g, '').replaceAll(';', '\n').split('\n')
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
