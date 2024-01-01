export const showModal =  (header: any, body: any, footer: any) => {
    const modalOverlay = <div class="Overlay-backdrop--center" onClick={(e) => {
        e.currentTarget.remove();
    }}>
        <div class="Overlay Overlay-whenNarrow Overlay--size-medium-portrait Overlay--motion-scaleFade CustomModal" onClick={(e) => e.stopPropagation()}>
            <div class="Overlay-header Overlay-header--divided">
                <div class="Overlay-headerContentWrap">
                    <div class="Overlay-titleWrap">
                        <h1 class="Overlay-title">{header}</h1>
                    </div>
                </div>
            </div>
            {body !== null ? <div class="Overlay-body CustomModal-body">{body}</div> : <></>}
            {footer !== null ? <div class="Overlay-footer Overlay-footer--alignEnd Overlay-footer--divided">{footer}</div> : <></>}
        </div>
    </div>
    document.body.append(modalOverlay);
    return { close: modalOverlay.remove }
}