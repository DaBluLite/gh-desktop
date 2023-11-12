import React from "jsx-dom";
export const Style = () => {
    return <style>
    {
    `.AppHeader-globalBar {
        -webkit-app-region: drag;
        margin-right: calc((var(--base-size-16, 16px) * 1.5) + (32px * 4) + 1rem) !important;
        padding-right: .5rem !important;
    }
    .AppHeader-globalBar :is(.AppHeader-context-item,.AppHeader-logo,.AppHeader-button,.AppHeader-search),
    .Overlay-backdrop--side {
        -webkit-app-region: no-drag;
    }
    .AppHeader {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
    }
    .AppHeader-titlebar {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 998;
        display: grid;
        grid-auto-flow: column;
        gap: var(--controlStack-medium-gap-auto, 8px);
        padding: var(--base-size-16, 16px);
        padding-left: calc(var(--base-size-16, 16px)/2);
        width: fit-content !important;
        background-color: transparent;
        box-shadow: none;
        border-bottom: none;
    }
    .application-main {
        padding-top: 64px;
    }
    .feed-background {
        min-height: calc(100vh - 64px) !important;
    }
    :root:has(.AppHeader-localBar) .application-main {
        padding-top: 104px;
    }
    :is([data-turbo-body],body,html)::-webkit-scrollbar {
        width: 0;
    }
    .ColorSelectorModal-body {
        position: relative;
        display: flex;
        gap: 16px 24px;
        width: calc((64px*7) + (24px*5));
        flex-wrap: wrap;
    }
    .ColorSelectorModal-color {
        height: 60px;
        width: 60px;
        cursor: pointer;
        display: flex;
        flex-flow: wrap;
        flex-direction: row;
        position: relative;
        align-items: center;
        justify-content: center;
        transition: .1s;
        background: transparent;
        border: var(--borderWidth-thin, 1px) solid var(--borderColor-default, var(--color-border-default));
        border-radius: var(--borderRadius-medium, 6px);
    }
    .ColorSelectorModal-color:hover,
    .ColorSelectorModal-color--active {
        background: var(--control-transparent-bgColor-hover, var(--color-action-list-item-default-hover-bg));
        border-color: var(--button-default-borderColor-hover, var(--color-btn-hover-border));
    }
    .CustomModal-body,
    .CustomModal {
        width: fit-content;
    }
    .ColorSelectorModal-preview {
        display: flex;
        flex-flow: wrap;
        flex-direction: row;
        overflow: hidden;
        border-radius: var(--borderRadius-medium, 6px);
        width: 56px;
        height: 56px;
        gap: 2px;
    }
    .ColorSelectorModal-previewColor {
        width: calc(50% - 1px);
        height: calc(50% - 1px);
        border-radius: var(--borderRadius-small, 3px);
    }`
    }
    </style>
}

export const generateCSS = (primary = "#010409",secondary = "#0d1117",tertiary = "#161b22",accent = "#e6edf3") => {
    return `:root:root {
        --bgColor-inset: ${primary} !important;
        --bgColor-default: ${secondary} !important;
        --bgColor-muted: ${tertiary} !important;
    }
    .octicon-mark-github {
        color: ${accent} !important;
    }
    .klBOTR {
        background-color: ${tertiary} !important;
    }
    .hSXtjz,
    .jMdYTc {
        background-color: ${secondary} !important;
    }`
}