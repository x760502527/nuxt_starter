<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app

    >
      <v-toolbar color="primary darken-1" dark>
        <v-toolbar-title class="ml-0 pl-3">

          <img style="top: 4px;position: relative;" height="24" width="24"
               src="~assets/images/logo_blue.png" alt="">
          <span v-show="!miniVariant" style="font-size:20px;height:24px;margin-left: 12px;">汇安谷</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!--<template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="miniVariant=!miniVariant">
            <v-icon>reorder</v-icon>
          </v-btn>
        </div>
      </template>-->
    </v-navigation-drawer>
    <v-app-bar
      class="primary"
      :class="$vuetify.theme.dark?'darken-2':'light-2'"
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon  style="color:#ffffff" @click.stop="drawer = !drawer"/>
      <v-btn
        style="color:#ffffff"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <!--      <v-btn-->
      <!--        icon-->
      <!--        @click.stop="clipped = !clipped"-->
      <!--      >-->
      <!--        <v-icon>mdi-application</v-icon>-->
      <!--      </v-btn>-->
      <!--      <v-btn-->
      <!--        icon-->
      <!--        @click.stop="fixed = !fixed"-->
      <!--      >-->
      <!--        <v-icon>mdi-minus</v-icon>-->
      <!--      </v-btn>-->
      &nbsp;
      <v-toolbar-title v-text="title" style="color:#ffffff"/>
      <v-spacer/>
<!--      <v-btn-->
<!--        icon-->
<!--        @click.stop="rightDrawer = !rightDrawer"-->
<!--        style="color:#ffffff"-->
<!--      >-->
<!--        <v-icon>mdi-menu</v-icon>-->
<!--      </v-btn>-->
    </v-app-bar>
    <v-content style="background:#F3F6F8">
      <nuxt/>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      temporary
      fixed
    >
      <v-list>
        <v-subheader>切换主题</v-subheader>
        <v-list-item>
            <v-btn class="theme_btn" fab small color="white" @click="changeTheme('white')">
            </v-btn>
            <v-btn class="theme_btn" fab small color="black" style="color:#999" @click="changeTheme('black')">
              <v-icon>brightness_3</v-icon>
            </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--    <v-footer-->
    <!--      :fixed="fixed"-->
    <!--      app-->
    <!--    >-->
    <!--      <span>&copy; 2019</span>-->
    <!--    </v-footer>-->
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        items: [
          {
            icon: 'mdi-apps',
            title: '主页',
            to: '/'
          },
          {
            icon: 'mdi-alarm-light',
            title: '报警查询',
            to: '/alarmSearch'
          },
          {
            icon: 'mdi-oil-temperature',
            title: '温度查询',
            to: '/temperatureSearch'
          }
        ],
        miniVariant: true,
        right: true,
        rightDrawer: false,
        title: '分布式光纤温度传感解析软件',
        theme_action:0
      }
    },
    computed: {
      drawerBar() {
        return !this.drawer
      }
    },
    methods:{
      changeTheme(theme){
        if(theme == 'white')
          this.$vuetify.theme.dark = false
        else if(theme == 'black')
          this.$vuetify.theme.dark = true
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
<style lang="scss">
  .theme_btn + .theme_btn{
    margin-left:4px;
  }
</style>
