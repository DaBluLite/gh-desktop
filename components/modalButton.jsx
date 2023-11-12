import React from "jsx-dom";
export const ModalButton = ({ children, onclick }) => {
    return <div class="full-button width-full">
        <button class="js-repo-delete-proceed-button Button--secondary Button--medium Button Button--fullWidth" onClick={onclick}>
            <span class="Button-content">
                <span class="Button-label">{children}</span>
            </span>
        </button>
    </div>
}