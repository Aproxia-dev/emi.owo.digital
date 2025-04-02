<script lang="ts">
    import App from "$lib/components/app.svelte";
    import nameTitles from "$lib/assets/nameTitles.json";

    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { typewriter } from "$lib/transitions.svelte";

    import "@fortawesome/fontawesome-free/css/all.min.css";
    import "../../main.scss";

    let { children } = $props();

    let info: string[][] = [
        ["Name", "Emi"],
        ["Age", String(calcAge("2005-01-17"))],
        ["Pronouns", "they/she/it/vi"],
    ];

    let tabs: string[][] = [
        ["Description", "/about-me"],
        ["Skills", "/about-me/skills"],
        ["Setup", "/about-me/setup"],
        // ["Resume", "/about-me/resume"],
        ["Socials", "/about-me/socials"],
    ];

    let nameTitleIn: boolean = $state(false);
    let nameTitleIndex: number = $state(0);

    function randomizeNameTitle() {
        let newIndex: number = Math.floor(
            Math.random() * (nameTitles.length - 1),
        );
        nameTitleIndex = newIndex < nameTitleIndex ? newIndex : newIndex + 1;
    }

    function calcAge(birthStr: string) {
        let birthDate: Date = new Date(birthStr);
        let now: Date = new Date();

        let years = now.getFullYear() - birthDate.getFullYear();

        if (
            now.getMonth() < birthDate.getMonth() ||
            (now.getMonth() == birthDate.getMonth() &&
                now.getDate() < birthDate.getDate())
        )
            years--;

        return years;
    }

    onMount(() => {
        randomizeNameTitle();
        nameTitleIn = true;
    });

    $inspect(page.url.pathname)
</script>

<main>
    {#snippet abouticon()}
        <i class="fa-solid fa-user"></i>
    {/snippet}
    <App name={"About Me"} icon={abouticon}>
        <div id="app-content">
            <div id="header">
                <!-- svelte-ignore a11y_img_redundant_alt -->
                <img
                    src="https://avatars.githubusercontent.com/u/53254254?v=4"
                    alt="Aproxia's Profile Picture"
                />
                <div>
                    <h1>Aproxia</h1>
                    <p class="nametitle">
                        <sub
                            >&ZeroWidthSpace;
                            {#if nameTitleIn}
                                <span
                                    in:typewriter={{ delay: 100, speed: 200 }}
                                    out:typewriter={{
                                        delay: 1500,
                                        backspace: true,
                                    }}
                                    onintrostart={() => randomizeNameTitle()}
                                    onintroend={() => (nameTitleIn = false)}
                                    onoutroend={() => (nameTitleIn = true)}
                                    >{nameTitles[nameTitleIndex]}</span
                                >
                            {/if}
                        </sub>
                    </p>
                    <div id="info-list">
                        {#each ["key", "value"] as type, index}
                            <div id={`info-column-${type}`}>
                                {#each info as info}
                                    <p class={`info-${type}`}>
                                        {@html info[index]}
                                    </p>
                                {/each}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
            <div id="content">
                <div id="tabs">
                    {#each tabs as tab}
                        <a 
                            href={tab[1]}
                            class={page.url.pathname === tab[1] ? "active" : ""}
                        >
                            <span>{tab[0]}</span>
                        </a>
                    {/each}
                </div>
                <div id="content-body">
                    {@render children()}
                </div>
            </div>
        </div>
    </App>
</main>

<style>
    #app-content {
        background-color: #141b1e;
        color: #dadada;
        border-radius: 8px;
        padding: 12px;
        text-align: center;
        margin: 0;
        font-family: "Atkinson Hyperlegible";

        #header {
            padding: 2rem;

            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            gap: 2ch;

            img {
                outline: #404749 solid 2px;
                border-radius: 16px;
                width: 160px;
                height: 160px;
            }
            div {
                h1 {
                    margin: 0;
                }
                p.nametitle {
                    font-family: "Iosevka Web", monospace;
                    margin: 0;
                    max-width: calc(200px + 1ch);
                    word-wrap: break-word;
                }
            }

            #info-list {
                padding-top: 0.5rem;
                display: flex;
                flex-direction: row;
                justify-content: center;
                gap: 1ch;

                * {
                    width: 100px;
                    p {
                        line-height: 0.7;
                    }
                }

                #info-column-key {
                    text-align: right;
                    font-weight: bold;
                }

                #info-column-value {
                    text-align: left;
                }
            }
        }

        #content {
            max-width: 480px;

            #tabs {
                display: flex;
                gap: 0.5rem;

                a {
                    all: unset;
                    flex: 1;
                    
                    padding: 4px;
                    /* border-radius: 8px 8px 0 0; */
                    /* width: 100%; */
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background-color 0.2s easeOutSine;

                    span {
                        position: relative;
                        padding: 0 2px;

                        &::after {
                            content: "";
                            position: absolute;
                            width: 100%;
                            transform: scaleX(0);
                            height: 2px;
                            bottom: 0;
                            left: 0;
                            background-color: #232a2d;
                            transform-origin: bottom center;
                            transition: transform 0.2s easeOutQuint;
                        }
                    }

                    &:hover span::after {
                        transform: scaleX(100%);
                    }

                    &.active {
                        background-color: #8ccf7e;
                        /* background-color: #404749; */
                        color: #232a2d;
                        transition: background-color 0s;
                    }
                    &:not(.active):not(.incredible) {
                        /* background-color: #404749; */
                        background-color: #232a2d;
                        &:hover {
                            background-color: #404749;
                        }
                        span::after {
                            background-color: #dadada;
                        }
                    }
                }
            }

            #content-body {
                /* outline:#c47fd5 solid 2px; */
                /* background-color: #404749; */
                border-radius: 8px;
                /* background-color: #0a1114; */
                background-color: #232a2d;
                margin-top: 8px;
                /* margin: 0.5rem; */
                text-align: left;
            }
        }
    }
</style>
