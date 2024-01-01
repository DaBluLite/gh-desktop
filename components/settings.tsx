export const SettingsItem = ({children, onClick}: jsxDom.DOMAttributes<HTMLAnchorElement>) => {
    return <li data-item-id data-targets="nav-list.items" data-view-component="true" class="ActionListItem">
        <a data-view-component="true" class="ActionListContent ActionListContent--visual16" data-turbo-frame="settings-frame" onClick={onClick}>
            <span class="ActionListItem-label" data-view-component="true">{children}</span>
        </a>
    </li>
}

export const SettingsPage = ({ children, title }: { children?: Element, title: string }) => {
    return <div>
        <div data-view-component="true" class="Subhead">
            <div data-view-component="true" class="Subhead-heading Subhead-heading--large">
                <h2 id="color-mode-heading" class="d-inline-block h2 text-normal">{title}</h2>
            </div>
        </div>
        {children}
    </div>
}