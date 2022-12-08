var variables = new Map();
var codesSrc = [];
var result = "";
var printFlag = false;
var printUniFlag = false;
var currentLine = 0;
var isIf = false;
var statements = [
    "사실",
    "잘봐 내",
    "똑바로봐 내",
    "다 니가 만든거잖아",
    "어디 바뀐거없어?",
    "전 그렇게 생각안해요",
    "잉친아",
];
var bans = [
    "이쁘다",
    "예쁘다",
    "귀엽다",
    "700",
];
function translate(inputText, resultText) {
    try {
        resultText.value = run(inputText.value);
    }
    catch (e) {
        resultText.value = e;
    }
}
function run(text) {
    result = "";
    codesSrc = text.split("\n").map(function (e) {
        return e.trim();
    });
    if (codesSrc.shift() !== "짤녀 누구?")
        throw new Error("너 잉친이 아니지");
    if (codesSrc.pop() !== "그래도 우정잉 짱~")
        throw new Error("너 잉친이 아니지");
    for (currentLine = 0; currentLine < codesSrc.length; currentLine++) {
        if (currentLine < 0)
            currentLine = 0;
        console.log(codesSrc[currentLine], (currentLine + 2));
        var jump = excute(codesSrc[currentLine]);
        if (jump) {
            currentLine += jump;
        }
    }
    return result;
}
function excute(code) {
    if (code == "")
        return;
    var ban = bans.find(function (v) { return code.match(v); });
    if (ban)
        throw new Error("너 밴");
    var statement = statements.find(function (v) { return code.startsWith(v); });
    if (isIf) {
        if (code == "전 그렇게 생각안해요")
            isIf = false;
        return;
    }
    if (!statement && printFlag) {
        printFunc(code);
        return;
    }
    else if (!statement && printUniFlag) {
        printUniFunc(code);
        return;
    }
    if (!statement)
        throw new Error("나 다운게 뭔데? " + (currentLine + 2));
    code = code.replace(statement, "").trim();
    switch (statement) {
        case "사실":
            declareFunc(code);
            break;
        case "잘봐 내":
            printFlag = true;
            break;
        case "똑바로봐 내":
            printUniFlag = true;
            break;
        case "다 니가 만든거잖아":
            printEndFunc();
            break;
        case "어디 바뀐거없어?":
            if (getNumber(code.split(" "))[0] != 0)
                isIf = true;
            break;
        case "전 그렇게 생각안해요":
            isIf = false;
            break;
        case "잉친아":
            return getNumber(code.split(" "))[0];
    }
}
function declareFunc(code) {
    var codeList = code.split(" ");
    if (!((codeList[1] == "은" || codeList[1] == "는") &&
        (codeList.slice(-1)[0] == "걸랑" || codeList.slice(-1)[0] == "이걸랑")))
        throw new Error("이래서 유입은 안된다니까 " + (currentLine + 2));
    variables.set(codeList[0], getNumber(codeList.slice(2, -1))[0]);
}
function printFunc(code) {
    if (code == "다 니가 만든거잖아") {
        printEndFunc();
        return;
    }
    else if (code == "다 너때문이잖아") {
        printEndFunc(false);
        return;
    }
    result += getNumber(code.split(" "))[0];
}
function printUniFunc(code) {
    if (code == "다 니가 만든거잖아") {
        printEndFunc();
        return;
    }
    else if (code == "다 너때문이잖아") {
        printEndFunc(false);
        return;
    }
    result += getUnicode(getNumber(code.split(" "))[0]);
}
function printEndFunc(lineChange) {
    if (lineChange === void 0) { lineChange = true; }
    printFlag = false;
    printUniFlag = false;
    if (lineChange)
        result += "\n";
}
function getUnicode(num) {
    return String.fromCharCode(num);
}
function getNumber(codeList, inBracket) {
    if (inBracket === void 0) { inBracket = false; }
    var temp = 0;
    var result = 1;
    for (var i = 0; i < codeList.length; i++) {
        switch (codeList[i]) {
            case "":
                break;
            case "비제잉":
                break;
            case "예민하네":
                temp += 1;
                break;
            case "화났네":
                temp -= 1;
                break;
            case "복수연":
                temp += 2;
                break;
            case "독구타련":
                temp += 4;
                break;
            case "텐련":
                temp += 10;
                break;
            case "장난인데왜그래":
                result *= temp;
                temp = 0;
                break;
            case "뭘봐":
                var bracket = getNumber(codeList.slice(i + 1), true);
                temp += bracket[0];
                i += bracket[1];
                break;
            case "라고할뻔":
                if (!inBracket)
                    throw new Error("아차찹쌀떡! " + (currentLine + 2));
                result *= temp;
                return [result, i + 1];
            default:
                var t = variables.get(codeList[i]);
                if (t == undefined)
                    throw new Error("어라랍스타? " + (currentLine + 2));
                temp += t;
                break;
        }
    }
    if (inBracket)
        throw new Error("아차찹쌀떡! " + (currentLine + 2));
    result *= temp;
    return [result, i];
}
//# sourceMappingURL=inglang.js.map