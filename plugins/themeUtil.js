import Vue from 'vue'

Vue.prototype._getTheme = function () {
  return this.$vuetify.theme.currentTheme
}

//name主题名字 level主题深度级别
Vue.prototype._getColor = function (name, level) {
  if (name) {
    if (level) {
      let arr = ['darken4','darken4', 'darken3', 'darken2', 'darken1', 'base', 'lighten1', 'lighten2', 'lighten3', 'lighten4', 'lighten5']
      if(this.$vuetify.theme.dark){
        arr.reverse()
      }
      //base 的位置
      let baseLoc= arr.indexOf('base')
      //如果小于arr 或 大于 arr 的长度
      level = level + baseLoc <= 0 ? 0 : level + baseLoc > arr.length-1? arr.length-1 : level
      //找到级别
      let colorOb = this.$vuetify.theme['parsedTheme'][name][arr[level+baseLoc]]
      return colorOb
    } else {
      return this.$vuetify.theme['currentTheme']['name']
    }
  } else {
    return this.$vuetify.theme.dark ? '#ffffff' : '#000000'
  }
}

Vue.prototype._getPrimary = function () {
  return this.$vuetify.theme.currentTheme.primary
}

Vue.prototype._getAccent = function () {
  return this.$vuetify.theme.dark ? this.$vuetify.theme.themes.dark.accent : this.$vuetify.theme.themes.light.accent
}
