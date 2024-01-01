import { SettingsItem } from "./components/settings";
import { Titlebar } from "./components/titlebar";
import { ColorwayCSS, stripClass } from "./utils";
import { settingsOptions } from "./components/settingsList";
import { SettingsPage } from "./components/settings"
import "./style.scss"

["DOMContentLoaded","soft-nav:progress-bar:end"].forEach(evt => document.addEventListener(evt, () => {
    if(!document.getElementsByClassName("AppHeader-titlebar").length)
        (document.querySelector(".AppHeader-globalBar") ? document.querySelector(".AppHeader-globalBar") : document.querySelector(".Header-old"))!.append(<Titlebar />);
    ColorwayCSS.start();
    if (document.querySelector("[item_classes=\"org-menu-item\"] .ActionListWrap") && !document.getElementById("ghdc-settings-header")) {
        document.querySelector("[item_classes=\"org-menu-item\"] .ActionListWrap")!.append(<>
            <li role="presentation" aria-hidden="true" data-view-component="true" class="ActionList-sectionDivider"/>
            <div data-view-component="true" class="ActionList-sectionDivider" id="ghdc-settings-header">
                <h2 data-view-component="true" class="ActionList-sectionDivider-title">Github Desktop</h2>
            </div>
            {settingsOptions.map((option: { page?: Element; name: string; }) => <SettingsItem onClick={e => {
                stripClass(document.querySelectorAll(".ActionListItem--navActive"), "ActionListItem--navActive");
                if(!e.currentTarget.parentElement!.classList.contains("ActionListItem--navActive"))
                    e.currentTarget.parentElement!.classList.add("ActionListItem--navActive");
                document.getElementById("settings-frame")!.replaceChildren(<SettingsPage title={option.name}>{option.page}</SettingsPage>)
            }}>{option.name}</SettingsItem>)}
        </>)
    }
}));