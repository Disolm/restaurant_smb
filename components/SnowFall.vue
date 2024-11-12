<template>
  <div class="snowfall">
    <client-only>
      <div
          v-for="snowflake in randomNumber(50, 10)"
          :key="snowflake"
          class="snowfall__snowflake"
          :style="{
'--left': randomNumber(100) + 'vw',
'--left-ini': randomNumber(20) - 10 + 'vw',
'--left-end': randomNumber(20) - 10 + 'vw',
'--speed': 4 + randomNumber(12, 8) + 's',
'--size': 0.1 + randomNumber(4) * 0.2 + 'vw',
'--delay': -randomNumber(15) + 's',
'--url': 'url(' + locationHref + '/image/snowflake/snowflake0' + randomNumber(5, 0) + '.svg)',
'--opacity': randomNumber(10,5) * 0.1,
'--rot': 'rotate(' + randomNumber(1,-1, true) * 360 + 'deg)',
}"
      />
    </client-only>
    <slot/>
  </div>
</template>

<script setup>
let locationHref = '/';
onMounted(()=> {
  locationHref = location.origin;
})

function randomNumber(numTo, numFrom = 0, isNotZero) {
  const result = Math.floor(Math.random() * (numTo - numFrom + 1) + numFrom);
  if (isNotZero && result === 0) {
    return randomNumber(numTo, numFrom, true);
  } else {
    return result;
  }
}

</script>

<style scoped lang="scss">
.snowfall {
  position: fixed;
  top: 0;
  left: 0;

  &__snowflake {
    z-index: 100000;
    width: var(--size);
    height: var(--size);
    background: no-repeat center / contain var(--url);
    opacity: var(--opacity);
    border-radius: 50%;
    position: absolute;
    top: -5vh;
    left: var(--left);
    pointer-events: none;
    animation: snowfall var(--speed) linear infinite;
    animation-delay: var(--delay);
  }

  @keyframes snowfall {
    0% {
      transform: translate3d(var(--left-ini), 0, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(var(--left-end), 110vh, 0) var(--rot);
    }
  }
}


</style>