<script lang="ts">
    import Navbar from "./navbar.svelte";
    import "../main.scss";

    let { children } = $props();
</script>

<div class="site">
    <Navbar />

    <main>
        {@render children()}
    </main>
</div>
