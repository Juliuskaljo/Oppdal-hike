<script lang="ts">
    import { signInWithEmailAndPassword } from "firebase/auth";
    import { auth } from "../firebase/firebase";
    import { user, loading } from "../Store/store";
    import RegisterModal from "./RegisterModal.svelte";

    let email: string = "";
    let password: string = "";
    let showModal: boolean = false;

    const login = async (): Promise<void> => {
        loading.set(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            user.set(userCredential.user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Fel vid inloggning:", error.message);
            } else {
                console.error("Ett okänt fel inträffade vid inloggning.");
            }
        } finally {
            loading.set(false);
        }
    };

    const openModal = () => {
        showModal = true;
    };

    const closeModal = () => {
        showModal = false;
    };
</script>

<main class="login-main">
    <div class="background">
        <div class="login-container">
            <div class="login">
                <input
                    type="email"
                    bind:value={email}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    bind:value={password}
                    placeholder="Lösenord"
                    required
                />
                <button class="login-btn" on:click={login}>Logga in</button>
                <button class="register-btn" on:click={openModal}
                    >Skapa konto</button
                >
            </div>
        </div>
    </div>

    {#if showModal}
        <RegisterModal {closeModal} />
    {/if}
</main>

<style>
    .background {
        background-image: url("OppdalHike.jpg");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .login {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 300px;
        background: var(--beige);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }

    input {
        width: 280px;
        font-size: 16px;
        border: none;
        border-radius: 0.6em;
        margin: 0.5em 0;
        padding: 1em;
    }

    .login-btn,
    .register-btn {
        padding: 0.6em;
        border: none;
        border-radius: 0.3em;
        margin-top: 1em;
        width: 100%;
        transition:
            background-color 0.3s,
            transform 0.2s;
    }

    .login-btn {
        background-color: var(--blue);
        color: white;
    }

    .register-btn {
        background-color: #ffffff;
        color: black;
    }
</style>
