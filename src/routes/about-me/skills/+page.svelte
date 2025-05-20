<script lang="ts">
    import SlideIn from "$lib/components/slidein.svelte";

    let skills: string[][] = [
        ["Lua",        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg"],
        ["Svelte",     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg"],
        ["Sass",       "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg"],
        ["TypeScript", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"],
        ["Python",     "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"],
        ["Nix",        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nixos/nixos-original.svg"],
        ["Bash",       "https://bashlogo.com/img/symbol/svg/full_colored_light.svg"],
        ["Linux",      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"],
    ];
</script>

<main>
    <SlideIn
        delay="200"
        initDelay="50"
        duration="400"
        distance="10"
    >
        <div class="skills">
            {#each skills as skill}
                <div class="slident">
                    <img
                        src={skill[1]}
                        alt={skill[0]}
                        width=48
                        height=48
                    />
                    <p>{skill[0]}</p>
                </div>
            {/each}
        </div>
    </SlideIn>
</main>

<style lang="scss">
    @use 'sass:color';

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
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-auto-columns: 110px;
            grid-auto-rows: 110px;
            gap: 8px;
            padding: 8px;

            div {
                flex: 1 0 20%;
                background-color: #404749;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: background-color 0.2s easeOutQuint;

                &:hover {
                    background-color: color.scale(#404749, $lightness: 10%);
                    cursor: pointer;
                }
            }
        }
    }
</style>
