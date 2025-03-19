<script lang="ts">
    import { onMount } from "svelte";
    import { user, loading } from "../src/Store/store";
    import { onAuthStateChanged } from "firebase/auth";
    import { auth } from "./firebase/firebase";
    import RegisterModal from "./lib/RegisterModal.svelte";
    import Login from "./lib/Login.svelte";
    import Landingpage from "./lib/Landingpage.svelte";
    import Cards from "./lib/Cards.svelte";
    import "./app.css";
    import AddTour from "./lib/AddTour.svelte";
    import Footer from "./lib/Footer.svelte";

    let showModal = false;

    const closeModal = () => {
        showModal = false;
    };

    const openModal = () => {
        showModal = true;
    };

    let showAddTourModal = false;

    const openAddTourModal = () => {
        showAddTourModal = true;
    };

    const closeAddTourModal = () => {
        showAddTourModal = false;
    };

    onMount(() => {
        const unsubscribe = onAuthStateChanged(auth, (userCredential) => {
            if (userCredential) {
                user.set(userCredential);
            } else {
                user.set(null);
            }
            loading.set(false);
        });

        return () => unsubscribe();
    });
</script>

<main>
    {#if $loading}
        <p>Laddar...</p>
    {:else if $user}
        <Landingpage {openAddTourModal} />
        {#if showAddTourModal}
            <AddTour closeAddModal={closeAddTourModal} />
        {/if}
        <Cards />
    {:else}
        <Login />
        {#if showModal}
            <RegisterModal {closeModal} />
        {/if}
    {/if}
    <Footer />
</main>

<style>
</style>
