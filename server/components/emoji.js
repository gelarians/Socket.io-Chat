const f = (obj) => { 
    let massage = obj.massage


    let text_array = massage.split(" ")
    
    for (let i = 0; i < text_array.length; i++){
      if(text_array[i] === "EMOJI1"){
        text_array[i] = '<img src="/img/01.png" alt="">'
      }
      if(text_array[i] === "EMOJI2"){
        text_array[i] = '<img src="/img/2.png" alt="">'
      }
      if(text_array[i] === "EMOJI3"){
        text_array[i] = '<img src="/img/3.png" alt="">'
      }
      if(text_array[i] === "EMOJI4"){
        text_array[i] = '<img src="/img/4.png" alt="">'
      }
      if(text_array[i] === "EMOJI5"){
        text_array[i] = '<img src="/img/5.png" alt="">'
      }
      if(text_array[i] === "EMOJI6"){
        text_array[i] = '<img src="/img/6.png" alt="">'
      }
      if(text_array[i] === "EMOJI7"){
        text_array[i] = '<img src="/img/7.png" alt="">'
      }
      if(text_array[i] === "EMOJI8"){
        text_array[i] = '<img src="/img/8.png" alt="">'
      }

    }
    var newTxt = text_array.join(' ')
    return newTxt
}
module.exports = f