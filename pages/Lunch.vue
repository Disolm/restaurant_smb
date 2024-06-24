<template>
  <div
      class="lunch"
      :style="{background: `url('${content.lunch.backgroundUrl}'), rgba(246, 246, 235, 1)`}"
  >
    <DecorMenu
        :decor-url="content.lunch.decor"
        position-y="top"
    />
    <UiButtonGroup justify-content="center" class="lunch__button-group">
      <UiButton tone="dark" @click="typeWeek = true">ერთი неделя</UiButton>
      <UiButton tone="dark" @click="typeWeek = false">სხვა неделя</UiButton>
    </UiButtonGroup>
    <MenuList
        :background-url="content.lunch.backgroundUrl"
        :menu-list="menu"
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
import lunchMenu from '/src/api/json/lunch-list.json'
import lunchMenu2 from '/src/api/json/lunch-list_2.json'
import MenuList from '@/components/MenuList'
import DecorMenu from '@/components/DecorMenu'
const typeWeek = ref(false)
const nameFileMenu = computed(() => {
  if (typeWeek.value) {
    return 'lunch-list'
  } else {
    return 'menu-list_2'
  }
})
const menu = computed(() => {
  if (typeWeek.value) {
    return lunchMenu
  } else {
    return lunchMenu2
    }
})
</script>

<style lang="scss">
.lunch {
  margin-top: 0;

  &__button-group > button {
    margin: 0 12px;
  }
}
</style>
