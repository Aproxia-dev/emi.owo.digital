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
            Heyo! My name's Emi, but I usually go by
            Aproxia. Welcome to my cozy little spot
            on the internet!
        </p>
        <p>
            I'm a self-taught software dev,
            designer, sysadmin and artist who's
            simply just excited to make things!
        </p>
        <p>
            I am non-binary and use
            <a href="https://en.pronouns.page/@Aproxia">
                they/she/it/vi pronouns
            </a>, and consider myself a voidpunk fox
            therian.
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
    a {
        display: inline-block;
        position: relative;
        color: #67b0e8;
        text-decoration: none;
        &::after {
            content: "";
            position: absolute;
            width: 100%;
            transform: scaleX(0);
            height: 2px;
            bottom: 2px;
            left: 0;
            background-color: #67b0e8;
            transform-origin: bottom center;
            transition: transform 0.2s easeOutQuint;
        }

        &:hover::after {
            transform: scaleX(100%);
        }
    }
</style>
