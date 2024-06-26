import { ipcRenderer } from "electron";
import { showModal } from "./modals";
import { ModalButton } from "./modalButton";
import { fallbackColorways } from "../constants";
import { SelectorModalBody } from "./selectorModal";

export const Titlebar = () => {
    return <div class="AppHeader-globalBar-end AppHeader-titlebar">
        <div id="AppHeader-colors-button">
            <a class="Button Button--iconOnly Button--secondary Button--medium AppHeader-button color-fg-muted" onClick={async () => {
                const colorwaysData = await fetch("https://raw.githubusercontent.com/DaBluLite/ProjectColorway/master/index.json");
                const colorways = await colorwaysData.json().catch(() => {return { colorways: [] }});
                const colors = colorways.colorways || fallbackColorways;
                showModal("Colors (Powered By DiscordColorways)", <SelectorModalBody colorways={colors}/>, null)
            }}>
                <svg aria-hidden="true" height="16" viewBox="0 0 24 24" version="1.1" width="16" data-view-component="true" class="octicon octicon-pallete color-fg-muted mr-0"><path fill="currentColor" d="M 12 7.5 C 13.242188 7.5 14.25 6.492188 14.25 5.25 C 14.25 4.007812 13.242188 3 12 3 C 10.757812 3 9.75 4.007812 9.75 5.25 C 9.75 6.492188 10.757812 7.5 12 7.5 Z M 18 12 C 19.242188 12 20.25 10.992188 20.25 9.75 C 20.25 8.507812 19.242188 7.5 18 7.5 C 16.757812 7.5 15.75 8.507812 15.75 9.75 C 15.75 10.992188 16.757812 12 18 12 Z M 8.25 10.5 C 8.25 11.742188 7.242188 12.75 6 12.75 C 4.757812 12.75 3.75 11.742188 3.75 10.5 C 3.75 9.257812 4.757812 8.25 6 8.25 C 7.242188 8.25 8.25 9.257812 8.25 10.5 Z M 9 19.5 C 10.242188 19.5 11.25 18.492188 11.25 17.25 C 11.25 16.007812 10.242188 15 9 15 C 7.757812 15 6.75 16.007812 6.75 17.25 C 6.75 18.492188 7.757812 19.5 9 19.5 Z M 9 19.5 M 24 12 C 24 16.726562 21.199219 15.878906 18.648438 15.105469 C 17.128906 14.644531 15.699219 14.210938 15 15 C 14.09375 16.023438 14.289062 17.726562 14.472656 19.378906 C 14.738281 21.742188 14.992188 24 12 24 C 5.371094 24 0 18.628906 0 12 C 0 5.371094 5.371094 0 12 0 C 18.628906 0 24 5.371094 24 12 Z M 12 22.5 C 12.917969 22.5 12.980469 22.242188 12.984375 22.234375 C 13.097656 22.015625 13.167969 21.539062 13.085938 20.558594 C 13.066406 20.304688 13.03125 20.003906 12.996094 19.671875 C 12.917969 18.976562 12.828125 18.164062 12.820312 17.476562 C 12.804688 16.417969 12.945312 15.0625 13.875 14.007812 C 14.429688 13.382812 15.140625 13.140625 15.78125 13.078125 C 16.390625 13.023438 17 13.117188 17.523438 13.234375 C 18.039062 13.351562 18.574219 13.515625 19.058594 13.660156 L 19.101562 13.675781 C 19.621094 13.832031 20.089844 13.972656 20.53125 14.074219 C 21.511719 14.296875 21.886719 14.199219 22.019531 14.109375 C 22.074219 14.070312 22.5 13.742188 22.5 12 C 22.5 6.199219 17.800781 1.5 12 1.5 C 6.199219 1.5 1.5 6.199219 1.5 12 C 1.5 17.800781 6.199219 22.5 12 22.5 Z M 12 22.5"></path></svg>
            </a>
        </div>
        <div id="AppHeader-minimize-button">
            <a class="Button Button--iconOnly Button--secondary Button--medium AppHeader-button color-fg-muted" onClick={() => {ipcRenderer.send("minimizeApp")}}>
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-min color-fg-muted mr-0"><line x1="0" y1="9" x2="16" y2="9" stroke="currentColor" shape-rendering="crispEdges" /></svg>
            </a>
        </div>
        <div id="AppHeader-maximize-button">
            <a class="Button Button--iconOnly Button--secondary Button--medium AppHeader-button color-fg-muted" onClick={() => {ipcRenderer.send("maximizeApp")}}>
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-max color-fg-muted mr-0"><path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg>
            </a>
        </div>
        <div id="AppHeader-close-button">
            <a class="Button Button--iconOnly Button--secondary Button--medium AppHeader-button color-fg-muted" onClick={() => {showModal("Exit GitHub Desktop?", null, <ModalButton onclick={() => {ipcRenderer.send("closeApp")}}>Exit App</ModalButton>)}}>
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-close color-fg-muted mr-0"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path></svg>
            </a>
        </div>
    </div>
}
