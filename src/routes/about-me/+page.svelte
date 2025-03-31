<script lang="ts">
    import App from '$lib/components/app.svelte';
    import nameTitles from '$lib/assets/nameTitles.json';

    import { onMount } from 'svelte';
    import { typewriter } from '$lib/transitions.svelte'

    import '@fortawesome/fontawesome-free/css/all.min.css';
    import '../../main.scss';

    let info: string[][] = [
        ['Name', 'Emi'],
        ['Age', String(calcAge('2005-01-17'))],
        ['Pronouns', 'she/they/it/vi']
    ]

    let tabs: string[][] = [
        ["Description", "desc"],
        ["Skills", "skills"],
        ["Setup", "setup"],
        // ["Resume", "resume"],
        ["Socials", "social"],
    ]

    let nameTitleIn:    boolean = $state(false);
    let nameTitleIndex: number = $state(0);

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

    onMount(() => { randomizeNameTitle(); nameTitleIn = true; })

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

                </div>
                <div id='content-body'>

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
            padding: 2rem 3rem;

            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 4ch;

            img {
                outline: #404749 solid 2px;
                border-radius: 16px;
                width: 128px;
                height: 128px;
            }
            div {
                h1 { margin: 0; }
                p.nametitle {
                    font-family: "Iosevka", monospace;
                    margin: 0;
                    max-width:calc(200px + 1ch);
                    word-wrap: break-word;
                }
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
</style>