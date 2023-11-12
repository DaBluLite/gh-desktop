import React from "jsx-dom";
export const SettingsItem = ({children, onclick}) => {
    return <li data-item-id data-targets="nav-list.items" data-view-component="true" class="ActionListItem">
        <a data-view-component="true" class="ActionListContent ActionListContent--visual16" data-turbo-frame="settings-frame" onClick={onclick}>
            <span class="ActionListItem-label" data-view-component="true">{children}</span>
        </a>
    </li>
}