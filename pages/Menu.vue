<template>
  <div
    class="menu"
    :style="{background: `url('${content.menu.backgroundUrl}'), rgba(243, 237, 225, 1)`}"
  >
    <DecorMenu
      :decor-url="content.menu.decor"
      position-y="top"
    />
    <MenuList
      :background-url="content.menu.backgroundUrl"
      :menu-list="foodMenu"
      :name-file-menu="nameFileMenu"
    />
    <DecorMenu
      :decor-url="content.menu.decor"
      position-y="bottom"
    />
  </div>
</template>

<script setup>
import content from '/src/api/json/content.json'
import foodMenu from  '/src/api/json/menu-list.json'
import MenuList from '@/components/MenuList'
import DecorMenu from '@/components/DecorMenu'
const nameFileMenu = 'menu-list'
</script>

<style lang="scss">
.menu {
  margin-top: 0;
}
</style>
