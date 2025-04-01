<script lang="ts">
    import App from '$lib/components/app.svelte';
    import nameTitles from '$lib/assets/nameTitles.json';
    import SlideIn from '$lib/components/slidein.svelte';
    import honestlyQuiteIncredible from '$lib/assets/honestly-quite-incredible.jpg';

    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import { typewriter } from '$lib/transitions.svelte'

    import '@fortawesome/fontawesome-free/css/all.min.css';
    import '../../main.scss';

    let info: string[][] = [
        ['Name', 'Emi'],
        ['Age', String(calcAge('2005-01-17'))],
        ['Pronouns', 'they/she/it/vi']
    ]

    let tabs: string[][] = [
        ["Description", "desc"],
        ["Skills", "skills"],
        ["Setup", "setup"],
        // ["Resume", "resume"],
        ["Socials", "social"],
    ]

    let skills: string[][] = [
        ['', 'Lua'],
        ['', 'Svelte'],
        ['', 'Sass'],
        ['', 'TypeScript'],
        ['', 'Python'],
        ['', 'Nix'],
        ['', 'Bash'],
        ['', 'Linux'],
    ]

    let nameTitleIn:    boolean = $state(false);
    let nameTitleIndex: number  = $state(0);
    let mounted: boolean        = $state(false)

    function randomizeNameTitle() {
        let newIndex: number = Math.floor(Math.random() * (nameTitles.length - 1));
        nameTitleIndex = newIndex < nameTitleIndex ? newIndex : newIndex + 1;
    }
    
    function calcAge(birthStr: string) {
        let birthDate: Date = new Date(birthStr);
        let now: Date       = new Date();

        let years = now.getFullYear() - birthDate.getFullYear();

        if (now.getMonth() <  birthDate.getMonth() ||
            now.getMonth() == birthDate.getMonth() && now.getDate() < birthDate.getDate())
            years--;
        
        return years;
    }

    onMount(() => { randomizeNameTitle(); nameTitleIn = true; mounted = true; })
</script>

<main>
    {#snippet abouticon()}
        <i class="fa-solid fa-user"></i> 
    {/snippet}
    <App name={'About Me'} icon={abouticon}>
        <div id='app-content'>
            <div id='header'>
            <!-- svelte-ignore a11y_img_redundant_alt -->
                <img src='https://avatars.githubusercontent.com/u/53254254?v=4' alt="Aproxia's Profile Picture">
                <div>
                    <h1>Aproxia</h1>
                    <p class='nametitle'><sub>&ZeroWidthSpace;
                        {#if nameTitleIn}
                            <span
                                in:typewriter={{ delay: 100, speed: 200 }}
                                out:typewriter={{ delay: 1500, backspace: true}}
                                onintrostart={() => randomizeNameTitle() }
                                onintroend={  () => nameTitleIn = false }
                                onoutroend={  () => nameTitleIn = true  }
                            >{nameTitles[nameTitleIndex]}</span>
                        {/if}
                    </sub></p>
                    <div id='info-list'>
                        {#each ['key', 'value'] as type, index}
                            <div id={`info-column-${type}`}>
                            {#each info as info}
                                <p class={`info-${type}`}>{@html info[index]}</p>
                            {/each}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
            <div id='content'>
                <div id='tabs'>
                    <div>
                    {#each tabs as tab}
                        <button onclick={() => goto(`?tab=${tab[1]}`)} class:active={page.url.searchParams.get('tab') === tab[1]}>
                            <span>{tab[0]}</span>
                        </button>
                    {/each}
                    </div>
                    <div>
                    {#if !['desc', 'skills', 'setup', 'social'].includes(page.url.searchParams.get('tab')!)}
                        <button class='incredible'><span>{page.url.searchParams.get('tab')}</span></button>
                    {/if}
                    </div>
                </div>
                <div id='content-body'>
                    {#if mounted}
                        {#key page.url.searchParams.get('tab')}
                        <SlideIn delay=200 initDelay=50 duration=400 distance=10>
                            {#if page.url.searchParams.get('tab') === 'desc'}
                                    <p>Heyo! My name's Emi, but I usually go by Aproxia. Welcome to my cozy little spot on the internet!</p>
                                    <p>I'm a self-taught software dev, designer, sysadmin and artist who's simply just excited to make things!</p>
                                    <p>I am non-binary and use <a href='https://en.pronouns.page/@Aproxia'>they/she/it/vi pronouns</a>, and consider myself a voidpunk fox therian.</p>
                            {:else if page.url.searchParams.get('tab') === 'skills'}
                                <!-- [TODO] add images -->
                                 <div class='skills'>
                                {#each skills as skill, i}
                                    <div>
                                        <img src={skill[0]} alt={skill[1]}>
                                        <p>{skill[1]}</p>
                                    </div>
                                {/each}
                                </div>
                            {:else if page.url.searchParams.get('tab') === 'setup'}
                                <p>i have a dripped out battlestation trust me bro</p>
                                <p><sub>i really don't feel like writing this rn</sub></p>
                            {:else if page.url.searchParams.get('tab') === 'social'}
                                <p>ghhhhhhh</p>
                                <ul>
                                    <li><a href='https://www.youtube.com/channel/UCk1zcHlOko3j4UcJh-0WWig'>Youtube</a></li>
                                    <li><a href='https://social.owo.digital/@emily'>Fediverse</a></li>
                                    <li><a href='https://github.com/Aproxia-dev'>GitHub</a></li>
                                    <li>Discord: mkshift</li>
                                </ul>
                                <p>i don't wanna bother with this right now fuck off</p>
                            {:else}
                                <div style='text-align: center; padding-top: 8px;'>
                                    <img src={honestlyQuiteIncredible} alt='honestly quite incredible...'>
                                    <p>honestly quite incredible...</p>
                                </div>
                            {/if}
                        </SlideIn>
                        {/key}
                    {/if}
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
                h1 { margin: 0; }
                p.nametitle {
                    font-family: "Iosevka Web", monospace;
                    margin: 0;
                    max-width:calc(200px + 1ch);
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
                    p { line-height: 0.7; }
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
                div {
                    display: flex;
                    gap: 0.5rem;

                    button {
                        padding: 4px;
                        flex: 1;
                        /* border-radius: 8px 8px 0 0; */
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: background-color 0.2s easeOutSine;

                        span {
                            position: relative;
                            padding: 0 2px;
                        
                            &::after {
                                content: '';
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

                        &:hover span::after { transform: scaleX(100%); }

                        &.incredible {
                            background-color: #e57474;
                            margin-top: 0.5rem;
                            color: #232a2d;
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
                            &:hover { background-color: #404749; }
                            span::after { background-color: #dadada; }
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
                p { margin: 0; padding: 0.5rem; } 
                a {
                    display: inline-block;
                    position: relative;
                    color: #67b0e8;
                    text-decoration: none;
                    &::after {
                        content: '';
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

                    &:hover::after { transform: scaleX(100%); }
                }

                sub { color: #b3b9b8; }

                div.skills {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    gap: 8px;
                    padding: 8px;
                    
                    div {
                        flex: 1 0 20%;
                        /* padding: auto; */
                        width:  calc(100px - 0.125rem);
                        height: calc(100px - 0.125rem);
                        background-color: #404749;
                        border-radius: 8px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                }

                ul {
                    margin: 0;
                    padding: 0.5rem;
                    padding-left: 1rem;
                    li { list-style-type: none; }
                }
            }
        }
    }
</style>