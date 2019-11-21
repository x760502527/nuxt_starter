import {getEquipment} from '@/services/apiService'
export const state = () => ({
  equipmentInfo: null
})

export const getters = {
  getEquipmentInfo(){

  }
}

export const mutations = {
  increment (state) {
    state.counter++
  }
}

export const actions = {
  async getEquipment(context){
    const data = await getEquipment()
    const { channel,length,state,type } = data
    this.channel = channel

    let slideMax =  []
    for (let i = 0; i < channel; i++) {
      slideMax.push(i+1)
    }
    this.slideMax = slideMax
    this.length = Math.round(length /1000) + 'km'
    this.state = state
    this.type = type
  }
}
