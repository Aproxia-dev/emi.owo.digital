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
            <p>ghhhhhhh</p>
            <ul class="slident">
                <li>
                    <a
                        href="https://www.youtube.com/channel/UCk1zcHlOko3j4UcJh-0WWig"
                        >Youtube</a
                    >
                </li>
                <li>
                    <a
                        href="https://social.owo.digital/@emily"
                        >Fediverse</a
                    >
                </li>
                <li>
                    <a
                        href="https://github.com/Aproxia-dev"
                        >GitHub</a
                    >
                </li>
                <li>Discord: mkshift</li>
            </ul>
            <p>
                i don't wanna bother with this right now
                fuck off
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


    ul {
        margin: 0;
        padding: 0.5rem;
        padding-left: 1rem;
        li {
            list-style-type: none;
        }
    }
</style>
