<template>
  <div
    :style="{background: `url('${content.barMap.backgroundUrl}'), rgba(252, 252, 251, 1)`}"
    class="map-bar"
  >
    <DecorMenu
      :decor-url="content.barMap.decor"
      position-y="top"
    />
    <MenuList
      :background-url="content.barMap.backgroundUrl"
      :menu-list="beverages"
      :name-file-menu="nameFileMenu"
    />
    <DecorMenu
      :decor-url="content.barMap.decor"
      position-y="bottom"
    />
  </div>
</template>

<script setup>
import content from '/src/api/json/content.json'
import beverages from  '/src/api/json/mapBar-list.json'

import MenuList from '@/components/MenuList'
import DecorMenu from '@/components/DecorMenu'
const nameFileMenu = 'mapBar-list'

</script>

<style lang="scss">
.map-bar {
  margin-top: 0;
}
</style>
