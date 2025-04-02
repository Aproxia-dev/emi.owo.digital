<script lang="ts">
    import SlideIn from "$lib/components/slidein.svelte";

    let skills: string[][] = [
        ["", "Lua"],
        ["", "Svelte"],
        ["", "Sass"],
        ["", "TypeScript"],
        ["", "Python"],
        ["", "Nix"],
        ["", "Bash"],
        ["", "Linux"],
    ];
</script>

<main>
    <SlideIn
        delay="200"
        initDelay="50"
        duration="400"
        distance="10"
    >
        <!-- [TODO] add images -->
        <div class="skills">
            {#each skills as skill}
                <div class="slident">
                    <img
                        src={skill[0]}
                        alt={skill[1]}
                    />
                    <p>{skill[1]}</p>
                </div>
            {/each}
        </div>
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

        p {
            margin: 0;
            padding: 0.5rem;
        }

        div.skills {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 8px;
            padding: 8px;

            div {
                flex: 1 0 20%;
                /* padding: auto; */
                width: calc(100px - 0.125rem);
                height: calc(100px - 0.125rem);
                background-color: #404749;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>
