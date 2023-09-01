<template>
  <div
    class="lunch"
    :style="{background: `url('${content.lunch.backgroundUrl}'), rgba(246, 246, 235, 1)`}"
  >
    <DecorMenu
      :decor-url="content.lunch.decor"
      position-y="top"
    />
    <MenuList
      :background-url="content.lunch.backgroundUrl"
      :menu-list="lunchMenu"
      :name-file-menu="nameFileMenu"
    />
    <DecorMenu
      :decor-url="content.lunch.decor"
      position-y="bottom"
    />
  </div>
</template>

<script setup>
import content from '/src/api/json/content.json'
import lunchMenu from  '/src/api/json/lunch-list.json'
import MenuList from '@/components/MenuList'
import DecorMenu from '@/components/DecorMenu'
const nameFileMenu = 'lunch-list'

</script>

<style lang="scss">
.lunch {
  margin-top: 0;
}
</style>
