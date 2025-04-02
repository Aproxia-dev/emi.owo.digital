<script lang="ts">
    import SlideIn from "$lib/components/slidein.svelte";
</script>

<main>
    <SlideIn
        delay="200"
        initDelay="50"
        duration="400"
        distance="10"
    >
        <p>
            i have a dripped out battlestation trust
            me bro
        </p>
        <p>
            <sub
                >i really don't feel like writing
                this rn</sub
            >
        </p>
    </SlideIn>
</main>

<style>
    main {
        max-width: 480px;
        border-radius: 8px;
        background-color: #232a2d;
        margin-top: 8px;
        text-align: left;
        height: auto;
    }

    p {
        margin: 0;
        padding: 0.5rem;
    }
    sub {
        color: #b3b9b8;
    }
</style>
