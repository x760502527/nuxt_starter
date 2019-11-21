import Vue from 'vue'

let global ={
  alarmTypes:[{
    text:"全部",
    value:0
  },{
    text:"一级高温报警",
    value:1
  },{
    text:"二级高温报警",
    value:2
  },{
    text:"三级高温报警 ",
    value:3
  },{
    text:"正温升报警",
    value:5
  },{
    text:"区域温差报警",
    value:6
  },{
    text:"断纤报警",
    value:7
  },{
    text:"其他报警",
    value:11
  }],
  getAlarmTypesText(value) {
    let ob = this.alarmTypes.find((item)=>{
        if(item.value==value){
        return true
      }
    })
    if(!ob || !ob.text){
      return value
    }
    return ob.text
  }
}

Vue.prototype.global = global

export default global
