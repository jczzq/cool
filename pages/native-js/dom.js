var h = document.createElement;
var t = document.createTextNode;

function appEntry_1(params) {
    var a1 = document.createElement('a');
    a1.appendChild(document.createTextNode('a标签'));
    a1.href = '#app';
    document.body.appendChild(a1);
    // 文档编码
    var p1 = document.createElement('p');
    p1.appendChild(document.createTextNode(document.characterSet));
    document.body.appendChild(p1);
    
    // 样式操作
    var style1 = document.createElement('style');
    style1.type = 'text/css';
    style1.appendChild(document.createTextNode('a{color:green}'));
    document.body.appendChild(style1);
};
appEntry_1();
