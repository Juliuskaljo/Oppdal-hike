<script lang="ts">
    import { signOut } from "firebase/auth";
    import { auth } from "../firebase/firebase";
    import { user } from "../Store/store";

    export let openAddTourModal: () => void;

    const logout = async () => {
        try {
            await signOut(auth);
            user.set(null);
            console.log("Utloggad!");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Fel vid utloggning:", error.message);
            } else {
                console.error("Ett okänt fel inträffade vid utloggning.");
            }
        }
    };
</script>

<main>
    <div class="background">
        <h1 class="Header">Oppdal <br /> Hike&Ski</h1>

        <div class="search">
            <input
                class="searchbar"
                type="text"
                placeholder="Sök efter tur, svårhetsgrad etc"
            />
        </div>

        <div class="options">
            <ul>
                <li>Vandringar <img src="hike.svg" alt="ski" /></li>
                <li>Skidor <img src="ski.svg" alt="ski" /></li>
            </ul>
        </div>

        <div class="add-tour">
            <button on:click={openAddTourModal} class="add-btn">
                Skapa ny</button
            >
        </div>
        <div class="logout-btn">
            <button on:click={logout}>
                <img src="logout.svg" alt="logout" />
            </button>
        </div>
    </div>
</main>

<style>
    .background {
        background-image: url("OppdalHike.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        /* filter: grayscale(100%); */
        height: 100vh;
    }

    .Header {
        font-size: 1.875rem;
        color: var(--dark-blue);
        font-weight: 300;
        padding-bottom: 1rem;
        padding-left: 2rem;
        padding-top: 2rem;
        margin: 0;
    }

    ul {
        list-style: none;
        padding-left: 2em;
        margin-top: 2em;
    }

    li {
        margin-top: 1em;
        font-size: 20px;
        color: var(--dark-blue);
    }

    .searchbar {
        padding: 0.9em;
        border-radius: 0.5em;
        border: none;
        width: 250px;
        font-size: 16px;
    }

    .add-btn {
        background-color: var(--dark-blue);
        color: #ffffff;
        padding: 0.5em;
        border: none;
        border-radius: 0.5em;
        font-size: 16px;
    }

    .add-tour {
        margin-top: 0.75rem;
        margin-left: 2rem;
    }

    .search {
        /* opacity: 0.55; */
        margin-left: 2rem;
        border-radius: 1rem;
    }

    .logout-btn {
        position: absolute;
        top: 2em;
        right: 2em;
        width: 2em;
        height: 1em;
    }

    .logout-btn button {
        background-color: var(--dark-blue);
        color: white;
        padding: 0.5em;
        border-radius: 5px;
        border: none;
        cursor: pointer;
    }
</style>
