<script lang="ts">
    import { db } from "../firebase/firebase";
    import { collection, getDocs } from "firebase/firestore";
    import { onMount } from "svelte";

    let tours: any = [];

    const fetchTours = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "tour-card"));
            tours = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            console.error("Fel vid hämtning av turer:", error);
        }
    };

    onMount(fetchTours);
</script>

<section class="Card-main">
    <h1 class="tour-header">Vandringar</h1>
    <hr />

    {#if tours.length === 0}
        <p>Inga turer tillgängliga.</p>
    {/if}

    {#each tours as tour}
        <div class="card">
            <!-- svelte-ignore a11y_img_redundant_alt -->
            <img class="picture" src={tour.image} alt="picture" />
            <h3 class="card-name">{tour.title}</h3>
            <textarea readonly>{tour.info}</textarea>

            <div class="info-grid">
                <p>Tid: {tour.time}h</p>
                <p>Höjd: {tour.height}m</p>
                <p>Längd: {tour.length}km</p>
                <p>Svårighet: {tour.level}</p>
            </div>

            <p class="creator">
                Inlägget är skapat av: {tour.creator || "Okänd"}
            </p>

            <div class="card-btn">
                <button class="delete-btn">
                    <img src="Group 3.svg" alt="delete-icon" />
                </button>
                <!-- <button class="edit-btn">
                    <img src="Group 4.svg" alt="edit-icon" />
                </button> -->
            </div>
        </div>
    {/each}
</section>

<style>
    .Card-main {
        background-color: rgb(246, 246, 246);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tour-header {
        color: var(--dark-blue);
        margin-bottom: 0;
    }

    hr {
        height: 1px solid var(--blue);
        width: 80%;
        margin-bottom: 2em;
    }

    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 340px;
        height: 600px;
        border: 1px solid black;
        margin-bottom: 4em;
        border-radius: 0.5em;
        background-color: var(--dark-blue);
    }

    .picture {
        border: 1px solid black;
        background-color: rgb(168, 58, 58);
        width: 320px;
        height: 200px;
        margin-top: -20px;
        border-radius: 0.5em;
    }

    .card-name {
        color: white;
    }

    textarea {
        width: 290px;
        height: 200px;
        padding: 0.3em;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    .info-grid {
        display: grid;
        margin: 1.5em 1.5em 0 1.5em;
        grid-template-columns: 2fr 1fr;
        color: white;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    .creator {
        color: white;
    }

    .delete-btn,
    .edit-btn {
        background-color: rgba(255, 255, 255, 0);
        margin: 0.5em;
        border-radius: 0.3em;
        border: 1px solid var(--lime);
    }
</style>
