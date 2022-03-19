let variables = new Map<string, number>();
let codesSrc: string[] = []
let result : string = ""
let printFlag : boolean = false
let printUniFlag : boolean = false
const statements = [
  "사실",
  "잘봐 내",
  "똑바로봐 내",
  "다 니가 만든거잖아",
  "어디 바뀐거없어?",
  "전 그렇게 생각안해요",
]
const bans = [
  "이쁘다",
  "예쁘다",
  "귀엽다",
  "700",
]

function translate(inputText : HTMLTextAreaElement ,resultText: HTMLTextAreaElement)  {
  try{
    resultText.value = run(inputText.value)
  }catch(e){
    resultText.value = e
  }
}

function run(text : string){
  result = ""
  codesSrc = text.split("\n").map((e) => {
    return e.trim();
  })

  if (codesSrc.shift() !== "짤녀 누구?") throw new Error("너 잉친이 아니지")
  if (codesSrc.pop() !== "그래도 우정잉 짱~") throw new Error("너 잉친이 아니지")

  for(var i = 0; i<codesSrc.length; i++){
    excute(codesSrc[i])
  }

  return result
}

function excute(code : string){
  if(code == "") return

  const ban = bans.find((v) => code.match(v))
  if(ban) throw new Error("너 밴")
  const statement = statements.find((v) => code.startsWith(v))
  
  if(!statement && printFlag){
    printFunc(code)
    return
  }else if(!statement && printUniFlag){
    printUniFunc(code)
    return
  }
  if(!statement) throw new Error("나 다운게 뭔데?")

  switch(statement){
    case "사실":
      declareFunc(code)
      break

    case "잘봐 내":
      printFlag = true
      break

    case "똑바로봐 내":
      printUniFlag = true
      break

    case "다 니가 만든거잖아":
      break

    case "어디 바뀐거없어?":
      break

    case "전 그렇게 생각안해요":
      break

  }
}

function declareFunc(code: string){
  let codeList = code.split(" ") 
  if(!((codeList[2] == "은" || codeList[2] == "는") &&
    (codeList.slice(-1)[0] == "걸랑" || codeList.slice(-1)[0] == "이걸랑"))
  ) throw new Error("이래서 유입은 안된다니까")
  
  variables.set(codeList[1],getNumber(codeList.slice(3,-1)))
}

function printFunc(code: string){
  if(code == "다 니가 만든거잖아") {
    printEndFunc()
    return
  }
  result += getNumber(code.split(" "))
}

function printUniFunc(code: string){
  if(code == "다 니가 만든거잖아") {
    printEndFunc()
    return
  }
  result += getUnicode(getNumber(code.split(" ")))
}

function printEndFunc(){
  printFlag = false
  printUniFlag = false
  result += "\n"
}

function getNumber(codeList: string[]){
  var temp = 0
  var result = 1
  for(var i=0; i<codeList.length; i++){
    console.log(codeList[i])
    switch(codeList[i]){
      case "비제잉" :
        break

      case "예민하네" :
        temp += 1
        break

      case "화났네" :
        temp -= 1
        break

      case "복수연" :
        temp += 2
        break

      case "독구타련" :
        temp += 4
        break

      case "텐련" :
        temp += 10
        break
      
      case "장난인데왜그래" :
        result *= temp
        temp = 0
        break

      default:
        var t = variables.get(codeList[i])
        if(t == undefined) throw new Error("어라랍스타?")
        temp += t
        break
    }
  }
  result *= temp
  return result
}

function getUnicode(num: number){
  return String.fromCharCode(num)
}