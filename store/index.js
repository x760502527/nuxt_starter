export const state = () => ({
  popupState: null,
  layer:{
    markers:true,
    equipments:true,
    pipelines:true,
    alarms:true,
    text:true,
  }
})

export const getters = {
  getEquipmentInfo(){

  }
}

export const mutations = {
  changePopupState (state,componentName) {
    state.popupState = componentName
  },
  changeLayerById(state,obj){
    state.layer[obj['id']] = obj['value']
  },
  changeLayer(state,obj){
    state.layer = obj
  },
  changeLayerAll(state,boolean){
    for(let item in state.layer){
      state.layer[item] = boolean
    }
  }
}

export const actions = {
  async getEquipment(context){

  }
}
