# ICPass - An open professional network.

The ICPass sample application provides a simple implementation of an open professional network that demonstrates how to use **inter-canister calls** within a project.

In the ICPass sample application, there are two canisters:

* The `icpass` canister creates and stores basic profile information for a user, including work experience and educational background.

## Before you begin

Before building the sample application, verify the following:

* You have downloaded and installed the DFINITY Canister SDK as described in [Download and install](https://sdk.dfinity.org/docs/quickstart/local-quickstart.html#download-and-install).
* You have stopped any Internet Computer network processes running on the local computer.

## Demo

1. Clone the `icpass` repository.

2. Change to the local `icpass` working directory.

    ```bash
    cd icpass
    ```

3. Install the required node modules (only needed the first time).

    ```bash
    npm install
    ```

4. Open the `dfx.json` file in a text editor and verify the `dfx` setting has same the version number as the `dfx` executable you have installed.

5. Start the replica.

    ```bash
    dfx start --background
    ```

6. Register unique canister identifiers for the `icpass` project by running the following command:

    ```bash
    dfx canister create --all
    ```

7. Build the application by running the following command:

    ```bash
    dfx build
    ```

8. Deploy the application on the local network by running the following command:

    ```bash
    dfx canister install --all
    ```

9. Copy the canister identifier for the `icpass_assets` canister (you can use `dfx canister id icpass_assets`).

10. Open the `icpass_assets` canister frontend in your web browser.

    For example, if using the default localhost address and port number, the URL looks similar to this:

    ```bash
    http://localhost:8000/?canisterId=7kncf-oidaa-aaaaa-aaaaa-aaaaa-aaaaa-aaaaa-q
    ```
