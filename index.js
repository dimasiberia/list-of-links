function takeLinks() {
    let text = document.getElementById('text').value
    let links = text.match(/\[.{0,300}?[19||20||21||22]\d\d\]/g);
    links = links.join('\n')
    links = links.replaceAll(/[\[||\]]/g, '').replaceAll(';', '\n').split('\n')
    for (let i = 0; i < links.length; i++) {
        links[i] = links[i].trim()

    }

    let uniqList = new Set(links)
    let list = document.createElement('textarea')
    let uniqListStr = Array.from(uniqList).sort().join('\n')
    list.innerHTML = uniqListStr
    document.body.append(list)
}
