<script lang="ts">
    import { db } from "../firebase/firebase";
    import { collection, addDoc } from "firebase/firestore";

    let title = "";
    let info = "";
    let time = "";
    let height = "";
    let length = "";
    let creator = "";
    let image = "";

    // Vandring/skidor
    let skiOrHike = true;
    let skiOrHikeOptions = [
        { label: "Vandring", value: true },
        { label: "Skidor", value: false },
    ];

    // Svårighetsgrad
    let level = "Enkel";
    let levelOptions = ["Enkel", "Medel", "Svår"];

    export let closeAddModal: () => void;

    const addTour = async () => {
        if (!title || !info || !time || !height || !length || !level) {
            return alert("Fyll i alla fält!");
        }

        try {
            await addDoc(collection(db, "tour-card"), {
                title,
                info,
                time,
                height,
                length,
                level,
                skiOrHike,
                creator,
                image,
                createdAt: new Date(),
            });
            alert("Tur tillagd!");
            closeAddModal();
        } catch (error) {
            console.error("Fel vid tilläggning:", error);
        }
    };
</script>

<div class="modal-overlay">
    <div class="modal-content">
        <h2 class="title">Lägg till tur</h2>
        <input type="text" bind:value={title} placeholder="Namn på turen" />
        <input type="text" bind:value={image} placeholder="Lägg till bild" />
        <textarea bind:value={info} placeholder="Beskriv turen"></textarea>
        <input type="text" bind:value={time} placeholder="Tid (t.ex. 2h)" />
        <input type="text" bind:value={height} placeholder="Höjd (m)" />
        <input type="text" bind:value={length} placeholder="Längd (km)" />
        <input
            type="text"
            bind:value={creator}
            placeholder="Vem har skapat inlägget?"
        />

        <select bind:value={level}>
            {#each levelOptions as option}
                <option value={option}>{option}</option>
            {/each}
        </select>

        <select bind:value={skiOrHike}>
            {#each skiOrHikeOptions as option}
                <option value={option.value}>{option.label}</option>
            {/each}
        </select>

        <button class="save-btn" on:click={addTour}>Spara</button>
        <button class="close-btn" on:click={closeAddModal}>&#x2715;</button>
    </div>
</div>

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        color: white;
    }

    .modal-content {
        display: flex;
        flex-direction: column;
        background-color: var(--dark-blue);
        justify-content: center;
        align-items: center;
        padding: 20px;
        border-radius: 8px;
        width: 350px;
        text-align: center;
    }

    .modal-content input {
        width: 280px;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
        font-size: 16px;
        background-color: rgb(255, 255, 255);
        color: rgb(0, 0, 0);
        border: none;
    }
    textarea {
        width: 280px;
        height: 200px;
        padding: 0.8em;
        border: none;
        margin-bottom: 1em;
        border-radius: 0.3em;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    select {
        width: 300px;
        padding: 0.5em;
        margin-bottom: 1em;
        border: none;
    }

    .save-btn {
        width: 110px;
        padding: 0.5em;
        font-size: 14px;
        border-radius: 0.3em;
        border: none;
        background-color: var(--red);
    }

    .close-btn {
        position: absolute;
        border: none;
        top: 7em;
        right: 3em;
        height: 2em;
        width: 2em;
        border-radius: 1em;
        background-color: var(--red);
    }
</style>
