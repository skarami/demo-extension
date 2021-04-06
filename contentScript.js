contentSource = `
let counter = 0;
let rand = makeId(10);

let orig = Document.prototype.createElement;
Document.prototype.createElement = function () {
            let result = orig.apply(this, arguments);
            setNewId(result);
            let children = result.children;
            if (children != undefined) {
                for (let i = 0; i < children.length; i++) {
                    let child = children[i];
                    setNewId(child);
                }
            }
            return result;
        }

function setNewId(node) {
        node['id'] = newID();
}

function newID(){
    counter += 1;
    return rand+counter.toString();
}

function makeId(length) {
    let finalStr    = '';
    let chars       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charsLength = chars.length;
    for (let i = 0; i < length; i++ ) {
        finalStr += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return finalStr;
}

`

var para = document.createElement("script");
var parah = document.createElement("head");
var node = document.createTextNode(contentSource);
para.appendChild(node);
parah.appendChild(para);
document.documentElement.append(parah);

