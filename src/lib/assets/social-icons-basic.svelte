<script lang="ts">
    let { name } = $props();
</script>

{#if name.toLowerCase() === "youtube"}
    <i class="fa-brands fa-youtube"></i>
{:else if name.toLowerCase() === "fediverse"}
    <!-- <svg width="1em" height="1em" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class='{name.toLowerCase()}-icon'>
  <g stroke="currentColor" stroke-width="3" stroke-linecap="round">
    <path d="M37.388 22.661 48.17 41.334zM21.216 50.675l21.563-.001zm-5.385-9.331L26.61 22.67z" stroke-linejoin="round" stroke-width="3.5"/>
    <path d="M38.23 16.92 25.772 9.734m0 7.187 12.454-7.187M32 20.514V6.14M16.667 54.267 4.21 47.079m-.002 7.188 12.455-7.188M10.438 57.86V43.485M59.79 54.267l-12.455-7.188m-.002 7.188 12.455-7.188M53.562 57.86V43.485" fill="none" stroke-width="4.31244"/>
  </g>
</svg> -->
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        class="{name.toLowerCase()}-icon"
    >
        <g stroke="currentColor" stroke-width="3.564" stroke-linecap="round">
            <path
                d="m36.453 22.782 8.911 15.432zM23.088 45.934l17.82-.001zm-4.451-7.712 8.909-15.433z"
                stroke-linejoin="round"
            />
            <path
                d="m37.148 18.037-10.294-5.939m-.001 5.94 10.293-5.94M32 21.008V9.127M19.328 48.902l-10.294-5.94m-.002 5.94 10.294-5.94m-5.146 8.91v-11.88m40.788 8.91-10.294-5.94m-.001 5.94 10.293-5.94m-5.146 8.91v-11.88"
                fill="none"
            />
        </g>
    </svg>
{:else if name.toLowerCase() === "github"}
    <i class="fa-brands fa-github"></i>
{:else if name.toLowerCase() === "discord"}
    <i class="fa-brands fa-discord"></i>
{/if}

<style lang="scss">
    .fediverse-icon {
        background-color: #b3b9b8;
        color: #141b1e;
        border-radius: 50%;
    }
</style>
