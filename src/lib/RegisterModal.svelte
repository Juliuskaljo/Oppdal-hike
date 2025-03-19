<script lang="ts">
    import { createUserWithEmailAndPassword } from "firebase/auth";
    import { auth } from "../firebase/firebase";
    import { user, loading } from "../Store/store";

    let email: string = "";
    let password: string = "";

    export let closeModal: () => void;

    const register = async (): Promise<void> => {
        loading.set(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            user.set(userCredential.user);
            closeModal();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error("An unknown error occurred");
            }
        } finally {
            loading.set(false);
        }
    };
</script>

<div class="modal-overlay">
    <div class="modal-content">
        <h2>Registrera konto</h2>
        <input type="email" bind:value={email} placeholder="Email" />
        <input type="password" bind:value={password} placeholder="Lösenord" />
        <button class="create-btn" on:click={register}>Skapa konto</button>
        <button class="close-btn" on:click={closeModal}>&#x2715;</button>
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

    .modal-content {
        display: flex;
        flex-direction: column;
        background-color: var(--dark-blue);
        justify-content: center;
        align-items: center;
        padding: 20px;
        border-radius: 8px;
        width: 350px;
        height: 400px;
        text-align: center;
    }

    .modal-content input {
        width: 200px;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
        font-size: 16px;
        background-color: rgb(255, 255, 255);
        color: rgb(0, 0, 0);
        border: none;
    }

    .create-btn {
        width: 110px;
        padding: 0.5em;
        font-size: 14px;
        border-radius: 0.3em;
        border: none;
        background-color: var(--lime);
    }

    .close-btn {
        position: absolute;
        border: none;
        top: 19em;
        right: 3em;
        height: 2em;
        width: 2em;
        border-radius: 1em;
        background-color: white;
    }
</style>
