<script lang='ts'>
    let { name } = $props();
</script>

<div>
{#if      (name.toLowerCase()) === 'youtube'}
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class='{name.toLowerCase()}-icon'>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon stroke='none' fill='currentColor' points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
</svg>
{:else if (name.toLowerCase()) === 'fediverse'}
<svg width="1em" height="1em" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class='{name.toLowerCase()}-icon'>
  <g stroke="currentColor" stroke-width="3" stroke-linecap="round">
    <path d="M37.388 22.661 48.17 41.334zM21.216 50.675l21.563-.001zm-5.385-9.331L26.61 22.67z" stroke-linejoin="round" stroke-width="3.5"/>
    <path d="M38.23 16.92 25.772 9.734m0 7.187 12.454-7.187M32 20.514V6.14M16.667 54.267 4.21 47.079m-.002 7.188 12.455-7.188M10.438 57.86V43.485M59.79 54.267l-12.455-7.188m-.002 7.188 12.455-7.188M53.562 57.86V43.485" fill="none" stroke-width="4.31244"/>
  </g>
</svg>
<!-- <svg width="1em" height="1em" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class='{name.toLowerCase()}-icon'>
  <g stroke="currentColor" stroke-width="3.564" stroke-linecap="round">
    <path d="m36.453 22.782 8.911 15.432zM23.088 45.934l17.82-.001zm-4.451-7.712 8.909-15.433z" stroke-linejoin="round"/>
    <path d="m37.148 18.037-10.294-5.939m-.001 5.94 10.293-5.94M32 21.008V9.127M19.328 48.902l-10.294-5.94m-.002 5.94 10.294-5.94m-5.146 8.91v-11.88m40.788 8.91-10.294-5.94m-.001 5.94 10.293-5.94m-5.146 8.91v-11.88" fill="none"/>
  </g>
</svg> -->
{:else if (name.toLowerCase()) === 'github'}
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class='{name.toLowerCase()}-icon'>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
</svg>
{:else if (name.toLowerCase()) === 'discord'}
<svg width="1em" height="1em" viewBox="0 -28.5 77.405 77.405" preserveAspectRatio="xMidYMid" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" class='{name.toLowerCase()}-icon'>
  <g stroke-width="3.628">
    <path d="M50.641 20.542c-3.55 0-6.462-3.314-6.462-7.35s2.85-7.356 6.462-7.356c3.613 0 6.524 3.314 6.462 7.356 0 4.036-2.85 7.35-6.462 7.35zM26.761 20.542c-3.55 0-6.461-3.314-6.461-7.35s2.849-7.356 6.461-7.356c3.613 0 6.524 3.314 6.462 7.356.006 4.036-2.849 7.35-6.462 7.35z" fill="currentColor"/>
    <path d="M65.194-14.407a62.163 62.163 0 0 0-15.746-4.948 46.17 46.17 0 0 0-2.017 4.187c-5.871-.882-11.688-.882-17.452 0a44.762 44.762 0 0 0-2.04-4.187 61.957 61.957 0 0 0-15.759 4.96C2.215.664-.487 15.349.864 29.825c6.61 4.936 13.015 7.934 19.312 9.896a48.03 48.03 0 0 0 4.136-6.812 40.67 40.67 0 0 1-6.513-3.17 32.39 32.39 0 0 0 1.597-1.263c12.558 5.874 26.204 5.874 38.612 0 .523.435 1.057.859 1.597 1.263a40.568 40.568 0 0 1-6.525 3.176 47.818 47.818 0 0 0 4.136 6.812c6.303-1.962 12.715-4.96 19.324-9.902 1.585-16.782-2.707-31.332-11.346-44.232z" transform="matrix(.94173 0 0 .94173 2.255 .84)" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>
  </g>
</svg>
{/if}
</div>

<style lang='scss'>
  // div {
  //   border-radius:50%;
  //   background-color:#b3b9b8;
  //   height: 1.1em;
  //   width: 1.1em;
  // }

    svg {
        margin:0 auto;
        font-size: 0.9em;
        padding: 0.1em;
        
        // color:#141b1e;
        color:#b3b9b8;

        // &:is(.github-icon) { transform: translate(0, 0.05em); }
        // &:is(.fediverse-icon) { transform: scale(110%);}

        // &:not(.fediverse-icon, .github-icon) {
        //     font-size: 0.9em;
        //     padding: 0.1em;
        // }
    }
</style>