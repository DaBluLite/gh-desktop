import React from "jsx-dom";
import { ModalButton } from "./components/modalButton.jsx";
import { SettingsItem } from "./components/settings.jsx";
import { Titlebar } from "./components/titlebar.jsx";
import { Style } from "./components/css.jsx";
import { showModal } from "./components/modals.jsx";
import { ColorwayCSS } from "./utils.js";

const SettingsList = document.querySelector("[item_classes=\"org-menu-item\"] .ActionListWrap");

class UI {
    AppHeader = document.querySelector(".AppHeader") ? document.querySelector(".AppHeader") : document.querySelector(".Header-old")
    init = (fromObserver) => {
        document.body.append(<Titlebar/>);
        if(!fromObserver) {
            document.head.append(<Style/>);
        }
    }
    settingsOptions = [
        {
            name: "Test Settings and modals",
            onclick: () => {
                showModal("Test",null,<ModalButton>This does nothing</ModalButton>)
            }
        }
    ]
}

// Start the event listener
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the UI
    const instance = new UI();
    instance.init(false);
    ColorwayCSS.start();

    if(SettingsList) {
        this.settingsOptions.forEach(option => {
            const optItem = <SettingsItem onclick={option.onclick}>{option.name}</SettingsItem>;
            SettingsList.append(optItem);
        })
    }

    // Create the MutationObserver
    const observer = new MutationObserver(() => {
        if(SettingsList) {
            this.settingsOptions.forEach(option => {
                const optItem = <SettingsItem onclick={option.onclick}>{option.name}</SettingsItem>;
                SettingsList.append(optItem);
            })
        }
        if (
            !document.getElementById("AppHeader-maximize-button")
        ) {
            instance.init(true);
        }
    });

    // And start it
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
})